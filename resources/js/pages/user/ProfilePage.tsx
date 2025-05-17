import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, MessageCircle, Share2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  // Données fictives pour les publications
  const publishedPosts = [
    {
      id: 1,
      content: "Voici ma dernière publication TheEnd !",
      date: "Il y a 2 heures",
      reactions: {
        like: 15,
        love: 5,
        care: 2,
        haha: 1,
        angry: 1,
      },
      comments: [
        {
          id: 101,
          author: "Marie Dubois",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          content: "Super publication ! J'adore ton contenu.",
          date: "Il y a 1 heure",
          reactions: {
            like: 2,
            love: 1,
          },
          replies: [
            {
              id: 1011,
              author: "Jean Dupont",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80",
              content: "Merci beaucoup Marie !",
              date: "Il y a 45 minutes",
              reactions: {
                like: 1,
              },
            },
          ],
        },
        {
          id: 102,
          author: "Thomas Martin",
          avatar:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          content: "Très intéressant, merci pour le partage !",
          date: "Il y a 30 minutes",
          reactions: {},
          replies: [],
        },
      ],
      shares: 2,
      image:
        "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
    },
    {
      id: 2,
      content: "J'ai passé une journée incroyable à explorer la ville. Voici quelques photos de mon aventure !",
      date: "Il y a 1 jour",
      reactions: {
        like: 30,
        love: 15,
        care: 5,
        haha: 4,
        angry: 2,
      },
      comments: [
        {
          id: 201,
          author: "Sophie Bernard",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          content: "Quelle belle journée ! Les photos sont magnifiques.",
          date: "Il y a 20 heures",
          reactions: {
            like: 3,
            love: 2,
          },
          replies: [],
        },
        {
          id: 202,
          author: "Lucas Petit",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          content: "J'adore cette ville ! Tu as visité le musée ?",
          date: "Il y a 18 heures",
          reactions: {
            like: 1,
          },
          replies: [
            {
              id: 2021,
              author: "Jean Dupont",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80",
              content: "Oui, c'était incroyable ! Je recommande vivement.",
              date: "Il y a 17 heures",
              reactions: {
                like: 2,
                haha: 1,
              },
            },
          ],
        },
        {
          id: 203,
          author: "Emma Leroy",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          content: "Superbes photos ! J'aimerais y aller aussi.",
          date: "Il y a 12 heures",
          reactions: {},
          replies: [],
        },
      ],
      shares: 8,
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
    },
  ]

  const draftPosts = [
    {
      id: 3,
      content: "Brouillon de ma prochaine publication...",
      date: "Modifié il y a 3 jours",
      image:
        "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
    },
    {
      id: 4,
      content: "Idées pour mon prochain projet TheEnd",
      date: "Modifié il y a 1 semaine",
      image:
        "https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300&q=80",
    },
  ]

  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Section de couverture et profil */}
      <div className="relative mb-6">
        {/* Photo de couverture */}
        <div className="relative h-[200px] md:h-[300px] w-full rounded-b-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
            alt="Photo de couverture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Photo de profil et informations */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 md:-mt-20 px-4 relative z-10">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80"
              alt="Photo de profil"
            />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full pb-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">Jean Dupont</h1>
              <p className="text-muted-foreground">1.2k amis · 350 abonnés</p>
            </div>

            <Button className="mt-2 md:mt-0" variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Modifier le profil
            </Button>
          </div>
        </div>

        <div className="border-b mt-4" />
      </div>

      {/* Section des publications */}
      <Tabs defaultValue="published" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="published">Publications</TabsTrigger>
          <TabsTrigger value="drafts">Brouillons</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-6">
          {publishedPosts.map((post) => (
            <PostCard
              key={post.id}
              content={post.content}
              date={post.date}
              reactions={post.reactions}
              comments={post.comments}
              shares={post.shares}
              image={post.image}
              isPublished={true}
            />
          ))}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          {draftPosts.map((post) => (
            <PostCard key={post.id} content={post.content} date={post.date} image={post.image} isPublished={false} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Composant pour les cartes de publication
function PostCard({ content, date, reactions = {}, comments = [], shares = 0, image, isPublished = true }) {
  const [showComments, setShowComments] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [userReaction, setUserReaction] = useState(null)
  const [postReactions, setPostReactions] = useState(
    reactions || {
      like: 0,
      love: 0,
      care: 0,
      haha: 0,
      angry: 0,
    },
  )
  const [postComments, setPostComments] = useState(comments || [])
  const [replyingTo, setReplyingTo] = useState(null)
  const [commentText, setCommentText] = useState("")

  // Définition des réactions disponibles avec des emojis
  const reactionTypes = [
    {
      type: "like",
      label: "J'aime",
      emoji: "👍",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      type: "love",
      label: "J'adore",
      emoji: "❤️",
      color: "text-rose-500",
      bgColor: "bg-rose-100",
    },
    {
      type: "care",
      label: "Solidaire",
      emoji: "👐",
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
    {
      type: "haha",
      label: "Haha",
      emoji: "😂",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      type: "angry",
      label: "Grrrr",
      emoji: "😡",
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
  ]

  // Trouver la réaction actuelle de l'utilisateur
  const currentReaction = userReaction ? reactionTypes.find((r) => r.type === userReaction) : reactionTypes[0]

  // Calculer le total des réactions
  const totalReactions = Object.values(postReactions).reduce((sum, count) => sum + count, 0)

  // Gérer le clic sur une réaction
  const handleReactionClick = (reactionType) => {
    // Si l'utilisateur clique sur la même réaction, on la retire
    if (userReaction === reactionType) {
      setUserReaction(null)
      setPostReactions({
        ...postReactions,
        [reactionType]: Math.max(0, postReactions[reactionType] - 1),
      })
    } else {
      // Si l'utilisateur avait déjà réagi, on retire l'ancienne réaction
      if (userReaction) {
        setPostReactions({
          ...postReactions,
          [userReaction]: Math.max(0, postReactions[userReaction] - 1),
          [reactionType]: (postReactions[reactionType] || 0) + 1,
        })
      } else {
        // Sinon on ajoute simplement la nouvelle réaction
        setPostReactions({
          ...postReactions,
          [reactionType]: (postReactions[reactionType] || 0) + 1,
        })
      }
      setUserReaction(reactionType)
    }
    setShowReactions(false)
  }

  // Gérer l'ajout d'un commentaire
  const handleAddComment = (parentId = null) => {
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      author: "Jean Dupont",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80",
      content: commentText,
      date: "À l'instant",
      reactions: {},
      replies: [],
    }

    if (parentId) {
      // Ajouter une réponse à un commentaire existant
      const updatedComments = postComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment],
          }
        }
        return comment
      })
      setPostComments(updatedComments)
      setReplyingTo(null)
    } else {
      // Ajouter un nouveau commentaire principal
      setPostComments([...postComments, newComment])
    }

    setCommentText("")
  }

  // Gérer la réaction à un commentaire
  const handleCommentReaction = (commentId, reactionType, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      // Réagir à une réponse
      const updatedComments = postComments.map((comment) => {
        if (comment.id === parentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              const currentCount = reply.reactions[reactionType] || 0
              return {
                ...reply,
                reactions: {
                  ...reply.reactions,
                  [reactionType]: currentCount + 1,
                },
              }
            }
            return reply
          })
          return {
            ...comment,
            replies: updatedReplies,
          }
        }
        return comment
      })
      setPostComments(updatedComments)
    } else {
      // Réagir à un commentaire principal
      const updatedComments = postComments.map((comment) => {
        if (comment.id === commentId) {
          const currentCount = comment.reactions[reactionType] || 0
          return {
            ...comment,
            reactions: {
              ...comment.reactions,
              [reactionType]: currentCount + 1,
            },
          }
        }
        return comment
      })
      setPostComments(updatedComments)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
            alt="Avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Jean Dupont</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
        {/* Image de la publication */}
        {image && (
          <div className="mt-4 rounded-md overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt="Contenu de la publication"
              width={600}
              height={300}
              className="w-full object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        {/* Affichage des compteurs de réactions */}
        {isPublished && totalReactions > 0 && (
          <div className="w-full flex justify-start mb-2">
            <div className="flex items-center text-sm text-muted-foreground">
              {reactionTypes.map(
                (reaction) =>
                  postReactions[reaction.type] > 0 && (
                    <div key={reaction.type} className="flex items-center mr-3">
                      <span className="mr-1">{reaction.emoji}</span>
                      <span>{postReactions[reaction.type]}</span>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        <div className="border-t w-full pt-4 pb-2">
          {isPublished ? (
            <div className="flex justify-between w-full">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className={userReaction ? `${currentReaction.color}` : ""}
                  onClick={() => setShowReactions(!showReactions)}
                >
                  <span className="text-lg mr-2">
                    {userReaction ? reactionTypes.find((r) => r.type === userReaction).emoji : "👍"}
                  </span>
                  <span>{userReaction ? reactionTypes.find((r) => r.type === userReaction).label : "J'aime"}</span>
                </Button>

                {/* Menu de réactions au clic */}
                {showReactions && (
                  <div className="absolute -top-16 left-0 flex gap-2 bg-background border rounded-full p-2 shadow-lg z-10">
                    {reactionTypes.map((reaction) => (
                      <button
                        key={reaction.type}
                        className={`p-2 rounded-full hover:${reaction.bgColor} transition-transform hover:scale-125 ${
                          userReaction === reaction.type ? reaction.bgColor : ""
                        }`}
                        onClick={() => handleReactionClick(reaction.type)}
                        title={`${reaction.label} (${postReactions[reaction.type] || 0})`}
                      >
                        <span className="text-xl">{reaction.emoji}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
                <MessageCircle className="mr-2 h-4 w-4" />
                {postComments.length}
                {showComments ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                {shares}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end w-full">
              <Button variant="outline" size="sm" className="mr-2">
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </Button>
              <Button>Publier</Button>
            </div>
          )}
        </div>

        {/* Section des commentaires */}
        {isPublished && showComments && (
          <div className="w-full mt-2 space-y-3 pt-2 border-t">
            {postComments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                {/* Commentaire principal */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{comment.author}</h4>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>

                    {/* Actions du commentaire */}
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <div className="flex space-x-2">
                        <div className="relative group">
                          <button className="hover:text-primary">J'aime</button>
                          <div className="absolute bottom-full left-0 hidden group-hover:flex bg-background border rounded-full p-1 shadow-md mb-1">
                            {reactionTypes.map((reaction) => (
                              <button
                                key={reaction.type}
                                className="p-1 hover:scale-125 transition-transform"
                                onClick={() => handleCommentReaction(comment.id, reaction.type)}
                                title={reaction.label}
                              >
                                <span className="text-lg">{reaction.emoji}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          className="hover:text-primary"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          Répondre
                        </button>
                      </div>

                      {/* Affichage des réactions au commentaire */}
                      {Object.keys(comment.reactions).length > 0 && (
                        <div className="ml-auto flex items-center">
                          {Object.entries(comment.reactions).map(([type, count]) => {
                            const reaction = reactionTypes.find((r) => r.type === type)
                            return (
                              <div key={type} className="flex items-center ml-1">
                                <span className="text-sm">{reaction.emoji}</span>
                                <span className="text-xs ml-1">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Formulaire de réponse */}
                    {replyingTo === comment.id && (
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
                            alt="Votre avatar"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder={`Répondre à ${comment.author}...`}
                          className="flex-1 bg-muted rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <Button size="sm" className="ml-2" onClick={() => handleAddComment(comment.id)}>
                          Commenter
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Réponses aux commentaires */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-11 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                          <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg px-3 py-2">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-medium">{reply.author}</h4>
                              <span className="text-xs text-muted-foreground">{reply.date}</span>
                            </div>
                            <p className="text-sm mt-1">{reply.content}</p>
                          </div>

                          {/* Actions de la réponse */}
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <div className="flex space-x-2">
                              <div className="relative group">
                                <button className="hover:text-primary">J'aime</button>
                                <div className="absolute bottom-full left-0 hidden group-hover:flex bg-background border rounded-full p-1 shadow-md mb-1">
                                  {reactionTypes.map((reaction) => (
                                    <button
                                      key={reaction.type}
                                      className="p-1 hover:scale-125 transition-transform"
                                      onClick={() => handleCommentReaction(reply.id, reaction.type, true, comment.id)}
                                      title={reaction.label}
                                    >
                                      <span className="text-lg">{reaction.emoji}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <button
                                className="hover:text-primary"
                                onClick={() => {
                                  setReplyingTo(comment.id)
                                  setCommentText(`@${reply.author} `)
                                }}
                              >
                                Répondre
                              </button>
                            </div>

                            {/* Affichage des réactions à la réponse */}
                            {Object.keys(reply.reactions).length > 0 && (
                              <div className="ml-auto flex items-center">
                                {Object.entries(reply.reactions).map(([type, count]) => {
                                  const reaction = reactionTypes.find((r) => r.type === type)
                                  return (
                                    <div key={type} className="flex items-center ml-1">
                                      <span className="text-sm">{reaction.emoji}</span>
                                      <span className="text-xs ml-1">{count}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Formulaire pour ajouter un commentaire */}
            <div className="flex gap-3 mt-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
                  alt="Votre avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="sm" className="ml-2" onClick={() => handleAddComment()}>
                  Commenter
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
