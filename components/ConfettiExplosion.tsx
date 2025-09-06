'use client'

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react'

export type ConfettiHandle = {
  /** Dispara la explosión. Coordenadas en viewport [0..1]. */
  fire: (opts?: { x?: number; y?: number; particleCount?: number }) => void
}

export type ConfettiProps = {
  /** Cantidad base de partículas */
  particleCount?: number
  /** Paleta de colores (hex o rgb) */
  colors?: string[]
  /** Gravedad (más alto = cae más rápido) */
  gravity?: number
  /** Duración máxima de la animación en ms (por ráfaga) */
  duration?: number
  /** Z-index del lienzo */
  zIndex?: number
  /** Si true, dispara automáticamente al montar */
  autoFire?: boolean
  /** Estilo extra para el canvas contenedor */
  style?: React.CSSProperties
}

/**
 * Componente de confeti sin audio. 100% client-side, sin dependencias.
 * - Usa <canvas> full-screen con posición fixed.
 * - Expone un método `fire()` vía ref para disparar explosiones.
 * - No bloquea scroll ni clics (pointer-events: none).
 */
const ConfettiExplosion = forwardRef<ConfettiHandle, ConfettiProps>(
  (
    {
      particleCount = 180,
      colors = ['#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#ef4444'],
      gravity = 0.12,
      duration = 1800,
      zIndex = 50,
      autoFire = false,
      style,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const particlesRef = useRef<Particle[]>([])
    const rafRef = useRef<number | null>(null)

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      vr: number
      color: string
      ttl: number // time to live ms
      born: number
      shape: 'rect' | 'triangle' | 'circle'
      alpha: number
    }

    const resize = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctxRef.current = ctx
      }
    }, [])

    useEffect(() => {
      resize()
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }, [resize])

    const spawn = (opts?: { x?: number; y?: number; particleCount?: number }) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const x = (opts?.x ?? 0.5) * width
      const y = (opts?.y ?? 0.5) * height
      const count = Math.max(1, Math.floor(opts?.particleCount ?? particleCount))

      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 4 + Math.random() * 6 // 4..10
        const size = 4 + Math.random() * 6
        const shapeRand = Math.random()
        const shape: Particle['shape'] =
          shapeRand < 0.33 ? 'rect' : shapeRand < 0.66 ? 'triangle' : 'circle'
        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4, // leve impulso hacia arriba
          size,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
          color: colors[i % colors.length],
          ttl: duration,
          born: performance.now(),
          shape,
          alpha: 1,
        })
      }
      particlesRef.current.push(...newParticles)
      loop()
    }

    const draw = (p: Particle, now: number) => {
      const ctx = ctxRef.current
      if (!ctx) return
      const life = Math.min(1, (now - p.born) / p.ttl)
      // suavizado de desvanecimiento al final
      p.alpha = 1 - life * life
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.alpha)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      switch (p.shape) {
        case 'rect':
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          break
        case 'triangle':
          ctx.beginPath()
          ctx.moveTo(0, -p.size / 1.3)
          ctx.lineTo(p.size / 1.3, p.size / 1.3)
          ctx.lineTo(-p.size / 1.3, p.size / 1.3)
          ctx.closePath()
          ctx.fill()
          break
        case 'circle':
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
      }
      ctx.restore()
    }

    const step = (p: Particle) => {
      // física simple
      p.vy += gravity
      p.vx *= 0.992 // rozamiento leve
      p.vy *= 0.992
      p.rotation += p.vr
      p.x += p.vx
      p.y += p.vy
    }

    const loop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const ctx = ctxRef.current
      if (!ctx) return
      const now = performance.now()

      const tick = () => {
        const nowTick = performance.now()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        particlesRef.current = particlesRef.current.filter((p) => nowTick - p.born < p.ttl && p.alpha > 0.02)
        for (const p of particlesRef.current) {
          step(p)
          draw(p, nowTick)
        }
        if (particlesRef.current.length > 0) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    useImperativeHandle(ref, () => ({ fire: spawn }), [spawn])

    // Auto-disparo al montar si se solicita
    useEffect(() => {
      if (autoFire) spawn()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoFire])

    return (
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex,
          ...style,
        }}
      />
    )
  }
)

ConfettiExplosion.displayName = 'ConfettiExplosion'
export default ConfettiExplosion

// Ejemplo de uso:
// 'use client'
// import { useRef } from 'react'
// import ConfettiExplosion, { ConfettiHandle } from './ConfettiExplosion'
//
// export default function Demo() {
//   const ref = useRef<ConfettiHandle>(null)
//
//   ref.current?.fire() disparo desde el centro de la pantalla o ref.current?.fire({ x: 0.8, y: 0.2 }); // coordenadas relativas (0..1)
//
//   return (
//     <div className="min-h-screen grid place-items-center p-10">
//       <button
//         onClick={() => ref.current?.fire()}
//         className="px-4 py-2 rounded-2xl shadow hover:shadow-lg border text-sm"
//       >
//         ¡Celebrar!
//       </button>
//       <ConfettiExplosion ref={ref} />
//     </div>
//   )
// }
