import axios from "axios";

/** @typedef {Object} Usuario
 * Objeto Usuario
 * @property {number} idUsuario - ID del Usuario
 * @property {string} nombreUsuario - Nombre del Usuario
 * @property {string} emailUsuario - Email del Usuario
 * @property {import('./rol.js').Rol} idRol - Rol del Usuario
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const usuario = {
    /** @returns {Promise<Array<Usuario>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/usuario');
            return response.data;
        } catch (error) {
            console.error('Error en getAll usuario:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a buscar
     * @returns {Promise<Usuario>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/usuario/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById usuario:', error);
            throw error;
        }
    },
    /**
     * @param {Usuario} data - Datos del Usuario a crear
     * @returns {Promise<Usuario>} */
    createUsuario: async (data) => {
        try {
            const response = await instance.post('/usuario', data);
            return response.data;
        } catch (error) {
            console.error('Error en createUsuario:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a actualizar
     * @param {Usuario} data - Datos del Usuario a actualizar
     * @returns {Promise<Usuario>}
     */
    updateUsuarioById: async (id, data) => {
        try {
            const response = await instance.put(`/usuario/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateUsuarioById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a actualizar
     * @param {Partial<Usuario>} data - Datos parciales del Usuario a actualizar
     * @returns {Promise<Usuario>} */
    patchUsuarioById: async (id, data) => {
        try {
            const response = await instance.patch(`/usuario/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchUsuarioById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a eliminar
     * @returns {Promise<void>} */
    deleteUsuarioById: async (id) => {
        try {
            const response = await instance.delete(`/usuario/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteUsuarioById:', error);
            throw error;
        }
    },
};

export default usuario;
