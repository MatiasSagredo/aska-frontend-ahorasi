import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import ParticleBackground from '../components/templates/ParticleBackground';
import Div from '../components/atoms/Div';
import Text from '../components/atoms/Text';

const Login = () => {
    return (
        <Div className="relative flex flex-row items-center justify-center min-h-screen px-4">
            <Div className="absolute inset-0 z-0">
                <ParticleBackground />
            </Div>

            <Div className="hidden md:flex md:flex-col md:justify-center md:gap-5 md:w-1/2 md:px-8">
                <Text variant="span" className="text-xs uppercase tracking-[0.4em] text-primary-foreground/70">
                    Comunidad Aska
                </Text>
                <Text variant="h1" className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                    Gestiona tu cuenta para vivir la experiencia completa
                </Text>
                <Text className="max-w-lg text-base leading-relaxed text-primary-foreground/80">
                    Guarda productos en el carrito, recibe novedades y obtén acceso prioritario a lanzamientos.
                </Text>
            </Div>

            <Div className="relative z-10 w-full md:w-1/2 md:flex md:items-center md:justify-center">
                <LoginForm />
            </Div>
        </Div>
    );
};

export default Login;
