"use client"

import { useEffect, useRef } from "react"

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }

    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
    }))

    const c = ctx
    const cv = canvas
    let raf: number

    function animate() {
      c.clearRect(0, 0, cv.width, cv.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = cv.width
        if (p.x > cv.width) p.x = 0
        if (p.y < 0) p.y = cv.height
        if (p.y > cv.height) p.y = 0

        c.beginPath()
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        c.fillStyle = `rgba(0, 217, 255, ${p.alpha})`
        c.fill()
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    function handleResize() {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 grid-pattern" />
      <div className="pointer-events-none fixed inset-0 z-0 aurora-gradient opacity-60" />
      <div className="pointer-events-none fixed left-1/4 top-1/3 z-0 h-[600px] w-[600px] rounded-full bg-primary/3 blur-[120px]" />
      <div className="pointer-events-none fixed right-1/4 top-2/3 z-0 h-[500px] w-[500px] rounded-full bg-secondary/3 blur-[100px]" />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />
    </>
  )
}
