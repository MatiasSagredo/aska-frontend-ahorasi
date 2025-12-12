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
    createDiciplina: async (data) => {
        try {
            const response = await instance.post('/diciplina', data);
            return response.data;
        } catch (error) {
            console.error('Error en createDiciplina:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Diciplina} data - Datos de la Diciplina a actualizar
     * @returns {Promise<Diciplina>}
     */
    updateDiciplinaById: async (id, data) => {
        try {
            const response = await instance.put(`/diciplina/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateDiciplinaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a actualizar
     * @param {Partial<Diciplina>} data - Datos parciales de la diciplina a actualizar
     * @returns {Promise<Diciplina>} */
    patchDiciplinaById: async (id, data) => {
        try {
            const response = await instance.patch(`/diciplina/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchDiciplinaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la diciplina a eliminar
     * @returns {Promise<void>} */
    deleteDiciplinaById: async (id) => {
        try {
            const response = await instance.delete(`/diciplina/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteDiciplinaById:', error);
            throw error;
        }
    },
};

export default diciplina;
