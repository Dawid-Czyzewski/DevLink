class ChatSortingService {
    sortChatsByLastMessage(chats) {
        return [...chats].sort((a, b) => {
            const timeA = a.last_message?.created_at ? new Date(a.last_message.created_at) : new Date(0);
            const timeB = b.last_message?.created_at ? new Date(b.last_message.created_at) : new Date(0);
            return timeB - timeA;
        });
    }

    moveChatToTop(chats, chatId) {
        const chatIndex = chats.findIndex(chat => chat.id === chatId);
        if (chatIndex === -1) return chats;

        const chat = chats[chatIndex];
        const otherChats = chats.filter((_, index) => index !== chatIndex);
        
        return [chat, ...otherChats];
    }

    sortAndPrioritizeChat(chats, currentChatId) {
        const sortedChats = this.sortChatsByLastMessage(chats);
        
        if (currentChatId) {
            return this.moveChatToTop(sortedChats, currentChatId);
        }
        
        return sortedChats;
    }

    hasNewMessages(newChat, prevChat) {
        if (!newChat || !prevChat) return false;
        if (newChat.id !== prevChat.id) return false;

        const newLastMessage = newChat.last_message?.created_at;
        const prevLastMessage = prevChat.last_message?.created_at;

        if (!newLastMessage) return false;
        if (!prevLastMessage) return true;

        return new Date(newLastMessage) > new Date(prevLastMessage);
    }

    findChatsWithNewMessages(newChats, prevChats, excludeChatId = null) {
        const newMessagesMap = {};
        
        newChats.forEach(newChat => {
            if (excludeChatId && newChat.id === excludeChatId) return;
            
            const prevChat = prevChats.find(prev => prev.id === newChat.id);
            if (this.hasNewMessages(newChat, prevChat)) {
                newMessagesMap[newChat.id] = true;
            }
        });

        return newMessagesMap;
    }
}

const chatSortingService = new ChatSortingService();
export default chatSortingService;
