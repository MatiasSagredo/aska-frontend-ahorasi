import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Button from '../atoms/Button.jsx';
import Icon from '../atoms/Icon.jsx';
import { useAuth } from '../templates/AuthProvider.jsx';
import { useCart } from '../templates/CartProvider.jsx';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout, user } = useAuth();
    const { items } = useCart();
    const totalItems = useMemo(
        () => items.reduce((total, item) => total + (item.quantity ?? 0), 0),
        [items]
    );
    const hasItems = totalItems > 0;
    const cartBadgeClass = hasItems
        ? 'bg-button text-white'
        : 'bg-secondary/60 text-primary-foreground/70';
    const displayName = user?.nombreUsuario ?? user?.name ?? user?.emailUsuario ?? '';
    const links = [
        { href: '/', label: 'Inicio' },
        { href: '/productos', label: 'Productos' },
        { href: '/contacto', label: 'Contacto' },
        { href: '/carrito', label: 'Carrito' },
    ];

    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const handleMenuLinkClick = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const goToAuth = (view = 'login') => {
        const suffix = view === 'register' ? '?view=register' : '';
        setIsMenuOpen(false);
        navigate(`/auth${suffix}`);
    };

    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="sticky top-0 z-100 border-b border-primary/40 bg-linear-to-b from-primary/95 to-secondary/80 text-primary-foreground shadow-lg backdrop-blur">
            <Div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                <Div className="flex items-center gap-3">
                    <Div className="bg-red-500 inline-flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-xl font-bold tracking-wider shadow-md">
                        ASKA
                    </Div>
                    <Text variant="span" className="hidden text-sm opacity-70 sm:block">
                        Equipamiento deportivo premium
                    </Text>
                    <Text variant="span" className="text-xs font-medium text-primary-foreground/70">
                        Compra al carrito
                    </Text>
                </Div>

                <Div role="navigation" aria-label="Navegación principal" className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {links.map((link) => (
                        <Link key={link.href} to={link.href} className="flex items-center gap-2 transition-colors hover:text-white">
                            {link.label}
                            {link.href === '/carrito' && (
                                <span className={`inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${cartBadgeClass}`}>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    ))}
                </Div>

                <Div className="items-center gap-2 hidden md:flex">
                    {!user && (
                        <>
                            <Link to="/login" className="rounded-2xl bg-button px-4 py-2 text-sm font-medium leading-tight text-white transition-all hover:brightness-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary/10">
                                Iniciar Sesion
                            </Link>
                            <Link to="/register" className="rounded-2xl bg-button-error px-4 py-2 text-sm font-medium leading-tight text-white transition-all hover:brightness-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary/10">
                                Regístrate
                            </Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Text className="text-sm text-primary-foreground/80">
                                Hola{displayName ? `, ${displayName}` : ''}
                            </Text>
                            <Button onClick={() => { logout() }}>Cerrar Sesion</Button>
                        </>
                    )}
                </Div>

                <Div className="flex items-center gap-3 md:hidden">
                    <Button
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav"
                        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        className={`group rounded-full border border-primary/30 bg-secondary/90 px-3 py-2 transition-all ${isMenuOpen ? 'scale-105 shadow-xl backdrop-blur-sm' : 'shadow-md hover:scale-105 hover:bg-secondary'}`}
                    >
                        <Div className="flex items-center gap-2">
                            <Text variant="span" className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">
                                Menú
                            </Text>
                            <Icon prefix="fa-solid" name="fa-ellipsis" className="text-lg text-primary-foreground transition-transform group-hover:rotate-90" />
                        </Div>
                    </Button>
                </Div>

                {isMenuOpen && (
                    <>
                        <Div
                            className="fixed inset-0 z-120 bg-linear-to-bl from-black/60 via-black/50 to-primary/30 backdrop-blur-sm md:hidden"
                            onClick={handleMenuLinkClick}
                            aria-hidden="true"
                        />
                        <Div
                            id="mobile-nav"
                            className="absolute right-4 top-full z-130 mt-4 w-[calc(100vw-2rem)] max-w-xs origin-top-right rounded-3xl border border-primary/20 bg-primary/95 p-6 text-sm shadow-2xl ring-1 ring-primary/20 transition-all md:hidden"
                        >
                            <Text variant="p" className="mb-3 text-xs uppercase tracking-[0.35em] text-primary-foreground/60">
                                Navegación
                            </Text>
                            <Div className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        onClick={handleMenuLinkClick}
                                        className="flex items-center justify-between rounded-2xl bg-secondary/30 px-4 py-3 font-medium leading-tight text-primary-foreground transition-all hover:bg-secondary/50 hover:text-white focus:outline-none focus-visible:bg-secondary/60"
                                    >
                                        {link.label}
                                        {link.href === '/carrito' && (
                                            <span className={`ml-3 inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${cartBadgeClass}`}>
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </Div>
                            {!user ? (
                                <Div className="mt-6 flex flex-col gap-3">
                                    <Button type="button" onClick={() => {navigate('/login'); handleMenuLinkClick();}} className="bg-button text-sm">
                                        Iniciar sesión
                                    </Button>
                                    <Button type="button" onClick={() => {navigate('/register'); handleMenuLinkClick();}} className="bg-button-error text-sm">
                                        Registrarme
                                    </Button>
                                </Div>
                            ) : (
                                <Div className="mt-6 flex flex-col gap-3 rounded-2xl bg-secondary/40 p-4">
                                    <Text className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
                                        Sesión activa
                                    </Text>
                                    <Text className="text-sm text-white">
                                        Hola{displayName ? `, ${displayName}` : ''}
                                    </Text>
                                    <Button type="button" onClick={handleLogout} className="bg-button-warning text-sm">
                                        Cerrar sesión
                                    </Button>
                                </Div>
                            )}
                        </Div>
                    </>
                )}
            </Div>
        </header>
    );
}

export default Header;
