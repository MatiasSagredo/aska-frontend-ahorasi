import axios from "axios";

/** @typedef {Object} metodopago 
 * Objeto metodopago
 * @property {number} idmetodopago - ID de la metodopago
 * @property {string} nombremetodopago - Nombre de la metodopago
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const metodopago = {
    /** @returns {Promise<Array<metodopago>>} */
    getAll: async () => {
        const response = await instance.get('/metodopago');
        return response.data;
    },
    /**
     * @param {number} id - ID de la metodopago a buscar
     * @returns {Promise<metodopago>}
     */
    getById: async (id) => {
        const response = await instance.get(`/metodopago/${id}`);
        return response.data;
    },
    /**
     * @param {metodopago} data - Datos de la metodopago a crear
     * @returns {Promise<metodopago>} */
    createmetodopago: async (data) => {
        const response = await instance.post('/metodopago', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la metodopago a actualizar
     * @param {metodopago} data - Datos de la metodopago a actualizar
     * @returns {Promise<metodopago>} 
     */
    updatemetodopagoById: async (id, data) => {
        const response = await instance.put(`/metodopago/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la metodopago a actualizar
     * @param {Partial<metodopago>} data - Datos parciales de la metodopago a actualizar
     * @returns {Promise<metodopago>} */
    patchmetodopagoById: async (id, data) => {
        const response = await instance.patch(`/metodopago/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la metodopago a eliminar
     * @returns {Promise<void>} */
    deletemetodopagoById: async (id) => {
        const response = await instance.delete(`/metodopago/${id}`);
        return response.data;
    },
};

export default metodopago;