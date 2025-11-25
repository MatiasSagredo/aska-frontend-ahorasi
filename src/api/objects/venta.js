import axios from "axios";

/** @typedef {Object} Venta
 * Objeto Venta
 * @property {number} idVenta - ID de la Venta
 * @property {number?} total - Total de la Venta
 * @property {import('./estado.js').Estado} idEstado - Estado de la Venta
 * @property {import('./metodopago.js').MetodoPago} idMetodoPago - Metodo de Pago de la Venta
 * @property {import('./metodoenvio.js').MetodoEnvio} idMetodoEnvio - Metodo de Envio de la Venta
 * @property {import('./usuario.js').Usuario} idUsuario - Usuario asociado a la Venta
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const venta = {
    /** @returns {Promise<Array<Venta>>} */
    getAll: async () => {
        const response = await instance.get('/venta');
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a buscar
     * @returns {Promise<Venta>}
     */
    getById: async (id) => {
        const response = await instance.get(`/venta/${id}`);
        return response.data;
    },
    /**
     * @param {Venta} data - Datos de la Venta a crear
     * @returns {Promise<Venta>} */
    createVenta: async (data) => {
        const response = await instance.post('/venta', data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a actualizar
     * @param {Venta} data - Datos de la Venta a actualizar
     * @returns {Promise<Venta>}
     */
    updateVentaById: async (id, data) => {
        const response = await instance.put(`/venta/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a actualizar
     * @param {Partial<Venta>} data - Datos parciales de la Venta a actualizar
     * @returns {Promise<Venta>} */
    patchVentaById: async (id, data) => {
        const response = await instance.patch(`/venta/${id}`, data);
        return response.data;
    },
    /**
     * @param {number} id - ID de la Venta a eliminar
     * @returns {Promise<void>} */
    deleteVentaById: async (id) => {
        const response = await instance.delete(`/venta/${id}`);
        return response.data;
    },
};

export default venta;
