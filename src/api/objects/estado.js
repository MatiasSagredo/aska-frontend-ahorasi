import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Estado = {
    getAll: async () => {
        try {
            const response = await instance.get('/estado');
            return response.data;
        } catch (error) {
            console.error('Error en getAll estado:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Estado a buscar
     * @returns {Promise<Estado>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/estado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById estado:', error);
            throw error;
        }
    },
    /**
     * @param {Estado} data - Datos del Estado a crear
     * @returns {Promise<Estado>} */
    createEstado: async (data) => {
        try {
            const response = await instance.post('/estado', data);
            return response.data;
        } catch (error) {
            console.error('Error en createEstado:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Estado a actualizar
     * @param {Estado} data - Datos del Estado a actualizar
     * @returns {Promise<Estado>}
     */
    updateEstadoById: async (id, data) => {
        try {
            const response = await instance.put(`/estado/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateEstadoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Estado a actualizar
     * @param {Partial<Estado>} data - Datos parciales del Estado a actualizar
     * @returns {Promise<Estado>} */
    patchEstadoById: async (id, data) => {
        try {
            const response = await instance.patch(`/estado/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchEstadoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Estado a eliminar
     * @returns {Promise<void>} */
    deleteEstadoById: async (id) => {
        try {
            const response = await instance.delete(`/estado/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteEstadoById:', error);
            throw error;
        }
    },
};

export default Estado;
