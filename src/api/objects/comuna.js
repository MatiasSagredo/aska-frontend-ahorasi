import axios from "axios";

/** @typedef {Object} Comuna
 * Objeto Comuna
 * @property {number} idComuna - ID de la Comuna
 * @property {string} nombreComuna - Nombre de la Comuna
 * @property {import('./region').Region} idRegion - Región a la que pertenece la Comuna.
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Comuna = {
    /** @returns {Promise<Array<Comuna>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/comuna');
            return response.data;
        } catch (error) {
            console.error('Error en getAll comuna:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Comuna a buscar
     * @returns {Promise<Comuna>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/comuna/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById comuna:', error);
            throw error;
        }
    },
    /**
     * @param {Comuna} data - Datos de la Comuna a crear
     * @returns {Promise<Comuna>} */
    createComuna: async (data) => {
        try {
            const response = await instance.post('/comuna', data);
            return response.data;
        } catch (error) {
            console.error('Error en createComuna:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Comuna a actualizar
     * @param {Comuna} data - Datos de la Comuna a actualizar
     * @returns {Promise<Comuna>}
     */
    updateComunaById: async (id, data) => {
        try {
            const response = await instance.put(`/comuna/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateComunaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Comuna a actualizar
     * @param {Partial<Comuna>} data - Datos parciales de la Comuna a actualizar
     * @returns {Promise<Comuna>} */
    patchComunaById: async (id, data) => {
        try {
            const response = await instance.patch(`/comuna/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchComunaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Comuna a eliminar
     * @returns {Promise<void>} */
    deleteComunaById: async (id) => {
        try {
            const response = await instance.delete(`/comuna/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteComunaById:', error);
            throw error;
        }
    },
};

export default Comuna;
