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
        const response = await instance.get('/producto');
        return response.data;
    },
    /**
     * @param {number} id - ID del producto a buscar
     * @returns {Promise<Producto>}
     */
    getById: async (id) => {
        const response = await instance.get(`/producto/${id}`);
        return response.data;
    },
    /**
     * @param {Producto} data - Datos del producto a crear
     * @returns {Promise<Producto>} */
    createProducto: async (data) => {
        const response = await instance.post('/producto', data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del producto a actualizar
     * @param {Producto} data - Datos del producto a actualizar
     * @returns {Promise<Producto>} 
     */
    updateProductoById: async (id, data) => {
        const response = await instance.put(`/producto/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del producto a actualizar
     * @param {Partial<Producto>} data - Datos parciales del producto a actualizar
     * @returns {Promise<Producto>} */
    patchProductoById: async (id, data) => {
        const response = await instance.patch(`/producto/${id}`, data);
        return response.data;
    },
    /** 
     * @param {number} id - ID del producto a eliminar
     * @returns {Promise<void>} */
    deleteProductoById: async (id) => {
        const response = await instance.delete(`/producto/${id}`);
        return response.data;
    },
};

export default producto;