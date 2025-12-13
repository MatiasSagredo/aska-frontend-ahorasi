import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import Image from '../components/atoms/Image.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';
import productoApi from '../api/objects/producto.js';
import imagenes from '../api/objects/imagenes.js';

const VerProducto = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { idProducto } = useParams();
    
    const [producto, setProducto] = useState(null);
    const [imagenesProducto, setImagenesProducto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        if (user?.idRol?.idRol !== 1) {
            navigate('/');
            return;
        }

        fetchProducto();
    }, [user, idProducto]);

    const fetchProducto = async () => {
        try {
            setLoading(true);
            const [productData, imagenData] = await Promise.all([
                productoApi.getById(idProducto),
                imagenes.getAll()
            ]);
            setProducto(productData);
            const productImages = Array.isArray(imagenData) 
                ? imagenData.filter(img => img?.idProducto?.idProducto === productData.idProducto)
                : [];
            setImagenesProducto(productImages);
            setError('');
        } catch (err) {
            setError('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return;
        }

        try {
            await productoApi.deleteProductoById(producto.idProducto);
            navigate('/admin/productos');
        } catch (err) {
            alert('Error al eliminar el producto');
        }
    };

    if (loading) {
        return (
            <Div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
                <Text className="text-primary-foreground/60">Cargando...</Text>
            </Div>
        );
    }

    if (!producto) {
        return (
            <Div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
                <Div className="text-center">
                    <Text className="text-primary-foreground/60 mb-4">Producto no encontrado</Text>
                    <Button onClick={() => navigate('/admin/productos')} className="bg-button hover:brightness-80 text-white">
                        Volver a productos
                    </Button>
                </Div>
            </Div>
        );
    }

    const formattedPrice = typeof producto?.precio === "number"
        ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)
        : producto?.precio;

    return (
        <Div className="min-h-screen bg-gradient-to-b from-background to-background/50">
            <Div className="max-w-4xl mx-auto px-4 py-16">
                <Div className="mb-8">
                    <Button
                        onClick={() => navigate('/admin/productos')}
                        className="bg-secondary/50 hover:bg-secondary/70 text-white mb-4"
                    >
                        ← Volver a Productos
                    </Button>
                </Div>

                {error && (
                    <Div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                        <Text className="text-red-400">{error}</Text>
                    </Div>
                )}

                <Div className="rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                    <Div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                        {/* Imagen */}
                        <Div className="flex items-center justify-center rounded-xl bg-primary-100 p-6">
                            <Image
                                src={imagenesProducto[0]?.urlImagen ?? "https://via.placeholder.com/400?text=Sin+imagen"}
                                alt={`Imagen del producto ${producto.nombreProducto}`}
                                className="h-80 w-full max-w-sm rounded-xl object-contain"
                            />
                        </Div>

                        {/* Detalles */}
                        <Div className="flex flex-col gap-6">
                            <Div>
                                <Text variant="h1" className="text-4xl font-bold text-white mb-2">
                                    {producto.nombreProducto}
                                </Text>
                                <Text className="text-primary-foreground/70">
                                    ID: {producto.idProducto}
                                </Text>
                            </Div>

                            <Div>
                                <Text className="text-primary-foreground/60 text-sm mb-2">Descripción</Text>
                                <Text className="text-white">
                                    {producto.descripcion || 'Sin descripción'}
                                </Text>
                            </Div>

                            <Div className="flex flex-col gap-3 rounded-lg bg-primary-100 p-4">
                                <Div>
                                    <Text className="text-primary-foreground/60 text-sm">Precio</Text>
                                    <Text className="text-2xl font-bold text-white">
                                        {formattedPrice}
                                    </Text>
                                </Div>
                                <Div>
                                    <Text className="text-primary-foreground/60 text-sm">Marca</Text>
                                    <Text className="text-white">
                                        {producto.idMarca?.nombreMarca || 'Sin marca'}
                                    </Text>
                                </Div>
                            </Div>

                            {/* Acciones - Solo para Admins */}
                            {user?.idRol?.idRol === 1 && (
                                <Div className="flex flex-col gap-3 pt-4 border-t border-primary/20">
                                    <Button
                                        onClick={() => navigate(`/admin/productos/editar/${producto.idProducto}`)}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white w-full"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700 text-white w-full"
                                    >
                                        Eliminar
                                    </Button>
                                </Div>
                            )}
                        </Div>
                    </Div>

                    {/* Imágenes adicionales */}
                    {imagenesProducto.length > 1 && (
                        <Div className="border-t border-primary/20 p-8">
                            <Text className="text-lg font-semibold text-white mb-4">
                                Imágenes
                            </Text>
                            <Div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {imagenesProducto.map((img, idx) => (
                                    <Div key={idx} className="rounded-lg bg-primary-100 p-2">
                                        <Image
                                            src={img.urlImagen}
                                            alt={`Imagen ${idx + 1}`}
                                            className="w-full h-32 object-contain rounded"
                                        />
                                    </Div>
                                ))}
                            </Div>
                        </Div>
                    )}
                </Div>
            </Div>
        </Div>
    );
};

export default VerProducto;
