import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const marca = {
    getAll: async () => {
        try {
            const response = await instance.get('/marca');
            return response.data;
        } catch (error) {
            console.error('Error en getAll marca:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la marca a buscar
     * @returns {Promise<Marca>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/marca/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById marca:', error);
            throw error;
        }
    },
    /**
     * @param {Marca} data - Datos de la marca a crear
     * @returns {Promise<Marca>} */
    createMarca: async (data) => {
        try {
            const response = await instance.post('/marca', data);
            return response.data;
        } catch (error) {
            console.error('Error en createMarca:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la marca a actualizar
     * @param {Marca} data - Datos de la marca a actualizar
     * @returns {Promise<Marca>}
     */
    updateMarcaById: async (id, data) => {
        try {
            const response = await instance.put(`/marca/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateMarcaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la marca a actualizar
     * @param {Partial<Marca>} data - Datos parciales de la marca a actualizar
     * @returns {Promise<Marca>} */
    patchMarcaById: async (id, data) => {
        try {
            const response = await instance.patch(`/marca/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchMarcaById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la marca a eliminar
     * @returns {Promise<void>} */
    deleteMarcaById: async (id) => {
        try {
            const response = await instance.delete(`/marca/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteMarcaById:', error);
            throw error;
        }
    },
};

export default marca;
