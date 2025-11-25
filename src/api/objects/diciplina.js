import axios from "axios";

/** @typedef {Object} Diciplina
 * Objeto Diciplina
 * @property {number} idDiciplina - ID de la Diciplina
 * @property {string} nombreDiciplina - Nombre de la Diciplina
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const diciplina = {
    /** @returns {Promise<Array<Diciplina>>} */
    getAll: async () => {
        const response = await instance.get('/diciplina');
        return response.data;
    },
    /**
     * @param {number} id - ID de la diciplina a buscar
     * @returns {Promise<Diciplina>}
     */
    getById: async (id) => {
        const response = await instance.get(`/diciplina/${id}`);
        return response.data;
    },
    /**
     * @param {Diciplina} data - Datos de la Diciplina a crear
     * @returns {Promise<Diciplina>} */
    creatediciplina: async (data) => {
        const response = await instance.post('/diciplina', data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Diciplina} data - Datos de la Diciplina a actualizar
     * @returns {Promise<Diciplina>}
     */
    updatediciplinaById: async (id, data) => {
        const response = await instance.put(`/diciplina/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Partial<Diciplina>} data - Datos parciales de la diciplina a actualizar
     * @returns {Promise<Diciplina>} */
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
