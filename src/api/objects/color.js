import axios from "axios";

/** @typedef {Object} Color 
 * Objeto color
 * @property {number} idColor - ID del color
 * @property {string} nombreColor - Nombre del color
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const color = {
    /** @returns {Promise<Array<Color>>} */
    getAll: async () => {
        const response = await instance.get('/color');
        return response.data;
    },
    /**
     * @param {number} id - ID del color a buscar
     * @returns {Promise<Color>}
     */
    getById: async (id) => {
        const response = await instance.get(`/color/${id}`);
        return response.data;
    },
    /**
     * @param {Color} data - Datos del color a crear
     * @returns {Promise<Color>} */
    createColor: async (data) => {
        const response = await instance.post('/color', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del color a actualizar
     * @param {Color} data - Datos del color a actualizar
     * @returns {Promise<Color>} 
     */
    updateColorById: async (id, data) => {
        const response = await instance.put(`/color/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del color a actualizar
     * @param {Partial<Color>} data - Datos parciales del color a actualizar
     * @returns {Promise<Color>} */
    patchColorById: async (id, data) => {
        const response = await instance.patch(`/color/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del color a eliminar
     * @returns {Promise<void>} */
    deleteColorById: async (id) => {
        const response = await instance.delete(`/color/${id}`);
        return response.data;
    },
};

export default color;