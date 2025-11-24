import axios from "axios";

/** @typedef {Object} Marca
 * Objeto marca
 * @property {number} idMarca - ID de la marca
 * @property {string} nombreMarca - Nombre de la marca
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const marca = {
    /** @returns {Promise<Array<Marca>>} */
    getAll: async () => {
        const response = await instance.get('/marca');
        return response.data;
    },
    /**
     * @param {number} id - ID de la marca a buscar
     * @returns {Promise<Marca>}
     */
    getById: async (id) => {
        const response = await instance.get(`/marca/${id}`);
        return response.data;
    },
    /**
     * @param {Marca} data - Datos de la marca a crear
     * @returns {Promise<Marca>} */
    createMarca: async (data) => {
        const response = await instance.post('/marca', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la marca a actualizar
     * @param {Marca} data - Datos de la marca a actualizar
     * @returns {Promise<Marca>} 
     */
    updateMarcaById: async (id, data) => {
        const response = await instance.put(`/marca/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la marca a actualizar
     * @param {Partial<Marca>} data - Datos parciales de la marca a actualizar
     * @returns {Promise<Marca>} */
    patchMarcaById: async (id, data) => {
        const response = await instance.patch(`/marca/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID de la marca a eliminar
     * @returns {Promise<void>} */
    deleteMarcaById: async (id) => {
        const response = await instance.delete(`/marca/${id}`);
        return response.data;
    },
};

export default marca;