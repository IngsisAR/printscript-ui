import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth0_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;