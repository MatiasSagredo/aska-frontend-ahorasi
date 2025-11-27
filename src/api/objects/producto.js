import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const producto = {
    getAll: async () => {
        try {
            const response = await instance.get('/producto');
            return response.data;
        } catch (error) {
            console.error('Error en getAll producto:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await instance.get(`/producto/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById producto:', error);
            throw error;
        }
    },
    createProducto: async (data) => {
        try {
            const response = await instance.post('/producto', data);
            return response.data;
        } catch (error) {
            console.error('Error en createProducto:', error);
            throw error;
        }
    },
    updateProductoById: async (id, data) => {
        try {
            const response = await instance.put(`/producto/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateProductoById:', error);
            throw error;
        }
    },
    patchProductoById: async (id, data) => {
        try {
            const response = await instance.patch(`/producto/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchProductoById:', error);
            throw error;
        }
    },
    deleteProductoById: async (id) => {
        try {
            const response = await instance.delete(`/producto/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteProductoById:', error);
            throw error;
        }
    },
};

export default producto;
