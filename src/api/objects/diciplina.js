import axios from "axios";

/** @typedef {Object} diciplina 
 * Objeto diciplina
 * @property {number} iddiciplina - ID de la diciplina
 * @property {string} nombrediciplina - Nombre de la diciplina
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const diciplina = {
    /** @returns {Promise<Array<diciplina>>} */
    getAll: async () => {
        const response = await instance.get('/diciplina');
        return response.data;
    },
    /**
     * @param {number} id - ID de la diciplina a buscar
     * @returns {Promise<diciplina>}
     */
    getById: async (id) => {
        const response = await instance.get(`/diciplina/${id}`);
        return response.data;
    },
    /**
     * @param {diciplina} data - Datos de la diciplina a crear
     * @returns {Promise<diciplina>} */
    creatediciplina: async (data) => {
        const response = await instance.post('/diciplina', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la diciplina a actualizar
     * @param {diciplina} data - Datos de la diciplina a actualizar
     * @returns {Promise<diciplina>} 
     */
    updatediciplinaById: async (id, data) => {
        const response = await instance.put(`/diciplina/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Partial<diciplina>} data - Datos parciales de la diciplina a actualizar
     * @returns {Promise<diciplina>} */
    patchdiciplinaById: async (id, data) => {
        const response = await instance.patch(`/diciplina/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la diciplina a eliminar
     * @returns {Promise<void>} */
    deletediciplinaById: async (id) => {
        const response = await instance.delete(`/diciplina/${id}`);
        return response.data;
    },
};

export default diciplina;