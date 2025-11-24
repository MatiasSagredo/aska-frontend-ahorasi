import axios from "axios";

/** @typedef {Object} Estado
 * Objeto Estado
 * @property {number} idEstado - ID del Estado
 * @property {string} nombreEstado - Nombre del Estado
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Estado = {
    /** @returns {Promise<Array<Estado>>} */
    getAll: async () => {
        const response = await instance.get('/estado');
        return response.data;
    },
    /**
     * @param {number} id - ID del Estado a buscar
     * @returns {Promise<Estado>}
     */
    getById: async (id) => {
        const response = await instance.get(`/estado/${id}`);
        return response.data;
    },
    /**
     * @param {Estado} data - Datos del Estado a crear
     * @returns {Promise<Estado>} */
    createEstado: async (data) => {
        const response = await instance.post('/estado', data);
        return response.data;
    },
    /**
     * @param {number} id - ID del Estado a actualizar
     * @param {Estado} data - Datos del Estado a actualizar
     * @returns {Promise<Estado>}
     */
    updateEstadoById: async (id, data) => {
        const response = await instance.put(`/estado/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID del Estado a actualizar
     * @param {Partial<Estado>} data - Datos parciales del Estado a actualizar
     * @returns {Promise<Estado>} */
    patchEstadoById: async (id, data) => {
        const response = await instance.patch(`/estado/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID del Estado a eliminar
     * @returns {Promise<void>} */
    deleteEstadoById: async (id) => {
        const response = await instance.delete(`/estado/${id}`);
        return response.data;
    },
};

export default Estado;
