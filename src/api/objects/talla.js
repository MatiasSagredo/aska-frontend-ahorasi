import axios from "axios";

/** @typedef {Object} Talla 
 * Objeto talla
 * @property {number} idTalla - ID del talla
 * @property {string} Talla - La talla
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const talla = {
    /** @returns {Promise<Array<Talla>>} */
    getAll: async () => {
        const response = await instance.get('/talla');
        return response.data;
    },
    /**
     * @param {number} id - ID de la talla a buscar
     * @returns {Promise<Talla>}
     */
    getById: async (id) => {
        const response = await instance.get(`/talla/${id}`);
        return response.data;
    },
    /**
     * @param {Talla} data - Datos de la talla a crear
     * @returns {Promise<Talla>} */
    createTalla: async (data) => {
        const response = await instance.post('/talla', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la talla a actualizar
     * @param {Talla} data - Datos de la talla a actualizar
     * @returns {Promise<Talla>} 
     */
    updateTallaById: async (id, data) => {
        const response = await instance.put(`/talla/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la talla a actualizar
     * @param {Partial<Talla>} data - Datos parciales de la talla a actualizar
     * @returns {Promise<Talla>} */
    patchTallaById: async (id, data) => {
        const response = await instance.patch(`/talla/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la talla a eliminar
     * @returns {Promise<void>} */
    deleteTallaById: async (id) => {
        const response = await instance.delete(`/talla/${id}`);
        return response.data;
    },
};

export default talla;