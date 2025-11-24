import axios from "axios";

/** @typedef {Object} Venta
 * Objeto Venta
 * @property {number} idVenta - ID de la Venta
 * @property {string} nombreVenta - Nombre de la Venta
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Venta = {
    /** @returns {Promise<Array<Venta>>} */
    getAll: async () => {
        const response = await instance.get('/venta');
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a buscar
     * @returns {Promise<Venta>}
     */
    getById: async (id) => {
        const response = await instance.get(`/venta/${id}`);
        return response.data;
    },
    /**
     * @param {Venta} data - Datos de la Venta a crear
     * @returns {Promise<Venta>} */
    createVenta: async (data) => {
        const response = await instance.post('/venta', data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a actualizar
     * @param {Venta} data - Datos de la Venta a actualizar
     * @returns {Promise<Venta>}
     */
    updateVentaById: async (id, data) => {
        const response = await instance.put(`/venta/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a actualizar
     * @param {Partial<Venta>} data - Datos parciales de la Venta a actualizar
     * @returns {Promise<Venta>} */
    patchVentaById: async (id, data) => {
        const response = await instance.patch(`/venta/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a eliminar
     * @returns {Promise<void>} */
    deleteVentaById: async (id) => {
        const response = await instance.delete(`/venta/${id}`);
        return response.data;
    },
};

export default Venta;
