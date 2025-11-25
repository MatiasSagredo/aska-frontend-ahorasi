import axios from "axios";

/** @typedef {Object} Region
 * Objeto Region
 * @property {number} idRegion - ID de la Region
 * @property {string} nombreRegion - Nombre de la Region
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Region = {
    /** @returns {Promise<Array<Region>>} */
    getAll: async () => {
        const response = await instance.get('/region');
        return response.data;
    },
    /**
     * @param {number} id - ID de la Region a buscar
     * @returns {Promise<Region>}
     */
    getById: async (id) => {
        const response = await instance.get(`/region/${id}`);
        return response.data;
    },
    /**
     * @param {Region} data - Datos de la Region a crear
     * @returns {Promise<Region>} */
    createRegion: async (data) => {
        const response = await instance.post('/region', data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Region a actualizar
     * @param {Region} data - Datos de la Region a actualizar
     * @returns {Promise<Region>}
     */
    updateRegionById: async (id, data) => {
        const response = await instance.put(`/region/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Region a actualizar
     * @param {Partial<Region>} data - Datos parciales de la Region a actualizar
     * @returns {Promise<Region>} */
    patchRegionById: async (id, data) => {
        const response = await instance.patch(`/region/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Region a eliminar
     * @returns {Promise<void>} */
    deleteRegionById: async (id) => {
        const response = await instance.delete(`/region/${id}`);
        return response.data;
    },
};

export default Region;
