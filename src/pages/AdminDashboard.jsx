import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (user?.idRol?.idRol !== 1) {
            navigate('/');
        }
    }, [user, navigate]);

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
                <Div className="mb-12">
                    <Text variant="h1" className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Panel de Administración
                    </Text>
                    <Text className="text-lg text-primary-foreground/70">
                        Bienvenido, {user?.nombreUsuario}. Gestiona aquí todos los aspectos de tu tienda.
                    </Text>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Gestión de Productos */}
                    <Div className="p-6 rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm hover:border-primary/60 transition-all">
                        <Div className="mb-4">
                            <Text variant="h3" className="text-2xl font-bold text-white">
                                Productos
                            </Text>
                        </Div>
                        <Text className="text-primary-foreground/70 mb-6">
                            Crea, edita y elimina productos de tu catálogo.
                        </Text>
                        <Div className="flex flex-col gap-2">
                            <Button
                                onClick={() => navigate('/admin/productos')}
                                className="bg-button hover:brightness-80 text-white w-full"
                            >
                                Gestionar Productos
                            </Button>
                        </Div>
                    </Div>

                    {/* Gestión de Órdenes */}
                    <Div className="p-6 rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm hover:border-primary/60 transition-all">
                        <Div className="mb-4">
                            <Text variant="h3" className="text-2xl font-bold text-white">
                                Órdenes
                            </Text>
                        </Div>
                        <Text className="text-primary-foreground/70 mb-6">
                            Visualiza y gestiona las órdenes de los clientes.
                        </Text>
                        <Button
                            onClick={() => navigate('/admin/ordenes')}
                            className="bg-button hover:brightness-80 text-white w-full"
                        >
                            Ver Órdenes
                        </Button>
                    </Div>

                    {/* Gestión de Usuarios */}
                    <Div className="p-6 rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm hover:border-primary/60 transition-all">
                        <Div className="mb-4">
                            <Text variant="h3" className="text-2xl font-bold text-white">
                                Usuarios
                            </Text>
                        </Div>
                        <Text className="text-primary-foreground/70 mb-6">
                            Administra usuarios y sus permisos.
                        </Text>
                        <Button
                            onClick={() => navigate('/admin/usuarios')}
                            className="bg-button hover:brightness-80 text-white w-full"
                        >
                            Ver Usuarios
                        </Button>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default AdminDashboard;
