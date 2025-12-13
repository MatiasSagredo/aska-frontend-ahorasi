import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ParticleBackground from './components/templates/ParticleBackground.jsx';
import Header from './components/organisms/Header.jsx';
import Footer from './components/organisms/Footer.jsx';
import Productos from './pages/Productos.jsx';
import Producto from './pages/Producto.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Perfil from './pages/Perfil.jsx';
import EditarUsuario from './pages/EditarUsuario.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminUsuarios from './pages/AdminUsuarios.jsx';
import AdminProductos from './pages/AdminProductos.jsx';
import CrearEditarProducto from './pages/CrearEditarProducto.jsx';
import AdminOrdenes from './pages/AdminOrdenes.jsx';
import Div from './components/atoms/Div.jsx';
import Carrito from './pages/Carrito.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
    return (
        <Div className="relative min-h-screen overflow-hidden">
            <ParticleBackground />
            <Div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/productos/:id" element={<Producto />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/carrito" element={<Carrito />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/editar/:idUsuario" element={<EditarUsuario />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                        <Route path="/admin/productos" element={<AdminProductos />} />
                        <Route path="/admin/productos/crear" element={<CrearEditarProducto />} />
                        <Route path="/admin/productos/editar/:idProducto" element={<CrearEditarProducto />} />
                        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </Div>
        </Div>
    )
}

export default App
