import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';
import productoApi from '../api/objects/producto.js';
import imagenesApi from '../api/objects/imagenes.js';
import marcaApi from '../api/objects/marca.js';

const CrearEditarProducto = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { idProducto } = useParams();
    
    const isEditing = !!idProducto;
    const [producto, setProducto] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        nombreProducto: '',
        descripcion: '',
        precio: '',
        idMarca: '',
        urlImagenes: [''],
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        if (user?.idRol?.idRol !== 1) {
            navigate('/');
            return;
        }

        fetchMarcas();
        if (isEditing) {
            fetchProducto();
        } else {
            setLoading(false);
        }
    }, [user, idProducto]);

    const fetchMarcas = async () => {
        try {
            const data = await marcaApi.getAll();
            setMarcas(Array.isArray(data) ? data : []);
        } catch (err) {
        }
    };

    const fetchProducto = async () => {
        try {
            setLoading(true);
            const data = await productoApi.getById(idProducto);
            setProducto(data);
            
            const imagenData = await imagenesApi.getAll();
            const productImages = Array.isArray(imagenData) 
                ? imagenData.filter(img => img?.idProducto?.idProducto === data.idProducto)
                : [];
            
            setFormData({
                nombreProducto: data.nombreProducto || '',
                descripcion: data.descripcion || '',
                precio: data.precio || '',
                idMarca: data.idMarca?.idMarca || '',
                urlImagenes: productImages.length > 0 ? productImages.map(img => img.urlImagen) : [''],
            });
            setError('');
        } catch (err) {
            setError('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUrlChange = (index, value) => {
        const newUrls = [...formData.urlImagenes];
        newUrls[index] = value;
        setFormData(prev => ({
            ...prev,
            urlImagenes: newUrls
        }));
    };

    const addImageUrl = () => {
        setFormData(prev => ({
            ...prev,
            urlImagenes: [...prev.urlImagenes, '']
        }));
    };

    const removeImageUrl = (index) => {
        setFormData(prev => ({
            ...prev,
            urlImagenes: prev.urlImagenes.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const submitData = {
                nombreProducto: formData.nombreProducto,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                idMarca: formData.idMarca ? { idMarca: parseInt(formData.idMarca) } : null,
            };

            let result;
            if (isEditing) {
                result = await productoApi.patchProductoById(producto.idProducto, submitData);
                setSuccess('Producto actualizado exitosamente');
                
                const imagenData = await imagenesApi.getAll();
                const oldImages = Array.isArray(imagenData) 
                    ? imagenData.filter(img => img?.idProducto?.idProducto === producto.idProducto)
                    : [];
                
                for (const oldImg of oldImages) {
                    try {
                        await imagenesApi.deleteImagenesById(oldImg.idImagen);
                    } catch (delErr) {
                    }
                }
            } else {
                result = await productoApi.createProducto(submitData);
                setSuccess('Producto creado exitosamente');
            }

            const imagenesToSave = formData.urlImagenes.filter(url => url.trim() !== '');
            if (imagenesToSave.length > 0) {
                for (const urlImagen of imagenesToSave) {
                    try {
                        await imagenesApi.createImagenes({
                            urlImagen: urlImagen,
                            idProducto: { idProducto: result.idProducto }
                        });
                    } catch (imgErr) {
                        alert('Error al guardar alguna imagen: ' + imgErr.message);
                    }
                }
                setSuccess('Producto e imágenes guardados exitosamente');
            }

            setProducto(result);
            
            setTimeout(() => {
                navigate('/admin/productos');
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al guardar el producto';
            setError(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
                <Text className="text-primary-foreground/60">Cargando...</Text>
            </Div>
        );
    }

    if (user?.idRol?.idRol !== 1) {
        return (
            <Div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
                <Text className="text-primary-foreground/60">Acceso denegado</Text>
            </Div>
        );
    }

    return (
        <Div className="min-h-screen bg-gradient-to-b from-background to-background/50">
            <Div className="max-w-2xl mx-auto px-4 py-16">
                <Div className="mb-8">
                    <Text variant="h1" className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {isEditing ? `Editar Producto: ${producto?.nombreProducto}` : 'Crear Nuevo Producto'}
                    </Text>
                    <Text className="text-primary-foreground/70">
                        {isEditing ? 'Actualiza los datos del producto' : 'Añade un nuevo producto al catálogo'}
                    </Text>
                </Div>

                <Div className="rounded-2xl border border-primary/30 bg-secondary/50 backdrop-blur-sm p-8">
                    {error && (
                        <Div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                            <Text className="text-red-400">{error}</Text>
                        </Div>
                    )}

                    {success && (
                        <Div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                            <Text className="text-green-400">{success}</Text>
                        </Div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Div>
                            <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                Nombre del Producto *
                            </Text>
                            <input
                                type="text"
                                name="nombreProducto"
                                value={formData.nombreProducto}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                placeholder="Nombre del producto"
                                required
                            />
                        </Div>

                        <Div>
                            <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                Descripción
                            </Text>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Descripción del producto"
                                rows="4"
                            />
                        </Div>

                        <Div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Div>
                                <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                    Precio (CLP) *
                                </Text>
                                <input
                                    type="number"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="0"
                                    required
                                    step="0.01"
                                    min="0"
                                />
                            </Div>

                            <Div>
                                <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                    Marca
                                </Text>
                                <select
                                    name="idMarca"
                                    value={formData.idMarca}
                                    onChange={handleChange}
                                    className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                >
                                    <option value="">Selecciona una marca</option>
                                    {marcas.map(marca => (
                                        <option key={marca.idMarca} value={marca.idMarca}>
                                            {marca.nombreMarca}
                                        </option>
                                    ))}
                                </select>
                            </Div>
                        </Div>

                        {/* URLs de Imágenes */}
                        <Div>
                            <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                URLs de Imágenes
                            </Text>
                            <Div className="space-y-3">
                                {formData.urlImagenes.map((url, index) => (
                                    <Div key={index} className="flex gap-2">
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                            className="flex-1 rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                        />
                                        {formData.urlImagenes.length > 1 && (
                                            <Button
                                                type="button"
                                                onClick={() => removeImageUrl(index)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 whitespace-nowrap"
                                            >
                                                Eliminar
                                            </Button>
                                        )}
                                    </Div>
                                ))}
                            </Div>
                            <Button
                                type="button"
                                onClick={addImageUrl}
                                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white w-full"
                            >
                                + Añadir otra imagen
                            </Button>
                        </Div>

                        {isEditing && producto && (
                            <Div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <Text className="text-sm text-primary-foreground/80">
                                    <span className="font-semibold">ID:</span> {producto.idProducto}
                                </Text>
                            </Div>
                        )}

                        <Div className="flex gap-4 justify-end pt-4 border-t border-primary/20">
                            <Button
                                type="button"
                                onClick={() => navigate('/admin/productos')}
                                className="bg-secondary/40 hover:bg-secondary/60 text-primary-foreground"
                                disabled={saving}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-button hover:brightness-80 text-white"
                                disabled={saving}
                            >
                                {saving ? (isEditing ? 'Actualizando...' : 'Creando...') : (isEditing ? 'Actualizar' : 'Crear')}
                            </Button>
                        </Div>
                    </form>
                </Div>
            </Div>
        </Div>
    );
};

export default CrearEditarProducto;
