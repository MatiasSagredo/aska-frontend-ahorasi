import React, { useState } from 'react';
import Div from '../atoms/Div';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import usuarioApi from '../../api/objects/usuario';

function ProfileEditForm({ user, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombreUsuario: user?.nombreUsuario || '',
        emailUsuario: user?.emailUsuario || '',
        contrasenaUsuario: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

            const updatedUser = await usuarioApi.patchUsuarioById(user.idUsuario, updateData);
            localStorage.setItem('usuario', JSON.stringify(updatedUser));
            setSuccess('Perfil actualizado exitosamente');
            onSave(updatedUser);
            setTimeout(() => {
                onCancel();
            }, 1000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar el perfil';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Div className="w-full max-w-2xl mx-4 rounded-2xl border border-primary/20 bg-primary/95 p-8 max-h-[90vh] overflow-y-auto">
                <Text className="mb-6 text-2xl font-bold text-white">
                    Editar Perfil
                </Text>

                {error && (
                    <Div className="mb-4 rounded-lg bg-red-500/20 p-3 border border-red-500/30">
                        <Text className="text-sm text-red-400">{error}</Text>
                    </Div>
                )}

                {success && (
                    <Div className="mb-4 rounded-lg bg-green-500/20 p-3 border border-green-500/30">
                        <Text className="text-sm text-green-400">{success}</Text>
                    </Div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Div className="grid grid-cols-1 gap-4">
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
                    </Div>

                    <Div className="flex gap-4 justify-end pt-4">
                        <Button
                            type="button"
                            onClick={onCancel}
                            className="bg-secondary/40 hover:bg-secondary/60 text-primary-foreground"
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-button hover:brightness-80 text-white"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </Div>
                </form>
            </Div>
        </Div>
    );
}

export default ProfileEditForm;
