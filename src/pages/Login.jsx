import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import ParticleBackground from '../components/templates/ParticleBackground';
import Div from '../components/atoms/Div';

const Login = () => {
    return (
        <Div className="relative flex items-center justify-center min-h-screen">
            <Div className="absolute inset-0 z-0">
                <ParticleBackground />
            </Div>

            <Div className="relative z-10 w-full px-4 flex justify-center">
                <LoginForm />
            </Div>
        </Div>
    );
};

export default Login;
