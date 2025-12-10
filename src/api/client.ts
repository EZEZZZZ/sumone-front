import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log('Checking Auth Token:', token.substring(0, 10) + '...');
        } else {
            console.warn('No access token found in localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthenticated - clear token and redirect to login if needed
            // localStorage.removeItem('accessToken');
            // window.location.href = '/login';
            console.warn('Unauthorized access. Please login again.');
        }
        return Promise.reject(error);
    }
);

export default client;
