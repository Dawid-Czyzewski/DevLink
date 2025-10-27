import chatService from './chatService';
import chatSortingService from './chatSortingService';

class ChatStateService {
    constructor() {
        this.state = {
            chats: [],
            filteredChats: [],
            selectedChatId: null,
            messages: [],
            loading: true,
            messagesLoading: false,
            hasNewMessages: {}
        };
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.notify();
    }

    async fetchChats(searchParams = new URLSearchParams(), preserveSelection = false) {
        try {
            this.setState({ loading: true });
            const response = await chatService.getUserChats();
            
            if (response.success && response.data && response.data.chats) {
                let chats = response.data.chats;
                
                const announcementIdFromUrl = searchParams.get('announcementId');
                if (announcementIdFromUrl) {
                    chats = chats.filter(chat => chat.announcement_id.toString() === announcementIdFromUrl);
                }
                
                const sortedChats = chatSortingService.sortAndPrioritizeChat(chats, this.state.selectedChatId);
                
                this.setState({
                    chats: sortedChats,
                    filteredChats: sortedChats
                });

                const chatIdFromUrl = searchParams.get('chatId');
                if (chatIdFromUrl) {
                    const chatExists = sortedChats.find(chat => chat.id.toString() === chatIdFromUrl);
                    if (chatExists) {
                        this.setState({ selectedChatId: parseInt(chatIdFromUrl) });
                    }
                } else if (sortedChats.length > 0 && !preserveSelection) {
                    this.setState({ selectedChatId: sortedChats[0].id });
                }
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        } finally {
            this.setState({ loading: false });
        }
    }

    async fetchMessages(chatId) {
        if (!chatId) return;
        
        try {
            this.setState({ messagesLoading: true });
            const response = await chatService.getChatMessages(chatId, 50, 0);
            
            if (response.success && response.data && response.data.messages) {
                this.setState({ messages: response.data.messages });
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            this.setState({ messagesLoading: false });
        }
    }

    selectChat(chatId) {
        this.setState({ selectedChatId: chatId });
        
        const newHasNewMessages = { ...this.state.hasNewMessages };
        delete newHasNewMessages[chatId];
        this.setState({ hasNewMessages: newHasNewMessages });
    }

    async sendMessage(chatId, content) {
        if (!chatId) return false;

        try {
            const response = await chatService.sendMessage(chatId, { content });
            
            if (response.success && response.data && response.data.message) {
                this.setState({
                    messages: [...this.state.messages, response.data.message]
                });

                await this.fetchChats();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }

    updateChatList(newChats, prevChats, selectedChatId) {
        const sortedChats = chatSortingService.sortAndPrioritizeChat(newChats, selectedChatId);
        const newMessagesMap = chatSortingService.findChatsWithNewMessages(
            newChats, 
            prevChats, 
            selectedChatId
        );

        const newSelectedChatId = this.state.selectedChatId || (sortedChats.length > 0 ? sortedChats[0].id : null);
        
        this.setState({
            chats: sortedChats,
            filteredChats: sortedChats,
            hasNewMessages: { ...this.state.hasNewMessages, ...newMessagesMap },
            selectedChatId: newSelectedChatId
        });
    }

    getState() {
        return this.state;
    }
}

const chatStateService = new ChatStateService();
export default chatStateService;
