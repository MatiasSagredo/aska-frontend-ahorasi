import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const material = {
    getAll: async () => {
        try {
            const response = await instance.get('/material');
            return response.data;
        } catch (error) {
            console.error('Error en getAll material:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await instance.get(`/material/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById material:', error);
            throw error;
        }
    },
    createMaterial: async (data) => {
        try {
            const response = await instance.post('/material', data);
            return response.data;
        } catch (error) {
            console.error('Error en createMaterial:', error);
            throw error;
        }
    },
    updateMaterialById: async (id, data) => {
        try {
            const response = await instance.put(`/material/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateMaterialById:', error);
            throw error;
        }
    },
    patchMaterialById: async (id, data) => {
        try {
            const response = await instance.patch(`/material/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchMaterialById:', error);
            throw error;
        }
    },
    deleteMaterialById: async (id) => {
        try {
            const response = await instance.delete(`/material/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteMaterialById:', error);
            throw error;
        }
    },
};

export default material;
