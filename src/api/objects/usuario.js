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
        const response = await instance.get('/usuario');
        return response.data;
    },
    /**
     * @param {number} id - ID del Usuario a buscar
     * @returns {Promise<Usuario>}
     */
    getById: async (id) => {
        const response = await instance.get(`/usuario/${id}`);
        return response.data;
    },
    /**
     * @param {Usuario} data - Datos del Usuario a crear
     * @returns {Promise<Usuario>} */
    createUsuario: async (data) => {
        const response = await instance.post('/usuario', data);
        return response.data;
    },
    /**
     * @param {number} id - ID del Usuario a actualizar
     * @param {Usuario} data - Datos del Usuario a actualizar
     * @returns {Promise<Usuario>}
     */
    updateUsuarioById: async (id, data) => {
        const response = await instance.put(`/usuario/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID del Usuario a actualizar
     * @param {Partial<Usuario>} data - Datos parciales del Usuario a actualizar
     * @returns {Promise<Usuario>} */
    patchUsuarioById: async (id, data) => {
        const response = await instance.patch(`/usuario/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID del Usuario a eliminar
     * @returns {Promise<void>} */
    deleteUsuarioById: async (id) => {
        const response = await instance.delete(`/usuario/${id}`);
        return response.data;
    },
};

export default usuario;
