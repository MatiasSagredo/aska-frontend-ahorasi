import axios from "axios";

/** @typedef {Object} Grado
 * Objeto grado
 * @property {number} idGrado - ID del grado
 * @property {string} nombreGrado - Nombre del grado
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const grado = {
    /** @returns {Promise<Array<Grado>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/grado');
            return response.data;
        } catch (error) {
            console.error('Error en getAll grado:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del grado a buscar
     * @returns {Promise<Grado>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/grado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById grado:', error);
            throw error;
        }
    },
    /**
     * @param {Grado} data - Datos del grado a crear
     * @returns {Promise<Grado>} */
    createGrado: async (data) => {
        try {
            const response = await instance.post('/grado', data);
            return response.data;
        } catch (error) {
            console.error('Error en createGrado:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del grado a actualizar
     * @param {Grado} data - Datos del grado a actualizar
     * @returns {Promise<Grado>}
     */
    updateGradoById: async (id, data) => {
        try {
            const response = await instance.put(`/grado/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateGradoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del grado a actualizar
     * @param {Partial<Grado>} data - Datos parciales del grado a actualizar
     * @returns {Promise<Grado>} */
    patchGradoById: async (id, data) => {
        try {
            const response = await instance.patch(`/grado/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchGradoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del grado a eliminar
     * @returns {Promise<void>} */
    deleteGradoById: async (id) => {
        try {
            const response = await instance.delete(`/grado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteGradoById:', error);
            throw error;
        }
    },
};

export default grado;
