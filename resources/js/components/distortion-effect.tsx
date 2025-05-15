"use client"

import { useEffect, useRef } from "react"
import type { MotionValue } from "framer-motion"

interface DistortionEffectProps {
  progress: MotionValue<number>
}

export function DistortionEffect({ progress }: DistortionEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create noise pattern
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 15 // Alpha (transparency)
      }

      return imageData
    }

    const noisePattern = createNoise()

    // Animation variables
    let animationFrameId: number
    let currentProgress = 0

    // Update function for the animation
    const update = () => {
      // Get current progress value
      progress.get() !== undefined && (currentProgress = progress.get())

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Apply distortion effect based on scroll progress
      const distortionStrength = currentProgress * 30
      const noiseOpacity = Math.max(0.05, currentProgress * 0.2)

      // Draw distortion lines
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + currentProgress * 0.1})`
      ctx.lineWidth = 1

      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath()

        for (let j = 0; j < canvas.width; j += 10) {
          const distortion = Math.sin(j * 0.01 + i * 0.005 + currentProgress * 5) * distortionStrength

          if (j === 0) {
            ctx.moveTo(j, i + distortion)
          } else {
            ctx.lineTo(j, i + distortion)
          }
        }

        ctx.stroke()
      }

      // Apply noise
      ctx.globalAlpha = noiseOpacity
      ctx.putImageData(noisePattern, 0, 0)
      ctx.globalAlpha = 1

      // Continue animation loop
      animationFrameId = requestAnimationFrame(update)
    }

    // Start animation
    update()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50 mix-blend-overlay"
    />
  )
}
