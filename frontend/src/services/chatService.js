import { apiServiceInstance } from './apiService';

const apiService = apiServiceInstance;

const chatService = {
    async getUserChats() {
        try {
            const response = await apiService.get('chatController', 'getByUserId');
            return response;
        } catch (error) {
            console.error('Error fetching user chats:', error);
            throw error;
        }
    },

    async getChatByAnnouncementId(announcementId) {
        try {
            const response = await apiService.get('chatController', 'getByAnnouncementId', { announcementId });
            return response;
        } catch (error) {
            console.error('Error fetching chat by announcement:', error);
            throw error;
        }
    },

    async joinChat(announcementId) {
        try {
            const response = await apiService.post('chatController', 'joinChat', { announcementId });
            return response;
        } catch (error) {
            console.error('Error joining chat:', error);
            throw error;
        }
    },

    async leaveChat(chatId) {
        try {
            const response = await apiService.post('chatController', 'leaveChat', { chatId });
            return response;
        } catch (error) {
            console.error('Error leaving chat:', error);
            throw error;
        }
    },

    async getChatMessages(chatId, limit = 50, offset = 0) {
        try {
            const response = await apiService.get('chatController', 'getMessages', { chatId, limit, offset });
            return response;
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            throw error;
        }
    },

    async sendMessage(chatId, messageData) {
        try {
            const response = await apiService.post('chatController', 'sendMessage', { chatId, ...messageData });
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
};

export default chatService;
