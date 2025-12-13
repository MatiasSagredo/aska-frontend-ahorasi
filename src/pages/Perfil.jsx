import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import Div from '../components/atoms/Div';
import Text from '../components/atoms/Text';
import { useAuth } from '../components/templates/AuthProvider';

const Perfil = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return (
            <Div className="flex items-center justify-center min-h-screen">
                <Text className="text-primary-foreground/60">Redirigiendo a login...</Text>
            </Div>
        );
    }

    return <ProfileTemplate user={user} />;
};

export default Perfil;
