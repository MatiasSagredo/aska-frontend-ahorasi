import axios from "axios";

/** @typedef {Object} MetodoPago
 * Objeto MetodoPago
 * @property {number} idMetodoPago - ID de la MetodoPago
 * @property {string} nombreMetodoPago - Nombre de la MetodoPago
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const metodoPago = {
    /** @returns {Promise<Array<MetodoPago>>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/metodopago');
            return response.data;
        } catch (error) {
            console.error('Error en getAll metodopago:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodopago a buscar
     * @returns {Promise<MetodoPago>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/metodopago/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById metodopago:', error);
            throw error;
        }
    },
    /**
     * @param {MetodoPago} data - Datos de la metodopago a crear
     * @returns {Promise<MetodoPago>} */
    createMetodoPago: async (data) => {
        try {
            const response = await instance.post('/metodopago', data);
            return response.data;
        } catch (error) {
            console.error('Error en createMetodoPago:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodopago a actualizar
     * @param {MetodoPago} data - Datos de la metodopago a actualizar
     * @returns {Promise<MetodoPago>}
     */
    updateMetodoPagoById: async (id, data) => {
        try {
            const response = await instance.put(`/metodopago/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateMetodoPagoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodopago a actualizar
     * @param {Partial<MetodoPago>} data - Datos parciales de la metodopago a actualizar
     * @returns {Promise<MetodoPago>} */
    patchMetodoPagoById: async (id, data) => {
        try {
            const response = await instance.patch(`/metodopago/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchMetodoPagoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodopago a eliminar
     * @returns {Promise<void>} */
    deleteMetodoPagoById: async (id) => {
        try {
            const response = await instance.delete(`/metodopago/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteMetodoPagoById:', error);
            throw error;
        }
    },
};

export default metodoPago;
