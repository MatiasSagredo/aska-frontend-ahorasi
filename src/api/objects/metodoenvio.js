import axios from "axios";

/** @typedef {Object} MetodoEnvio
 * Objeto MetodoEnvio
 * @property {number} idMetodoEnvio - ID de la MetodoEnvio
 * @property {string} nombreMetodoEnvio - Nombre de la MetodoEnvio
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const metodoEnvio = {
    /** @returns {Promise<Array<MetodoEnvio>>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/metodoenvio');
            return response.data;
        } catch (error) {
            console.error('Error en getAll metodoenvio:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodoenvio a buscar
     * @returns {Promise<MetodoEnvio>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/metodoenvio/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById metodoenvio:', error);
            throw error;
        }
    },
    /**
     * @param {MetodoEnvio} data - Datos de la metodoenvio a crear
     * @returns {Promise<MetodoEnvio>} */
    createMetodoEnvio: async (data) => {
        try {
            const response = await instance.post('/metodoenvio', data);
            return response.data;
        } catch (error) {
            console.error('Error en createMetodoEnvio:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodoenvio a actualizar
     * @param {MetodoEnvio} data - Datos de la metodoenvio a actualizar
     * @returns {Promise<MetodoEnvio>}
     */
    updateMetodoEnvioById: async (id, data) => {
        try {
            const response = await instance.put(`/metodoenvio/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateMetodoEnvioById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodoenvio a actualizar
     * @param {Partial<MetodoEnvio>} data - Datos parciales de la metodoenvio a actualizar
     * @returns {Promise<MetodoEnvio>} */
    patchMetodoEnvioById: async (id, data) => {
        try {
            const response = await instance.patch(`/metodoenvio/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchMetodoEnvioById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la metodoenvio a eliminar
     * @returns {Promise<void>} */
    deleteMetodoEnvioById: async (id) => {
        try {
            const response = await instance.delete(`/metodoenvio/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteMetodoEnvioById:', error);
            throw error;
        }
    },
};

export default metodoEnvio;
