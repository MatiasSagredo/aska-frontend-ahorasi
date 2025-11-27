import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../templates/AuthProvider';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Div from '../atoms/Div';

const LoginForm = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-6 p-4 bg-secondary/95 backdrop-blur-md border border-primary/30 rounded-3xl shadow-2xl">
            <Div className="text-center">
                <Text variant="h2" className="text-3xl font-heading font-bold tracking-wider text-primary-foreground">
                    Bienvenido
                </Text>
                <Text variant="p" className="mt-2 text-sm text-primary-foreground/70">
                    Ingresa tus credenciales para acceder
                </Text>
            </Div>

            {error && (
                <Div className="p-3 text-sm text-red-200 bg-red-900/30 rounded-lg border border-red-500/30">
                    {error}
                </Div>
            )}

            <Div className="space-y-4">
                <Div>
                    <Text variant='label' className="block mb-1.5 text-sm font-medium text-primary-foreground/90">
                        Correo Electrónico
                    </Text>
                    <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-primary/50 border-primary/30 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-red-500/50 focus:border-red-500/50"
                    />
                </Div>

                <Div>
                    <Text variant='label' className="block mb-1.5 text-sm font-medium text-primary-foreground/90">
                        Contraseña
                    </Text>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-primary/50 border-primary/30 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-red-500/50 focus:border-red-500/50"
                    />
                </Div>
            </Div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:ring-red-500 shadow-lg shadow-red-900/20 font-heading tracking-wide text-lg"
            >
                {loading ? 'Ingresando...' : 'INICIAR SESIÓN'}
            </Button>
            <Div className="flex flex-row text-gray-400">
                <Text className="mr-2">no tienes cuenta?</Text><Link className='text-red-400' to="/register">Registrate</Link>
            </Div>
        </form>
    );
};

export default LoginForm;
