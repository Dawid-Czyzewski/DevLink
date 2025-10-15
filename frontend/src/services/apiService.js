class ApiService {
	constructor() {
		this.baseURL = 'http://localhost:8001/index.php';
	}

	async request(endpoint, options = {}) {
		const url = `${this.baseURL}${endpoint}`;
		
		const defaultOptions = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const config = {
			...defaultOptions,
			...options,
			headers: {
				...defaultOptions.headers,
				...options.headers,
			},
		};

		try {
			const response = await fetch(url, config);
			
			if (!response.ok) {
				let data;
				try {
					data = await response.json();
				} catch (jsonError) {
					throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
				}
				throw new ApiError(data.message || 'Request failed', response.status, data.errors);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				throw new ApiError('Cannot connect to server. Please check if backend is running.', 0);
			}
			
			throw new ApiError('Network error. Please check your connection.', 0);
		}
	}

	async get(controller, action, params = {}) {
		const queryParams = new URLSearchParams({
			controller,
			action,
			...params,
		});

		return this.request(`?${queryParams}`);
	}

	async post(controller, action, data = {}) {
		const queryParams = new URLSearchParams({
			controller,
			action,
		});

		return this.request(`?${queryParams}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	async put(controller, action, data = {}) {
		const queryParams = new URLSearchParams({
			controller,
			action,
		});

		return this.request(`?${queryParams}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
	}

	async delete(controller, action) {
		const queryParams = new URLSearchParams({
			controller,
			action,
		});

		return this.request(`?${queryParams}`, {
			method: 'DELETE',
		});
	}
}

class ApiError extends Error {
	constructor(message, status, errors = null) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.errors = errors;
	}
}

export { ApiService, ApiError };
