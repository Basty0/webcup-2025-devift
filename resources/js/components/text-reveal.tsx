import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
  inView: boolean
}

export default function TextReveal({ text, className, inView }: TextRevealProps) {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    setWords(text.split(" "))
  }, [text])

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className={className} variants={container} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-2" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
