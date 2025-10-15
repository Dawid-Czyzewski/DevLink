import { ApiService, ApiError } from './apiService';

class UserService {
	constructor() {
		this.apiService = new ApiService();
	}

	async register(userData) {
		try {
			const response = await this.apiService.post('userController', 'register', userData);
			return {
				success: true,
				user: response.data.user,
				message: response.message,
			};
		} catch (error) {
			if (error instanceof ApiError) {
				return {
					success: false,
					message: error.message,
					errors: error.errors,
				};
			}
			
			return {
				success: false,
				message: 'register.errors.unexpectedError',
				errors: null,
			};
		}
	}

	async activateAccount(token) {
		try {
			const response = await this.apiService.get('userController', 'activate', { token });
			return {
				success: true,
				user: response.data.user,
				message: response.message,
			};
		} catch (error) {
			if (error instanceof ApiError) {
				return {
					success: false,
					message: error.message,
					errors: error.errors,
				};
			}
			
			return {
				success: false,
				message: 'activate.errors.unexpectedError',
				errors: null,
			};
		}
	}

	async login(userData) {
		throw new Error('Login not implemented yet');
	}

	async getUser() {
		throw new Error('Get user not implemented yet');
	}

	async updateUser(userData) {
		throw new Error('Update user not implemented yet');
	}

	async changePassword(passwordData) {
		throw new Error('Change password not implemented yet');
	}

	async logout() {
		throw new Error('Logout not implemented yet');
	}

	async deleteUser() {
		throw new Error('Delete user not implemented yet');
	}
}

export default new UserService();
