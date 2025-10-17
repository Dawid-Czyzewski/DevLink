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
		try {
			const response = await this.apiService.post('userController', 'login', userData);
			return {
				success: true,
				user: response.data.user,
				session_id: response.data.session_id,
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
				message: 'login.errors.unexpectedError',
				errors: null,
			};
		}
	}

	async getCurrentUser() {
		try {
			const response = await this.apiService.get('userController', 'me');
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
				message: 'auth.errors.unexpectedError',
				errors: null,
			};
		}
	}

	async updateProfile(profileData) {
		try {
			const response = await this.apiService.post('userController', 'updateProfile', profileData);
			return {
				success: true,
				data: response.data,
				message: response.message,
			};
		} catch (error) {
			if (error instanceof ApiError) {
				const customError = new Error(error.message);
				customError.errors = error.errors;
				throw customError;
			}
			
			const unexpectedError = new Error('editProfile.errors.unexpectedError');
			unexpectedError.errors = null;
			throw unexpectedError;
		}
	}

	async updateUser(userData) {
		throw new Error('Update user not implemented yet');
	}

	async changePassword(passwordData) {
		throw new Error('Change password not implemented yet');
	}

	async logout() {
		try {
			const response = await this.apiService.post('userController', 'logout');
			return {
				success: true,
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
				message: 'logout.errors.unexpectedError',
				errors: null,
			};
		}
	}

	async deleteUser() {
		throw new Error('Delete user not implemented yet');
	}
}

const userService = new UserService();
export default userService;
