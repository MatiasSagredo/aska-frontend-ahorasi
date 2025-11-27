import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const grado = {
    getAll: async () => {
        try {
            const response = await instance.get('/grado');
            return response.data;
        } catch (error) {
            console.error('Error en getAll grado:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await instance.get(`/grado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById grado:', error);
            throw error;
        }
    },
    createGrado: async (data) => {
        try {
            const response = await instance.post('/grado', data);
            return response.data;
        } catch (error) {
            console.error('Error en createGrado:', error);
            throw error;
        }
    },
    updateGradoById: async (id, data) => {
        try {
            const response = await instance.put(`/grado/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateGradoById:', error);
            throw error;
        }
    },
    patchGradoById: async (id, data) => {
        try {
            const response = await instance.patch(`/grado/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchGradoById:', error);
            throw error;
        }
    },
    deleteGradoById: async (id) => {
        try {
            const response = await instance.delete(`/grado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteGradoById:', error);
            throw error;
        }
    },
};

export default grado;
