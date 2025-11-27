import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const metodoEnvio = {
    getAll: async () => {
        try {
            const response = await instance.get('/metodoenvio');
            return response.data;
        } catch (error) {
            console.error('Error en getAll metodoenvio:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await instance.get(`/metodoenvio/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById metodoenvio:', error);
            throw error;
        }
    },
    createMetodoEnvio: async (data) => {
        try {
            const response = await instance.post('/metodoenvio', data);
            return response.data;
        } catch (error) {
            console.error('Error en createMetodoEnvio:', error);
            throw error;
        }
    },
    updateMetodoEnvioById: async (id, data) => {
        try {
            const response = await instance.put(`/metodoenvio/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateMetodoEnvioById:', error);
            throw error;
        }
    },
    patchMetodoEnvioById: async (id, data) => {
        try {
            const response = await instance.patch(`/metodoenvio/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchMetodoEnvioById:', error);
            throw error;
        }
    },
    deleteMetodoEnvioById: async (id) => {
        try {
            const response = await instance.delete(`/metodoenvio/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteMetodoEnvioById:', error);
            throw error;
        }
    },
};

export default metodoEnvio;
