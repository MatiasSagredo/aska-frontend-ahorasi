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
import Div from './components/atoms/Div.jsx';
import Carrito from './pages/Carrito.jsx';

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
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/carrito" element={<Carrito />} />
                    </Routes>
                </main>
                <Footer />
            </Div>
        </Div>
    )
}

export default App
