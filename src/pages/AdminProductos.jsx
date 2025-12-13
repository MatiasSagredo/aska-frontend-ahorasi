import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';
import productoApi from '../api/objects/producto.js';

const AdminProductos = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
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
            fetchProductos();
        }
    }, [user]);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const data = await productoApi.getAll();
            setProductos(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError('Error al cargar los productos');
            setProductos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productoId, nombreProducto) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar "${nombreProducto}"?`)) {
            return;
        }

        try {
            await productoApi.deleteProductoById(productoId);
            setProductos(productos.filter(p => p.idProducto !== productoId));
        } catch (err) {
            alert('Error al eliminar el producto');
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
            <Div className="max-w-7xl mx-auto px-4 py-16">
                {/* Header */}
                <Div className="mb-8 flex items-center justify-between">
                    <Div>
                        <Text variant="h1" className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Gestión de Productos
                        </Text>
                        <Text className="text-primary-foreground/70">
                            Administra el catálogo de productos
                        </Text>
                    </Div>
                    <Div className="flex gap-2">
                        <Button
                            onClick={() => navigate('/admin')}
                            className="bg-secondary/50 hover:bg-secondary/70 text-white"
                        >
                            Volver al Panel
                        </Button>
                        <Button
                            onClick={() => navigate('/admin/productos/crear')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Crear Producto
                        </Button>
                    </Div>
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
                        <Text className="text-primary-foreground/60">Cargando productos...</Text>
                    </Div>
                ) : productos.length === 0 ? (
                    <Div className="text-center py-12">
                        <Text className="text-primary-foreground/60 mb-4">No hay productos registrados</Text>
                        <Button
                            onClick={() => navigate('/admin/productos/crear')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Crear el primer producto
                        </Button>
                    </Div>
                ) : (
                    <Div className="rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                        <Div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-primary/20 bg-primary/10">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nombre</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Precio</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Marca</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto, index) => (
                                        <tr 
                                            key={producto.idProducto} 
                                            className={`border-b border-primary/10 transition-colors ${
                                                index % 2 === 0 ? 'bg-primary/5' : 'bg-transparent'
                                            } hover:bg-primary/15`}
                                        >
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {producto.idProducto}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm font-medium text-white">
                                                    {producto.nombreProducto}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {typeof producto.precio === 'number' 
                                                        ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(producto.precio)
                                                        : producto.precio
                                                    }
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {producto.idMarca?.nombreMarca || 'Sin marca'}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Div className="flex gap-3">
                                                    <Button
                                                        onClick={() => navigate(`/admin/productos/editar/${producto.idProducto}`)}
                                                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 whitespace-nowrap"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(producto.idProducto, producto.nombreProducto)}
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

export default AdminProductos;
