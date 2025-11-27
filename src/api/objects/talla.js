import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const talla = {
    getAll: async () => {
        try {
            const response = await instance.get('/talla');
            return response.data;
        } catch (error) {
            console.error('Error en getAll talla:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la talla a buscar
     * @returns {Promise<Talla>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/talla/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById talla:', error);
            throw error;
        }
    },
    /**
     * @param {Talla} data - Datos de la talla a crear
     * @returns {Promise<Talla>} */
    createTalla: async (data) => {
        try {
            const response = await instance.post('/talla', data);
            return response.data;
        } catch (error) {
            console.error('Error en createTalla:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la talla a actualizar
     * @param {Talla} data - Datos de la talla a actualizar
     * @returns {Promise<Talla>}
     */
    updateTallaById: async (id, data) => {
        try {
            const response = await instance.put(`/talla/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateTallaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la talla a actualizar
     * @param {Partial<Talla>} data - Datos parciales de la talla a actualizar
     * @returns {Promise<Talla>} */
    patchTallaById: async (id, data) => {
        try {
            const response = await instance.patch(`/talla/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchTallaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la talla a eliminar
     * @returns {Promise<void>} */
    deleteTallaById: async (id) => {
        try {
            const response = await instance.delete(`/talla/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteTallaById:', error);
            throw error;
        }
    },
};

export default talla;
