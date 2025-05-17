
import { useState } from "react"
import TheEndPost from "./the-end-post"

// Type pour les publications
interface TheEndPostProps {
  id: string
  username: string
  userAvatar: string
  videoUrl: string
  description: string
  likes: number
  comments: number
  shares: number
}

export default function TheEndFeed() {
  // Données simulées pour les publications
  const [posts, setPosts] = useState<TheEndPostProps[]>([
    {
      id: "1",
      username: "user1",
      userAvatar: "/placeholder.svg?height=40&width=40",
      videoUrl:
        "https://images.unsplash.com/photo-1601024445121-e5b82f020549?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Ma première publication TheEnd #fun #découverte",
      likes: 1245,
      comments: 89,
      shares: 32,
    },
    {
      id: "2",
      username: "user2",
      userAvatar: "/placeholder.svg?height=40&width=40",
      videoUrl:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Regardez cette vue incroyable! #voyage #nature",
      likes: 3782,
      comments: 156,
      shares: 78,
    },
    {
      id: "3",
      username: "user3",
      userAvatar: "/placeholder.svg?height=40&width=40",
      videoUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Nouvelle recette à essayer #cuisine #facile",
      likes: 982,
      comments: 45,
      shares: 12,
    },
    {
      id: "4",
      username: "user4",
      userAvatar: "/placeholder.svg?height=40&width=40",
      videoUrl:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Mon nouveau projet créatif #art #création",
      likes: 2451,
      comments: 102,
      shares: 54,
    },
    {
      id: "5",
      username: "user5",
      userAvatar: "/placeholder.svg?height=40&width=40",
      videoUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Moment de détente #relax #weekend",
      likes: 1876,
      comments: 67,
      shares: 23,
    },
    {
      id: "6",
      username: "user6",
      userAvatar: "/placeholder.svg?height=40&width=40",
      videoUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Nouvelle collection #mode #tendance",
      likes: 3214,
      comments: 143,
      shares: 87,
    },
  ])

  // Fonction pour formater le nombre de likes
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    } else {
      return num.toString()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <TheEndPost
          key={post.id}
          username={post.username}
          userAvatar={post.userAvatar}
          videoUrl={post.videoUrl}
          description={post.description}
          likes={formatNumber(post.likes)}
          comments={formatNumber(post.comments)}
          shares={formatNumber(post.shares)}
          index={index}
        />
      ))}
    </div>
  )
}
