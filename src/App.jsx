import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ParticleBackground from './components/templates/ParticleBackground.jsx';

function App() {
  return (
    <div>
     {/* <ParticleBackground /> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
