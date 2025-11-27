import axios from "axios";

let instance = axios.create({
    baseURL: 'https://aska-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const usuario = {
    /**
     * @param {string} email - Email del usuario
     * @returns {Promise<Usuario>}
     */
    login: async (email, password) => {
        try {
            const response = await instance.post('/usuarios/login', { emailUsuario: email, contrasenaUsuario: password });
            return response.data;
        } catch (error) {
            console.error('Error en login usuario:', error);
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await instance.get('/usuarios');
            return response.data;
        } catch (error) {
            console.error('Error en getAll usuario:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a buscar
     * @returns {Promise<Usuario>}
     */
    getById: async (id) => {
        try {
            const response = await instance.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getById usuario:', error);
            throw error;
        }
    },
    /**
     * @param {Usuario} data - Datos del Usuario a crear
     * @returns {Promise<Usuario>} */
    createUsuario: async (data) => {
        try {
            const response = await instance.post('/usuarios', data);
            return response.data;
        } catch (error) {
            console.error('Error en createUsuario:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a actualizar
     * @param {Usuario} data - Datos del Usuario a actualizar
     * @returns {Promise<Usuario>}
     */
    updateUsuarioById: async (id, data) => {
        try {
            const response = await instance.put(`/usuarios/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateUsuarioById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a actualizar
     * @param {Partial<Usuario>} data - Datos parciales del Usuario a actualizar
     * @returns {Promise<Usuario>} */
    patchUsuarioById: async (id, data) => {
        try {
            const response = await instance.patch(`/usuarios/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en patchUsuarioById:', error);
            throw error;
        }
    },
    /**
     * @param {number} id - ID del Usuario a eliminar
     * @returns {Promise<void>} */
    deleteUsuarioById: async (id) => {
        try {
            const response = await instance.delete(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteUsuarioById:', error);
            throw error;
        }
    },
};

export default usuario;
