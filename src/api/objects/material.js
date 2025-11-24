import axios from "axios";

/** @typedef {Object} Material 
 * Objeto material
 * @property {number} idMaterial - ID del material
 * @property {string} nombreMaterial - Nombre del material
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const material = {
    /** @returns {Promise<Array<Material>>} */
    getAll: async () => {
        const response = await instance.get('/material');
        return response.data;
    },
    /**
     * @param {number} id - ID del material a buscar
     * @returns {Promise<Material>}
     */
    getById: async (id) => {
        const response = await instance.get(`/material/${id}`);
        return response.data;
    },
    /**
     * @param {Material} data - Datos del material a crear
     * @returns {Promise<Material>} */
    createMaterial: async (data) => {
        const response = await instance.post('/material', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del material a actualizar
     * @param {Material} data - Datos del material a actualizar
     * @returns {Promise<Material>} 
     */
    updateMaterialById: async (id, data) => {
        const response = await instance.put(`/material/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del material a actualizar
     * @param {Partial<Material>} data - Datos parciales del material a actualizar
     * @returns {Promise<Material>} */
    patchMaterialById: async (id, data) => {
        const response = await instance.patch(`/material/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del material a eliminar
     * @returns {Promise<void>} */
    deleteMaterialById: async (id) => {
        const response = await instance.delete(`/material/${id}`);
        return response.data;
    },
};

export default material;