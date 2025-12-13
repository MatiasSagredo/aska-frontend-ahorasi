import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';
import usuarioApi from '../api/objects/usuario.js';

const EditarUsuario = () => {
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const { idUsuario } = useParams();
    
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        nombreUsuario: '',
        emailUsuario: '',
        contrasenaUsuario: '',
    });

    const isAdmin = currentUser?.idRol?.idRol === 1;
    const isOwnProfile = currentUser?.idUsuario === parseInt(idUsuario);
    const canEdit = isAdmin || isOwnProfile;

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        
        if (!canEdit) {
            navigate('/');
            return;
        }

        fetchUsuario();
    }, [currentUser, idUsuario]);

    const fetchUsuario = async () => {
        try {
            setLoading(true);
            const data = await usuarioApi.getById(idUsuario);
            setUsuario(data);
            setFormData({
                nombreUsuario: data.nombreUsuario || '',
                emailUsuario: data.emailUsuario || '',
                contrasenaUsuario: '',
            });
            setError('');
        } catch (err) {
            setError('Error al cargar los datos del usuario');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const updateData = {
                nombreUsuario: formData.nombreUsuario,
                emailUsuario: formData.emailUsuario,
            };

            if (formData.contrasenaUsuario.trim()) {
                updateData.contrasenaUsuario = formData.contrasenaUsuario;
            }

            Object.keys(updateData).forEach(key => {
                if (updateData[key] === '') {
                    delete updateData[key];
                }
            });

            const updatedUser = await usuarioApi.patchUsuarioById(usuario.idUsuario, updateData);
            
            if (isOwnProfile) {
                localStorage.setItem('usuario', JSON.stringify(updatedUser));
            }
            
            setSuccess('Usuario actualizado exitosamente');
            setUsuario(updatedUser);
            
            setTimeout(() => {
                if (isOwnProfile) {
                    navigate('/perfil');
                } else {
                    navigate('/admin/usuarios');
                }
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar el usuario';
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

    if (!canEdit) {
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
                        {isOwnProfile ? 'Editar Mi Perfil' : `Editar Usuario: ${usuario?.nombreUsuario}`}
                    </Text>
                    <Text className="text-primary-foreground/70">
                        {isOwnProfile ? 'Actualiza tu información personal' : 'Administra la información de este usuario'}
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
                                Nombre de Usuario
                            </Text>
                            <input
                                type="text"
                                name="nombreUsuario"
                                value={formData.nombreUsuario}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                placeholder="Nombre de usuario"
                                required
                            />
                        </Div>

                        <Div>
                            <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                Email
                            </Text>
                            <input
                                type="email"
                                name="emailUsuario"
                                value={formData.emailUsuario}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                placeholder="Email"
                                required
                            />
                        </Div>

                        <Div>
                            <Text className="mb-2 text-sm font-medium text-primary-foreground/80">
                                Contraseña (opcional - dejar vacío si no quieres cambiarla)
                            </Text>
                            <input
                                type="password"
                                name="contrasenaUsuario"
                                value={formData.contrasenaUsuario}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-secondary/30 px-4 py-2 text-white border border-primary/20 focus:outline-none focus:border-primary transition-colors"
                                placeholder="Nueva contraseña"
                            />
                        </Div>

                        {!isOwnProfile && usuario && (
                            <Div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <Text className="text-sm text-primary-foreground/80 mb-2">
                                    <span className="font-semibold">ID:</span> {usuario.idUsuario}
                                </Text>
                                <Text className="text-sm text-primary-foreground/80">
                                    <span className="font-semibold">Rol:</span> {usuario.idRol?.nombreRol || 'Sin rol'}
                                </Text>
                            </Div>
                        )}

                        <Div className="flex gap-4 justify-end pt-4 border-t border-primary/20">
                            <Button
                                type="button"
                                onClick={() => isOwnProfile ? navigate('/perfil') : navigate('/admin/usuarios')}
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
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </Div>
                    </form>
                </Div>
            </Div>
        </Div>
    );
};

export default EditarUsuario;
