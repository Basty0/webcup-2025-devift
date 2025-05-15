"use client"

import { useEffect, useState } from "react"
import { motion, type MotionValue, useSpring, useTransform } from "framer-motion"

interface CursorFollowerProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export default function CursorFollower({ mouseX, mouseY }: CursorFollowerProps) {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  // Spring animations for smooth cursor movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(
    useTransform(mouseX, (x) => x),
    springConfig,
  )
  const cursorY = useSpring(
    useTransform(mouseY, (y) => y),
    springConfig,
  )

  // Cursor size based on variant
  const cursorSize = useTransform(() => {
    switch (cursorVariant) {
      case "button":
        return 80
      case "link":
        return 60
      default:
        return 24
    }
  })

  // Cursor background based on variant
  const cursorBackground = useTransform(() => {
    switch (cursorVariant) {
      case "button":
        return "rgba(255, 255, 255, 0.2)"
      case "link":
        return "rgba(255, 255, 255, 0.1)"
      default:
        return "rgba(255, 255, 255, 0.5)"
    }
  })

  // Cursor mix-blend-mode based on variant
  const cursorBlend = useTransform(() => {
    switch (cursorVariant) {
      case "button":
        return "difference"
      default:
        return "difference"
    }
  })

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check for button elements
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button")
        setCursorText("Cliquer")
        return
      }

      // Check for link elements
      if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link")
        setCursorText("")
        return
      }

      // Default cursor
      setCursorVariant("default")
      setCursorText("")
    }

    document.addEventListener("mouseover", handleMouseOver)
    return () => document.removeEventListener("mouseover", handleMouseOver)
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center text-xs font-medium text-white"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          borderRadius: "50%",
          backgroundColor: cursorBackground,
          mixBlendMode: cursorBlend as any,
        }}
      >
        {cursorText && <span>{cursorText}</span>}
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 bg-white rounded-full"
        style={{
          x: useTransform(cursorX, (x) => x - 3),
          y: useTransform(cursorY, (y) => y - 3),
          mixBlendMode: "difference",
        }}
      />
    </>
  )
}
