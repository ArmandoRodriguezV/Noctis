import axios from 'axios';
import { getToken } from '../storage/storage';

export const api = axios.create({
    baseURL: "http://localhost:3000"
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {

        if (error.response?.data) {
            return Promise.reject(error.response.data);
        }

        return Promise.reject({
            message: "No se pudo conectar con el servidor",
            status: 503
        });
    }
);