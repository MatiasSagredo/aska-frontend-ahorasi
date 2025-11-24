import axios from "axios";

/** @typedef {Object} metodoenvio 
 * Objeto metodoenvio
 * @property {number} idmetodoenvio - ID de la metodoenvio
 * @property {string} nombremetodoenvio - Nombre de la metodoenvio
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const metodoenvio = {
    /** @returns {Promise<Array<metodoenvio>>} */
    getAll: async () => {
        const response = await instance.get('/metodoenvio');
        return response.data;
    },
    /**
     * @param {number} id - ID de la metodoenvio a buscar
     * @returns {Promise<metodoenvio>}
     */
    getById: async (id) => {
        const response = await instance.get(`/metodoenvio/${id}`);
        return response.data;
    },
    /**
     * @param {metodoenvio} data - Datos de la metodoenvio a crear
     * @returns {Promise<metodoenvio>} */
    createmetodoenvio: async (data) => {
        const response = await instance.post('/metodoenvio', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la metodoenvio a actualizar
     * @param {metodoenvio} data - Datos de la metodoenvio a actualizar
     * @returns {Promise<metodoenvio>} 
     */
    updatemetodoenvioById: async (id, data) => {
        const response = await instance.put(`/metodoenvio/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la metodoenvio a actualizar
     * @param {Partial<metodoenvio>} data - Datos parciales de la metodoenvio a actualizar
     * @returns {Promise<metodoenvio>} */
    patchmetodoenvioById: async (id, data) => {
        const response = await instance.patch(`/metodoenvio/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la metodoenvio a eliminar
     * @returns {Promise<void>} */
    deletemetodoenvioById: async (id) => {
        const response = await instance.delete(`/metodoenvio/${id}`);
        return response.data;
    },
};

export default metodoenvio;