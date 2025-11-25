import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ParticleBackground from './components/templates/ParticleBackground.jsx';
import Header from './components/organisms/Header.jsx';
import Footer from './components/organisms/Footer.jsx';
import Productos from './pages/Productos.jsx';
import Contacto from './pages/Contacto.jsx';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
