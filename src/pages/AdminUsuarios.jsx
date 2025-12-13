import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';
import usuarioApi from '../api/objects/usuario.js';

const AdminUsuarios = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (user?.idRol?.idRol !== 1) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user?.idRol?.idRol === 1) {
            fetchUsuarios();
        }
    }, [user]);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const data = await usuarioApi.getAll();
            setUsuarios(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError('Error al cargar los usuarios');
            setUsuarios([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (usuarioId, nombreUsuario) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar a ${nombreUsuario}?`)) {
            return;
        }

        try {
            await usuarioApi.deleteUsuarioById(usuarioId);
            setUsuarios(usuarios.filter(u => u.idUsuario !== usuarioId));
        } catch (err) {
            alert('Error al eliminar el usuario');
        }
    };

    if (!user || user?.idRol?.idRol !== 1) {
        return (
            <Div className="flex items-center justify-center min-h-screen">
                <Text className="text-primary-foreground/60">Acceso denegado...</Text>
            </Div>
        );
    }

    return (
        <Div className="min-h-screen bg-gradient-to-b from-background to-background/50">
            <Div className="max-w-6xl mx-auto px-4 py-16">
                {/* Header */}
                <Div className="mb-8 flex items-center justify-between">
                    <Div>
                        <Text variant="h1" className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Gestión de Usuarios
                        </Text>
                        <Text className="text-primary-foreground/70">
                            Administra todos los usuarios registrados en la plataforma
                        </Text>
                    </Div>
                    <Button
                        onClick={() => navigate('/admin')}
                        className="bg-secondary/50 hover:bg-secondary/70 text-white"
                    >
                        Volver al Panel
                    </Button>
                </Div>

                {/* Error Message */}
                {error && (
                    <Div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                        <Text className="text-red-400">{error}</Text>
                    </Div>
                )}

                {/* Loading */}
                {loading ? (
                    <Div className="text-center py-12">
                        <Text className="text-primary-foreground/60">Cargando usuarios...</Text>
                    </Div>
                ) : usuarios.length === 0 ? (
                    <Div className="text-center py-12">
                        <Text className="text-primary-foreground/60">No hay usuarios registrados</Text>
                    </Div>
                ) : (
                    <Div className="rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                        <Div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-primary/20 bg-primary/10">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nombre</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rol</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario, index) => (
                                        <tr 
                                            key={usuario.idUsuario} 
                                            className={`border-b border-primary/10 transition-colors ${
                                                index % 2 === 0 ? 'bg-primary/5' : 'bg-transparent'
                                            } hover:bg-primary/15`}
                                        >
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {usuario.idUsuario}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm font-medium text-white">
                                                    {usuario.nombreUsuario}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {usuario.emailUsuario}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className={`text-sm font-medium inline-block px-3 py-1 rounded-full ${
                                                    usuario.idRol?.idRol === 1 
                                                        ? 'bg-red-600/30 text-red-400' 
                                                        : 'bg-green-600/30 text-green-400'
                                                }`}>
                                                    {usuario.idRol?.nombreRol || 'Sin rol'}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Div className="flex gap-3">
                                                    <Button
                                                        onClick={() => navigate(`/editar/${usuario.idUsuario}`)}
                                                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 whitespace-nowrap"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(usuario.idUsuario, usuario.nombreUsuario)}
                                                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 whitespace-nowrap"
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Div>
                    </Div>
                )}
            </Div>
        </Div>
    );
};

export default AdminUsuarios;
