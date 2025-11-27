import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const diciplina = {
    getAll: async () => {
        try {
            const response = await instance.get('/diciplina');
            return response.data;
        } catch (error) {
            console.error('Error en getAll diciplina:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a buscar
     * @returns {Promise<Diciplina>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/diciplina/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById diciplina:', error);
            throw error;
        }
    },
    /**
     * @param {Diciplina} data - Datos de la Diciplina a crear
     * @returns {Promise<Diciplina>} */
    creatediciplina: async (data) => {
        try {
            const response = await instance.post('/diciplina', data);
            return response.data;
        } catch (error) {
            console.error('Error en creatediciplina:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Diciplina} data - Datos de la Diciplina a actualizar
     * @returns {Promise<Diciplina>}
     */
    updatediciplinaById: async (id, data) => {
        try {
            const response = await instance.put(`/diciplina/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updatediciplinaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Partial<Diciplina>} data - Datos parciales de la diciplina a actualizar
     * @returns {Promise<Diciplina>} */
    patchdiciplinaById: async (id, data) => {
        try {
            const response = await instance.patch(`/diciplina/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchdiciplinaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a eliminar
     * @returns {Promise<void>} */
    deletediciplinaById: async (id) => {
        try {
            const response = await instance.delete(`/diciplina/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deletediciplinaById:', error);
            throw error;
        }
    },
};

export default diciplina;
