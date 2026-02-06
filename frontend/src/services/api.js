// src/services/api.js
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Added /api/ assuming Django REST Framework
    timeout: 10000,  // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor - Add JWT token to requests
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('access_token') ||
            localStorage.getItem('token') ||
            sessionStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request for debugging (remove in production)
        console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
    (response) => {
        // Log successful response for debugging
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Log error
        console.error(`API Error: ${error.response?.status || 'No Status'} ${error.config?.url || 'No URL'}`, error.response?.data || error.message);

        // Handle 401 Unauthorized (Token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const refreshResponse = await axios.post(
                        'http://127.0.0.1:8000/api/token/refresh/',
                        { refresh: refreshToken }
                    );

                    const newAccessToken = refreshResponse.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Clear tokens and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error('Access forbidden. Insufficient permissions.');
            // Optional: Show notification to user
        }

        // Handle 404 Not Found
        if (error.response?.status === 404) {
            console.error('Resource not found.');
        }

        // Handle 500 Server Error
        if (error.response?.status >= 500) {
            console.error('Server error occurred.');
        }

        // Handle network errors
        if (!error.response) {

            console.log('error', error);
        }

        return Promise.reject(error);
    }
);

// Helper functions for common HTTP methods
export const ApiService = {
    get: (url, config = {}) => api.get(url, config),
    post: (url, data, config = {}) => api.post(url, data, config),
    put: (url, data, config = {}) => api.put(url, data, config),
    patch: (url, data, config = {}) => api.patch(url, data, config),
    delete: (url, config = {}) => api.delete(url, config),
};

// Test connection function
export const testConnection = async () => {
    try {
        const response = await api.get('/');
        console.log('Backend connection successful:', response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Backend connection failed:', error.message);
        return {
            success: false,
            error: error.message,
            details: 'Check if backend is running at http://127.0.0.1:8000'
        };
    }
};

// Default export
export default api;