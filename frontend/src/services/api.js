// src/services/api.js
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',  // Changed to root to support multiple apps (authentication, services, dashboard)
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// ... (interceptors remain the same) ...

export const AuthService = {
    login: async (email, password) => {
        const response = await api.post('authentication/login/', { email, password });
        if (response.data.tokens) {
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('authentication/register/', userData);
        return response.data;
    },
    logout: async () => {
        try {
            const refresh_token = localStorage.getItem('refresh_token');
            if (refresh_token) {
                await api.post('authentication/logout/', { refresh_token });
            }
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            localStorage.removeItem('userBookings');
        }
    },
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
    requestPasswordReset: async (email) => {
        const response = await api.post('authentication/request-reset-email/', { email });
        return response.data;
    },
    confirmPasswordReset: async (uidb64, token, password) => {
        const response = await api.patch('authentication/password-reset-complete/', {
            uidb64,
            token,
            password
        });
        return response.data;
    }
};

export const ServiceService = {
    // Get all services with optional filters
    getServices: async (params) => {
        // params can include: search, category, min_price, max_price, ordering
        const response = await api.get('services/services/search/', { params });
        return response.data;
    },

    // Get all categories
    getCategories: async () => {
        const response = await api.get('services/categories/');
        return response.data;
    },

    // Get filter options (min/max price, sort options)
    getFilterOptions: async () => {
        const response = await api.get('services/filter-options/');
        return response.data;
    },

    // Get featured services
    getFeaturedServices: async () => {
        const response = await api.get('services/services/featured/');
        return response.data;
    },

    // Get specific service details
    getServiceById: async (id) => {
        const response = await api.get(`services/services/${id}/`);
        return response.data;
    }
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