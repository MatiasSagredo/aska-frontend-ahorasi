import axios from "axios";

/** @typedef {Object} Producto
 * Objeto producto
 * @property {number} idProducto - ID del producto
 * @property {string} nombreProducto - Nombre del producto
 * @property {string} descripcion - Descripción del producto
 * @property {number} precio - Precio del producto
 * @property {import("./marca").Marca} idMarca - Marca del producto
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const producto = {
    /** @returns {Promise<Array<Producto>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/producto');
            return response.data;
        } catch (error) {
            console.error('Error en getAll producto:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del producto a buscar
     * @returns {Promise<Producto>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/producto/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById producto:', error);
            throw error;
        }
    },
    /**
     * @param {Producto} data - Datos del producto a crear
     * @returns {Promise<Producto>} */
    createProducto: async (data) => {
        try {
            const response = await instance.post('/producto', data);
            return response.data;
        } catch (error) {
            console.error('Error en createProducto:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del producto a actualizar
     * @param {Producto} data - Datos del producto a actualizar
     * @returns {Promise<Producto>}
     */
    updateProductoById: async (id, data) => {
        try {
            const response = await instance.put(`/producto/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateProductoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del producto a actualizar
     * @param {Partial<Producto>} data - Datos parciales del producto a actualizar
     * @returns {Promise<Producto>} */
    patchProductoById: async (id, data) => {
        try {
            const response = await instance.patch(`/producto/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchProductoById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del producto a eliminar
     * @returns {Promise<void>} */
    deleteProductoById: async (id) => {
        try {
            const response = await instance.delete(`/producto/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteProductoById:', error);
            throw error;
        }
    },
};

export default producto;
