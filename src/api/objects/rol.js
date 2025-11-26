import axios from "axios";

/** @typedef {Object} Rol
 * Objeto rol
 * @property {number} idRol - ID del rol
 * @property {string} nombreRol - Nombre del rol
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const rol = {
    /** @returns {Promise<Array<Rol>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/rol');
            return response.data;
        } catch (error) {
            console.error('Error en getAll rol:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del rol a buscar
     * @returns {Promise<Rol>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/rol/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById rol:', error);
            throw error;
        }
    },
    /**
     * @param {Rol} data - Datos del rol a crear
     * @returns {Promise<Rol>} */
    createRol: async (data) => {
        try {
            const response = await instance.post('/rol', data);
            return response.data;
        } catch (error) {
            console.error('Error en createRol:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del rol a actualizar
     * @param {Rol} data - Datos del rol a actualizar
     * @returns {Promise<Rol>}
     */
    updateRolById: async (id, data) => {
        try {
            const response = await instance.put(`/rol/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateRolById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del rol a actualizar
     * @param {Partial<Rol>} data - Datos parciales del rol a actualizar
     * @returns {Promise<Rol>} */
    patchRolById: async (id, data) => {
        try {
            const response = await instance.patch(`/rol/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchRolById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del rol a eliminar
     * @returns {Promise<void>} */
    deleteRolById: async (id) => {
        try {
            const response = await instance.delete(`/rol/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteRolById:', error);
            throw error;
        }
    },
};

export default rol;
