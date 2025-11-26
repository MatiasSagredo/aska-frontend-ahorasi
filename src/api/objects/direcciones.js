import axios from "axios";

/** @typedef {Object} Direcciones
 * Objeto Direcciones
 * @property {number} idDirecciones - ID de las Direcciones
 * @property {string} nombreCalle - Nombre de la Calle
 * @property {import('./usuario.js').Usuario} idUsuario - Usuario asociado a las Direcciones
 * @property {import('./comuna.js').Comuna} idComuna - Comuna asociada a las Direcciones
 */

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const direcciones = {
    /** @returns {Promise<Array<Direcciones>>} */
    getAll: async () => {
        try {
            const response = await instance.get('/direcciones');
            return response.data;
        } catch (error) {
            console.error('Error en getAll direcciones:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de las Direcciones a buscar
     * @returns {Promise<Direcciones>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/direcciones/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById direcciones:', error);
            throw error;
        }
    },
    /**
     * @param {Direcciones} data - Datos de las Direcciones a crear
     * @returns {Promise<Direcciones>} */
    createDirecciones: async (data) => {
        try {
            const response = await instance.post('/direcciones', data);
            return response.data;
        } catch (error) {
            console.error('Error en createDirecciones:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de las Direcciones a actualizar
     * @param {Direcciones} data - Datos de las Direcciones a actualizar
     * @returns {Promise<Direcciones>}
     */
    updateDireccionesById: async (id, data) => {
        try {
            const response = await instance.put(`/direcciones/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateDireccionesById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de la Direcciones a actualizar
     * @param {Partial<Direcciones>} data - Datos parciales de las Direcciones a actualizar
     * @returns {Promise<Direcciones>} */
    patchDireccionesById: async (id, data) => {
        try {
            const response = await instance.patch(`/direcciones/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchDireccionesById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID de las Direcciones a eliminar
     * @returns {Promise<void>} */
    deleteDireccionesById: async (id) => {
        try {
            const response = await instance.delete(`/direcciones/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteDireccionesById:', error);
            throw error;
        }
    },
};

export default direcciones;
