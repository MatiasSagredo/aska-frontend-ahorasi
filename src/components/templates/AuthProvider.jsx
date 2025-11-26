import { createContext, useState, useEffect, useContext } from 'react';
import usuarioApi from '../../api/objects/usuario';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  /** @type {[import('../../api/objects/usuario.js').Usuario]} */
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
      return { success: false, message: error.message || 'Error al iniciar sesión' };
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

  // 3. Función de Logout
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
