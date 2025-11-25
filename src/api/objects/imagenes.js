import axios from "axios";

/** @typedef {Object} Imagenes
 * Objeto imagenes
 * @property {number} idImagen - ID de la imagen
 * @property {string} urlImagen - Url de la imagen
 * @property {import('./producto.js').Producto} idProducto - Producto asociado a la imagen
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const imagenes = {
    /** @returns {Promise<Array<Imagenes>>} */
    getAll: async () => {
        const response = await instance.get('/Imagenes');
        return response.data;
    },
    /**
     * @param {number} id - ID de las imagenes a buscar
     * @returns {Promise<Imagenes>}
     */
    getById: async (id) => {
        const response = await instance.get(`/Imagenes/${id}`);
        return response.data;
    },
    /**
     * @param {Imagenes} data - Datos de las imagenes a crear
     * @returns {Promise<Imagenes>} */
    createImagenes: async (data) => {
        const response = await instance.post('/Imagenes', data);
        return response.data;
    },
    /**
     * @param {number} id - ID de las imagenes a actualizar
     * @param {Imagenes} data - Datos de las imagenes a actualizar
     * @returns {Promise<Imagenes>}
     */
    updateImagenesById: async (id, data) => {
        const response = await instance.put(`/Imagenes/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de las imagenes a actualizar
     * @param {Partial<Imagenes>} data - Datos parciales de las imagenes a actualizar
     * @returns {Promise<Imagenes>} */
    patchImagenesById: async (id, data) => {
        const response = await instance.patch(`/Imagenes/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de las imagenes a eliminar
     * @returns {Promise<void>} */
    deleteImagenesById: async (id) => {
        const response = await instance.delete(`/Imagenes/${id}`);
        return response.data;
    },
};

export default imagenes;
