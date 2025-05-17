import type React from "react"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export const Image: React.FC<ImageProps> = ({ src, alt, fill, width, height, className, priority, ...props }) => {
  if (fill) {
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`object-cover object-center ${className || ""}`}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  )
}
