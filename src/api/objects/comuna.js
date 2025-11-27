import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Comuna = {
    getAll: async () => {
        try {
            const response = await instance.get('/comuna');
            return response.data;
        } catch (error) {
            console.error('Error en getAll comuna:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await instance.get(`/comuna/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById comuna:', error);
            throw error;
        }
    },
    createComuna: async (data) => {
        try {
            const response = await instance.post('/comuna', data);
            return response.data;
        } catch (error) {
            console.error('Error en createComuna:', error);
            throw error;
        }
    },
    updateComunaById: async (id, data) => {
        try {
            const response = await instance.put(`/comuna/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateComunaById:', error);
            throw error;
        }
    },
    patchComunaById: async (id, data) => {
        try {
            const response = await instance.patch(`/comuna/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchComunaById:', error);
            throw error;
        }
    },
    deleteComunaById: async (id) => {
        try {
            const response = await instance.delete(`/comuna/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteComunaById:', error);
            throw error;
        }
    },
};

export default Comuna;
