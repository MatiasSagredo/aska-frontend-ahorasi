import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Region = {
    getAll: async () => {
        try {
            const response = await instance.get('/region');
            return response.data;
        } catch (error) {
            console.error('Error en getAll region:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Region a buscar
     * @returns {Promise<Region>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/region/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById region:', error);
            throw error;
        }
    },
    /**
     * @param {Region} data - Datos de la Region a crear
     * @returns {Promise<Region>} */
    createRegion: async (data) => {
        try {
            const response = await instance.post('/region', data);
            return response.data;
        } catch (error) {
            console.error('Error en createRegion:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Region a actualizar
     * @param {Region} data - Datos de la Region a actualizar
     * @returns {Promise<Region>}
     */
    updateRegionById: async (id, data) => {
        try {
            const response = await instance.put(`/region/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateRegionById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Region a actualizar
     * @param {Partial<Region>} data - Datos parciales de la Region a actualizar
     * @returns {Promise<Region>} */
    patchRegionById: async (id, data) => {
        try {
            const response = await instance.patch(`/region/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchRegionById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Region a eliminar
     * @returns {Promise<void>} */
    deleteRegionById: async (id) => {
        try {
            const response = await instance.delete(`/region/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteRegionById:', error);
            throw error;
        }
    },
};

export default Region;
