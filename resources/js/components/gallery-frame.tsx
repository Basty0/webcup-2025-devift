import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"

interface GalleryFrameProps {
  id: string
  name: string
  author: string
  bg: string
  image: string
  onOpen: (id: string) => void
  rotation: "left" | "right" | "none"
}

export function GalleryFrame({ id, name, author, bg, image, onOpen, rotation }: GalleryFrameProps) {
  const [isHovered, setIsHovered] = useState(false)

  const rotationValue = rotation === "left" ? -5 : rotation === "right" ? 5 : 0

  return (
    <motion.div
      initial={{ rotate: rotationValue }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(id)}
    >
      <Card
        className="w-64 overflow-hidden shadow-lg transition-shadow duration-300"
        style={{
          backgroundColor: bg,
          boxShadow: isHovered
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : undefined,
        }}
      >
        <div className="p-3 pt-5">
          <h2 className="text-2xl font-medium mb-1">{name}</h2>
        </div>
        <CardContent className="p-0">
          <div className="relative aspect-[1/1.2] overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-3 text-sm">
          <span className="text-gray-600">{author}</span>
          <span className="text-gray-500">/{id}</span>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
