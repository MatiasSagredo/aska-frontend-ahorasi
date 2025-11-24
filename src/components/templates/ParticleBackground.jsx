import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setReady(true)
    })
  }, [])

  const options = useMemo(
    () => ({
      background: { color: 'transparent' },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: ['#d7263d', '#ff4d62', '#ffffff'] },
        shape: { type: ['circle', 'square'] },
        opacity: {
          value: { min: 0.2, max: 0.55 },
          animation: { enable: true, speed: 0.5, minimumValue: 0.2 },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: { enable: true, speed: 4, minimumValue: 1 },
        },
        links: {
          enable: true,
          distance: 140,
          color: '#d7263d',
          opacity: 0.32,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.1,
          direction: 'none',
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: ['grab', 'repulse'] },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.4 } },
          repulse: { distance: 110, duration: 0.4 },
          push: { quantity: 2 },
        },
      },
    }),
    [],
  )

  if (!ready) return null

  return <Particles className="particle-background" id="globalParticles" options={options} />
}

export default ParticleBackground