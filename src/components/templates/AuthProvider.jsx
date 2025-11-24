import { createContext, useContext, useMemo, useState } from 'react'

const SUPERUSER = {
  id: 'superuser',
  name: 'Maestro Aska',
  email: 'admin@askagear.com',
  password: 'SuperAska#2025',
  role: 'superuser',
  belt: 'negro',
}

const AuthContext = createContext({
  user: null,
  users: [],
  isSuperUser: false,
  login: () => ({ success: false, message: 'Auth not initialised' }),
  register: () => ({ success: false, message: 'Auth not initialised' }),
  logout: () => { },
})

function AuthProvider({ children }) {
  const [users, setUsers] = useState([SUPERUSER])
  const [user, setUser] = useState(null)

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const foundUser = users.find((item) => item.email === normalizedEmail)

    if (!foundUser) {
      return { success: false, message: 'El correo no está registrado.' }
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Contraseña incorrecta.' }
    }

    setUser(foundUser)
    return { success: true, user: foundUser }
  }

  const register = ({ name, email, password, belt }) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (users.some((item) => item.email === normalizedEmail)) {
      return { success: false, message: 'Ya existe un usuario con este correo.' }
    }

    const newUser = {
      id:
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `user-${Date.now()}`),
      name: name.trim() || 'Atleta Aska',
      email: normalizedEmail,
      password,
      belt,
      role: 'cliente',
    }

    setUsers((prev) => [...prev, newUser])
    setUser(newUser)

    return { success: true, user: newUser }
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      users,
      isSuperUser: user?.role === 'superuser',
      login,
      register,
      logout,
      superuserEmail: SUPERUSER.email,
    }),
    [user, users, login, register],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}

export { AuthProvider as default, useAuth }