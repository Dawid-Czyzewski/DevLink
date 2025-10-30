import { apiServiceInstance } from './apiService';

const apiService = apiServiceInstance;

const announcementService = {
    async createAnnouncement(announcementData) {
        try {
            const response = await apiService.post('announcementController', 'create', announcementData);
            return response;
        } catch (error) {
            console.error('Error creating announcement:', error);
            throw error;
        }
    },

    async getAllAnnouncements(limit = 50, offset = 0) {
        try {
            const response = await apiService.get('announcementController', 'getAll', { limit, offset });
            return response;
        } catch (error) {
            console.error('Error fetching announcements:', error);
            throw error;
        }
    },

    async getAnnouncementById(id) {
        try {
            const response = await apiService.get('announcementController', 'getById', { id });
            return response;
        } catch (error) {
            console.error('Error fetching announcement:', error);
            throw error;
        }
    },

    async incrementView(id) {
        try {
            const endpoint = `?controller=announcementController&action=incrementView&id=${encodeURIComponent(id)}`;
            return await apiService.request(endpoint, {
                method: 'POST',
                body: JSON.stringify({ id })
            });
        } catch (error) {
            return { success: false };
        }
    },

    async getUserAnnouncements() {
        try {
            const response = await apiService.get('announcementController', 'getByUserId');
            return response;
        } catch (error) {
            console.error('Error fetching user announcements:', error);
            throw error;
        }
    },

    async updateAnnouncement(id, announcementData) {
        try {
            const response = await apiService.put('announcementController', 'update', { id, ...announcementData });
            return response;
        } catch (error) {
            console.error('Error updating announcement:', error);
            throw error;
        }
    },

    async deleteAnnouncement(id) {
        try {
            const response = await apiService.delete('announcementController', 'delete', { id });
            return response;
        } catch (error) {
            console.error('Error deleting announcement:', error);
            throw error;
        }
    },

    async searchAnnouncements(filters = {}) {
        try {
            const response = await apiService.get('announcementController', 'search', filters);
            return response;
        } catch (error) {
            console.error('Error searching announcements:', error);
            throw error;
        }
    }
};

export default announcementService;
