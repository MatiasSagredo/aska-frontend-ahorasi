import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Div from '../atoms/Div';
import Button from '../atoms/Button';
import ProfileHeader from '../molecules/ProfileHeader';
import ProfileContent from '../organisms/ProfileContent';
import { useAuth } from './AuthProvider';
import usuarioApi from '../../api/objects/usuario';

function ProfileTemplate({ user: initialUser = {} }) {
    const [user, setUser] = useState(initialUser);
    const [loadingLogout, setLoadingLogout] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoadingLogout(true);
        logout();
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            return;
        }

        setLoadingDelete(true);
        try {
            await usuarioApi.deleteUsuarioById(user.idUsuario);
            logout();
            navigate('/');
        } catch (error) {
            setLoadingDelete(false);
        }
    };

    return (
        <Div className="relative min-h-screen bg-gradient-to-b from-background to-background/50">
            <Div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
                {/* Header */}
                <ProfileHeader
                    user={user}
                    onEditClick={() => navigate(`/editar/${user.idUsuario}`)}
                />

                {/* Contenido Principal */}
                <Div className="mt-8">
                    <ProfileContent user={user} />
                </Div>

                {/* Botones de Acción */}
                <Div className="mt-12 flex gap-4 justify-center md:justify-start">
                    <Button 
                        onClick={handleLogout}
                        disabled={loadingLogout}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                    >
                        {loadingLogout ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                    </Button>
                    <Button 
                        onClick={handleDeleteAccount}
                        disabled={loadingDelete}
                        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                    >
                        {loadingDelete ? 'Eliminando...' : 'Eliminar Cuenta'}
                    </Button>
                </Div>
            </Div>
        </Div>
    );
}

export default ProfileTemplate;
