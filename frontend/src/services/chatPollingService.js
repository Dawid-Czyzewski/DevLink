import chatService from './chatService';

class ChatPollingService {
    constructor() {
        this.messageIntervals = new Map();
        this.chatIntervals = new Map();
    }

    startMessagePolling(chatId, onNewMessages) {
        if (this.messageIntervals.has(chatId)) {
            this.stopMessagePolling(chatId);
        }

        const interval = setInterval(async () => {
            try {
                const response = await chatService.getChatMessages(chatId, 50, 0);
                
                if (response.success && response.data && response.data.messages) {
                    const newMessages = response.data.messages;
                    onNewMessages(newMessages);
                }
            } catch (error) {
                console.error('Error polling messages:', error);
            }
        }, 5000);

        this.messageIntervals.set(chatId, interval);
    }

    stopMessagePolling(chatId) {
        const interval = this.messageIntervals.get(chatId);
        if (interval) {
            clearInterval(interval);
            this.messageIntervals.delete(chatId);
        }
    }

    startChatPolling(onChatUpdate, searchParams) {
        this.stopChatPolling();

        const interval = setInterval(async () => {
            try {
                const response = await chatService.getUserChats();
                
                if (response.success && response.data && response.data.chats) {
                    let chats = response.data.chats;
                    
                    const announcementIdFromUrl = searchParams.get('announcementId');
                    if (announcementIdFromUrl) {
                        chats = chats.filter(chat => chat.announcement_id.toString() === announcementIdFromUrl);
                    }
                    
                    onChatUpdate(chats);
                }
            } catch (error) {
                console.error('Error polling chats:', error);
            }
        }, 10000);

        this.chatIntervals.set('main', interval);
    }

    stopChatPolling() {
        const interval = this.chatIntervals.get('main');
        if (interval) {
            clearInterval(interval);
            this.chatIntervals.delete('main');
        }
    }

    stopAllPolling() {
        this.messageIntervals.forEach((interval) => clearInterval(interval));
        this.chatIntervals.forEach((interval) => clearInterval(interval));
        this.messageIntervals.clear();
        this.chatIntervals.clear();
    }
}

const chatPollingService = new ChatPollingService();
export default chatPollingService;
