import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ParticleBackground from './components/templates/ParticleBackground.jsx';
import Header from './components/organisms/Header.jsx';
import Productos from './pages/Productos.jsx';

function App() {
  return (
    <div>
      {/* <ParticleBackground /> */}
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
