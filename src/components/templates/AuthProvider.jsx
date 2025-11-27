import { createContext, useState, useEffect, useContext } from 'react';
import usuarioApi from '../../api/objects/usuario';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await usuarioApi.login(email, password);

            setUser(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));

            return { success: true };
        } catch (error) {
            const resp = error?.response;
            const status = resp?.status ?? error?.status;
            // backend might return structured data with message
            const backendMessage = resp?.data?.message ?? resp?.data ?? null;
            let message;
            if (status === 401) {
                message = 'Credenciales incorrectas';
            } else if (backendMessage && typeof backendMessage === 'string') {
                message = backendMessage;
            } else if (error?.message && error.message.includes('401')) {
                message = 'Credenciales incorrectas';
            } else {
                message = error?.message || 'Error al iniciar sesión';
            }
            return { success: false, message };
        }
    };

    const register = async (data) => {
        try {
            await usuarioApi.createUsuario(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || 'Error al registrarse' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
