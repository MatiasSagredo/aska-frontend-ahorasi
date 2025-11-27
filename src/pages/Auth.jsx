import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Input from '../components/atoms/Input.jsx';
import Button from '../components/atoms/Button.jsx';
import { useAuth } from '../components/templates/AuthProvider.jsx';

const LOGIN_FIELDS = [
  { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
  { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••' },
];

const REGISTER_FIELDS = [
  { name: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
  { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
  { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Crea una contraseña segura' },
  { name: 'belt', label: 'Cinturón o nivel', type: 'text', placeholder: 'Ej. Azul, Rojo, Negro' },
];

const createEmptyForm = () => ({ name: '', email: '', password: '', belt: '' });

const getInitialValues = () => createEmptyForm();

const normalizeField = (value) => (typeof value === 'string' ? value.trim() : '');

function Auth() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('view') === 'register' ? 'register' : 'login';
  const [formData, setFormData] = useState(() => getInitialValues());
  const [message, setMessage] = useState(null);
  const redirectTimerRef = useRef(null);
  const { user, login, register: registerUser, logout, superuserEmail } = useAuth();

  useEffect(() => {
    setFormData(getInitialValues());
    setMessage(null);
  }, [mode]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const fields = useMemo(
    () => (mode === 'register' ? REGISTER_FIELDS : LOGIN_FIELDS),
    [mode],
  );

  const isSubmitDisabled = useMemo(() => {
    const email = normalizeField(formData.email);
    const password = normalizeField(formData.password);

    if (mode === 'login') {
      return !(email && password);
    }

    const nameField = normalizeField(formData.name);

    return !(nameField && email && password);
  }, [formData, mode]);

  const handleModeChange = (nextMode) => {
    if (mode === nextMode) return;
    if (nextMode === 'register') {
      setSearchParams({ view: 'register' }, { replace: true });
      return;
    }
    setSearchParams({}, { replace: true });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message) {
      setMessage(null);
    }
  };

  const scheduleRedirect = (path) => {
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
    }
    redirectTimerRef.current = setTimeout(() => navigate(path), 800);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(null);

    if (mode === 'login') {
      const result = login({ email: formData.email, password: formData.password });

      if (!result.success) {
        setMessage({ type: 'error', text: result.message });
        return;
      }

      setMessage({ type: 'success', text: `Bienvenido de nuevo, ${result.user.name}. Redirigiendo...` });
      scheduleRedirect('/productos');
      return;
    }

    if (normalizeField(formData.password).length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }

    const result = registerUser({
      name: normalizeField(formData.name),
      email: normalizeField(formData.email),
      password: formData.password,
      belt: normalizeField(formData.belt) || 'blanco',
    });

    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: `¡Registro completado, ${result.user.name}! Redirigiendo a los productos...` });
    scheduleRedirect('/productos');
  };

  if (user) {
    return (
      <Div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <Div className="w-full max-w-xl rounded-3xl border border-white/10 bg-primary/70 p-10 text-primary-foreground shadow-2xl backdrop-blur">
          <Text variant="h2" className="mb-4 text-3xl font-semibold">
            Ya tienes una sesión activa
          </Text>
          <Text className="mb-6 text-base text-primary-foreground/80">
            Hola {user.name}, puedes continuar explorando la tienda o cerrar sesión para ingresar con otra cuenta.
          </Text>
          <Div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => navigate('/productos')} className="bg-button">
              Ir a productos
            </Button>
            <Button type="button" onClick={logout} className="bg-button-warning">
              Cerrar sesión
            </Button>
            <Button
              type="button"
              onClick={() => {
                logout();
                navigate('/auth?view=register');
              }}
              className="bg-button-error"
            >
              Crear nueva cuenta
            </Button>
          </Div>
        </Div>
      </Div>
    );
  }

  return (
    <Div className="relative flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-[2.5rem] border border-white/10 bg-linear-to-br from-primary/90 via-secondary/70 to-primary/60 p-12 shadow-2xl backdrop-blur-lg md:flex-row md:p-16">
        <Div className="flex flex-1 flex-col justify-center gap-5">
          <Text variant="span" className="text-xs uppercase tracking-[0.4em] text-primary-foreground/70">
            Comunidad Aska
          </Text>
          <Text variant="h1" className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Gestiona tu cuenta para vivir la experiencia completa
          </Text>
          <Text className="max-w-lg text-base leading-relaxed text-primary-foreground/80">
            Guarda productos en el carrito, recibe novedades y obtén acceso prioritario a lanzamientos. También tenemos una cuenta maestra preconfigurada para emergencias: {superuserEmail}.
          </Text>
        </Div>

        <Div className="flex flex-1 flex-col">
          <Div className="mb-6 inline-flex w-full rounded-full border border-white/10 bg-black/20 p-1 text-sm">
            <Button
              type="button"
              onClick={() => handleModeChange('login')}
              className={`flex-1 rounded-full bg-transparent text-primary-foreground/70 ${
                mode === 'login' ? 'bg-button text-white shadow-lg' : ''
              }`}
            >
              Iniciar sesión
            </Button>
            <Button
              type="button"
              onClick={() => handleModeChange('register')}
              className={`flex-1 rounded-full bg-transparent text-primary-foreground/70 ${
                mode === 'register' ? 'bg-button-error text-white shadow-lg' : ''
              }`}
            >
              Crear cuenta
            </Button>
          </Div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-secondary/80 p-8 shadow-xl">
            <Div className="space-y-2">
              <Text variant="h2" className="text-2xl font-semibold text-white">
                {mode === 'login' ? 'Bienvenido de nuevo' : 'Únete a Aska Gear'}
              </Text>
              <Text className="text-sm text-primary-foreground/70">
                {mode === 'login'
                  ? 'Ingresa tus credenciales para continuar con tu experiencia Aska.'
                  : 'Completa tus datos para crear una cuenta y personalizar tu entrenamiento.'}
              </Text>
            </Div>

            {message && (
              <Div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  message.type === 'error'
                    ? 'border-red-400/60 bg-red-500/10 text-red-100'
                    : 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100'
                }`}
              >
                <Text className="font-medium">{message.text}</Text>
              </Div>
            )}

            <Div className="flex flex-col gap-4">
              {fields.map((field) => (
                <Div key={field.name} className="flex flex-col gap-2">
                  <Text
                    variant="label"
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70"
                  >
                    {field.label}
                  </Text>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] ?? ''}
                    onChange={handleChange}
                    required={field.name !== 'belt'}
                    className="bg-white/90"
                  />
                </Div>
              ))}
            </Div>

            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className={`${
                mode === 'register' ? 'bg-button-error' : 'bg-button'
              } px-6 py-3 text-base font-semibold text-white ${
                isSubmitDisabled ? 'cursor-not-allowed opacity-60' : 'hover:brightness-110'
              }`}
            >
              {mode === 'login' ? 'Ingresar' : 'Registrarme'}
            </Button>
          </form>
        </Div>
      </Div>
    </Div>
  );
}

export default Auth;
