import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';
import ventaApi from '../api/objects/venta.js';
import Estado from '../api/objects/estado.js';

const AdminOrdenes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editingEstado, setEditingEstado] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (user?.idRol?.idRol !== 1) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user?.idRol?.idRol === 1) {
            fetchVentas();
        }
    }, [user]);

    const fetchVentas = async () => {
        try {
            setLoading(true);
            const data = await ventaApi.getAll();
            setVentas(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            setError('Error al cargar las ventas');
            setVentas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEditEstado = (ventaId, estadoActual) => {
        setEditingId(ventaId);
        setEditingEstado(estadoActual?.estado || '');
    };

    const handleSaveEstado = async (ventaId) => {
        try {
            const venta = ventas.find(v => v.idVenta === ventaId);
            const estadoId = venta.idEstado.idEstado;
            
            await Estado.patchEstadoById(estadoId, {
                estado: editingEstado
            });
            
            await fetchVentas();
            
            setEditingId(null);
            setEditingEstado(null);
        } catch (error) {
            alert('Error al actualizar el estado');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingEstado(null);
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
                            Gestión de Órdenes
                        </Text>
                        <Text className="text-primary-foreground/70">
                            Visualiza y administra todas las ventas
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
                        <Text className="text-primary-foreground/60">Cargando órdenes...</Text>
                    </Div>
                ) : ventas.length === 0 ? (
                    <Div className="text-center py-12">
                        <Text className="text-primary-foreground/60">No hay órdenes registradas</Text>
                    </Div>
                ) : (
                    <Div className="rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                        <Div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-primary/20 bg-primary/10">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Cliente</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Estado</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Método Pago</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Método Envío</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventas.map((venta, index) => (
                                        <tr 
                                            key={venta.idVenta} 
                                            className={`border-b border-primary/10 transition-colors ${
                                                index % 2 === 0 ? 'bg-primary/5' : 'bg-transparent'
                                            } hover:bg-primary/15`}
                                        >
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {venta.idVenta}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm font-medium text-white">
                                                    {venta.idUsuario?.nombreUsuario || 'N/A'}
                                                </Text>
                                                <Text className="text-xs text-primary-foreground/60">
                                                    {venta.idUsuario?.emailUsuario}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    ${venta.total}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === venta.idVenta ? (
                                                    <Div className="flex gap-2">
                                                        <select
                                                            value={editingEstado}
                                                            onChange={(e) => setEditingEstado(e.target.value)}
                                                            className="flex-1 rounded bg-secondary/30 px-2 py-1 text-white border border-primary/20 text-sm"
                                                        >
                                                            <option value="pendiente">Pendiente</option>
                                                            <option value="en camino">En camino</option>
                                                            <option value="entregado">Entregado</option>
                                                        </select>
                                                    </Div>
                                                ) : (
                                                    <Text className={`text-sm font-medium inline-block px-3 py-1 rounded-full ${
                                                        venta.idEstado?.estado === 'en camino'
                                                            ? 'bg-blue-600/30 text-blue-400'
                                                            : venta.idEstado?.estado === 'entregado'
                                                            ? 'bg-green-600/30 text-green-400'
                                                            : 'bg-yellow-600/30 text-yellow-400'
                                                    }`}>
                                                        {venta.idEstado?.estado || 'Sin estado'}
                                                    </Text>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {venta.idMetodoPago?.metodoPago || 'N/A'}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Text className="text-sm text-primary-foreground/80">
                                                    {venta.idMetodoEnvio?.metodoEnvio || 'N/A'}
                                                </Text>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Div className="flex gap-2">
                                                    {editingId === venta.idVenta ? (
                                                        <>
                                                            <Button
                                                                onClick={() => handleSaveEstado(venta.idVenta)}
                                                                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 whitespace-nowrap"
                                                            >
                                                                Guardar
                                                            </Button>
                                                            <Button
                                                                onClick={handleCancel}
                                                                className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-1 whitespace-nowrap"
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button
                                                            onClick={() => handleEditEstado(venta.idVenta, venta.idEstado)}
                                                            className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 whitespace-nowrap"
                                                        >
                                                            Editar Estado
                                                        </Button>
                                                    )}
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

export default AdminOrdenes;
