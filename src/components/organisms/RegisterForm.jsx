import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../templates/AuthProvider';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Div from '../atoms/Div';

const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombreUsuario: '',
        emailUsuario: '',
        contrasenaUsuario: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const payload = {
            nombreUsuario: formData.nombreUsuario,
            emailUsuario: formData.emailUsuario,
            contrasenaUsuario: formData.password,
            idRol: { idRol: 2 }
        };

        const result = await register(payload);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-6 p-8 bg-secondary/95 backdrop-blur-md border border-primary/30 rounded-3xl shadow-2xl">
            <Div className="text-center">
                <Text variant="h2" className="text-3xl font-heading font-bold tracking-wider text-primary-foreground">
                    Crear Cuenta
                </Text>
                <Text variant="p" className="mt-2 text-sm text-primary-foreground/70">
                    Únete a la comunidad ASKA
                </Text>
            </Div>

            {error && (
                <Div className="p-3 text-sm text-red-200 bg-red-900/30 rounded-lg border border-red-500/30">
                    {error}
                </Div>
            )}

            <Div className="space-y-4">
                <Div>
                    <label className="block mb-1.5 text-sm font-medium text-primary-foreground/90">
                        Nombre de Usuario
                    </label>
                    <Input
                        type="text"
                        name="nombreUsuario"
                        placeholder="Tu nombre"
                        value={formData.nombreUsuario}
                        onChange={handleChange}
                        required
                        className="bg-primary/50 border-primary/30 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-red-500/50 focus:border-red-500/50"
                    />
                </Div>

                <Div>
                    <label className="block mb-1.5 text-sm font-medium text-primary-foreground/90">
                        Correo Electrónico
                    </label>
                    <Input
                        type="email"
                        name="emailUsuario"
                        placeholder="ejemplo@correo.com"
                        value={formData.emailUsuario}
                        onChange={handleChange}
                        required
                        className="bg-primary/50 border-primary/30 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-red-500/50 focus:border-red-500/50"
                    />
                </Div>

                <Div>
                    <label className="block mb-1.5 text-sm font-medium text-primary-foreground/90">
                        Contraseña
                    </label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
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
                {loading ? 'Registrando...' : 'REGISTRARSE'}
            </Button>
            <Div className="flex flex-row text-gray-400">
                <Text className="mr-2">ya tienes cuenta?</Text><Link className='text-red-400' to="/login">Inicia Sesion</Link>
            </Div>
        </form>
    );
};

export default RegisterForm;
