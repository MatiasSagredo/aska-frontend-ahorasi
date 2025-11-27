import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const imagenes = {
    getAll: async () => {
        try {
            const response = await instance.get('/Imagenes');
            return response.data;
        } catch (error) {
            console.error('Error en getAll imagenes:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await instance.get(`/Imagenes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById imagenes:', error);
            throw error;
        }
    },
    createImagenes: async (data) => {
        try {
            const response = await instance.post('/Imagenes', data);
            return response.data;
        } catch (error) {
            console.error('Error en createImagenes:', error);
            throw error;
        }
    },
    updateImagenesById: async (id, data) => {
        try {
            const response = await instance.put(`/Imagenes/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateImagenesById:', error);
            throw error;
        }
    },
    patchImagenesById: async (id, data) => {
        try {
            const response = await instance.patch(`/Imagenes/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchImagenesById:', error);
            throw error;
        }
    },
    deleteImagenesById: async (id) => {
        try {
            const response = await instance.delete(`/Imagenes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteImagenesById:', error);
            throw error;
        }
    },
};

export default imagenes;
