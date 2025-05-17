
import { useState, useEffect } from "react"
import { Image } from '@/components/ui/image';
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface TheEndPostProps {
    username: string
    userAvatar: string
    videoUrl: string
    description: string
    likes: string
    comments: string
    shares: string
    index: number
  }
  
  export default function TheEndPost({
    username,
    userAvatar,
    videoUrl,
    description,
    likes,
    comments,
    shares,
    index,
  }: TheEndPostProps) {
    const [liked, setLiked] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
  
    // Animation de chargement initial avec délai progressif
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 150 * index) // Délai progressif basé sur l'index
  
      return () => clearTimeout(timer)
    }, [index])
  
    return (
      <Card
        className={`overflow-hidden border rounded-lg shadow-md transition-all duration-500 ease-in-out relative aspect-[4/5]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} 
          ${isHovered ? "shadow-xl scale-[1.02] z-10" : "shadow-md scale-100 z-0"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image en arrière-plan qui occupe toute la carte */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={videoUrl || "/placeholder.svg"}
            alt="Contenu de la publication"
            fill
            className={`object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
  
          {/* Dégradés pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </div>
  
        {/* En-tête avec avatar et nom d'utilisateur */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Avatar
              className={`h-8 w-8 border border-white/50 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
            >
              <AvatarImage src={userAvatar || "/placeholder.svg"} alt={username} />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-white drop-shadow-md">@{username}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-black/20">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
  
        {/* Pied de page avec interactions et description */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p className="text-sm text-white mb-3 drop-shadow-md line-clamp-2">
            <span className="font-medium">@{username}</span> {description}
          </p>
  
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 px-2 transition-transform duration-300 text-white hover:bg-white/10 ${isHovered ? "scale-110" : ""}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${liked ? "fill-red-500 text-red-500 scale-125" : "text-white"}`}
              />
              <span>{likes}</span>
            </Button>
  
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 px-2 transition-transform duration-300 text-white hover:bg-white/10 ${isHovered ? "scale-110" : ""}`}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments}</span>
            </Button>
  
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 px-2 transition-transform duration-300 text-white hover:bg-white/10 ${isHovered ? "scale-110" : ""}`}
            >
              <Share2 className="h-5 w-5" />
              <span>{shares}</span>
            </Button>
          </div>
        </div>
      </Card>
    )
  }
  