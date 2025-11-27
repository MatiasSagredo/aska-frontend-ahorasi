import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const venta = {
    getAll: async () => {
        try {
            const response = await instance.get('/venta');
            return response.data;
        } catch (error) {
            console.error('Error en getAll venta:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Venta a buscar
     * @returns {Promise<Venta>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/venta/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById venta:', error);
            throw error;
        }
    },
    /**
     * @param {Venta} data - Datos de la Venta a crear
     * @returns {Promise<Venta>} */
    createVenta: async (data) => {
        try {
            const response = await instance.post('/venta', data);
            return response.data;
        } catch (error) {
            console.error('Error en createVenta:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Venta a actualizar
     * @param {Venta} data - Datos de la Venta a actualizar
     * @returns {Promise<Venta>}
     */
    updateVentaById: async (id, data) => {
        try {
            const response = await instance.put(`/venta/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateVentaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Venta a actualizar
     * @param {Partial<Venta>} data - Datos parciales de la Venta a actualizar
     * @returns {Promise<Venta>} */
    patchVentaById: async (id, data) => {
        try {
            const response = await instance.patch(`/venta/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchVentaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Venta a eliminar
     * @returns {Promise<void>} */
    deleteVentaById: async (id) => {
        try {
            const response = await instance.delete(`/venta/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteVentaById:', error);
            throw error;
        }
    },
};

export default venta;
