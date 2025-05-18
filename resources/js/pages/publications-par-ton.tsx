"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Types pour nos données
interface Publication {
  id: string
  titre: string
  contenu: string
  auteur: {
    nom: string
    username: string
    avatar: string
    initiales: string
  }
  date: string
  categorie: string
  likes: number
  commentaires: number
  partages: number
  populaire: boolean
  hashtags: string[]
}

// Images de fond pour chaque catégorie (utilisant des images Pinterest)
const backgroundImages = {
  Dramatique: "https://i.pinimg.com/1200x/13/35/a7/1335a7eb25054aac5a0ef14f79b9f53b.jpg",
  Ironique: "https://i.pinimg.com/1200x/b7/92/bc/b792bc8edcb8ded7a0d534308f4cd260.jpg",
  Classe: "https://i.pinimg.com/1200x/7a/ea/08/7aea08c5323513c0a4c28ff5cb4d5d14.jpg",
  Poétique: "https://i.pinimg.com/1200x/6a/f7/ec/6af7ec8724b42cdc74c36564470a89cc.jpg",
  Rageur: "https://i.pinimg.com/1200x/ad/a2/9f/ada29f292e3ddb88821218dee8ec17c9.jpg",
  Humoristique: "https://i.pinimg.com/1200x/c6/96/22/c69622f84e7252f86492771f8cb57158.jpg",
  Chaleureux: "https://i.pinimg.com/1200x/0d/c6/b3/0dc6b359d2cb382bd2261470b065178d.jpg",
  Mystérieux: "https://i.pinimg.com/1200x/b6/77/f2/b677f2fe49b7bb1aee21024985e140cf.jpg",
  Zen: "https://i.pinimg.com/1200x/bd/cc/28/bdcc285604cb7627cac5a3effc87a2ff.jpg",
}

// Couleurs d'avatar pour chaque catégorie
const avatarColors = {
  Dramatique: "bg-purple-700",
  Ironique: "bg-blue-500",
  Classe: "bg-emerald-600",
  Poétique: "bg-pink-600",
  Rageur: "bg-red-600",
  Humoristique: "bg-amber-500",
  Chaleureux: "bg-orange-500",
  Mystérieux: "bg-indigo-700",
  Zen: "bg-teal-600",
}

// Données fictives
const publications: Publication[] = [
  {
    id: "1",
    titre: "L'ombre des jours passés",
    contenu: "Dans le silence de l'aube, je contemple les vestiges de nos souvenirs.",
    auteur: {
      nom: "Sophie Durand",
      username: "sophie_d",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "SD",
    },
    date: "12 mai",
    categorie: "Dramatique",
    likes: 1245,
    commentaires: 32,
    partages: 18,
    populaire: true,
    hashtags: ["nostalgie", "souvenirs", "aube"],
  },
  {
    id: "2",
    titre: "Guide de survie en réunion",
    contenu:
      "Comment avoir l'air intelligent en réunion : hochez la tête régulièrement et dites 'exactement' toutes les cinq minutes.",
    auteur: {
      nom: "Marc Leblanc",
      username: "marc_leblanc",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "ML",
    },
    date: "3 juin",
    categorie: "Ironique",
    likes: 2567,
    commentaires: 89,
    partages: 124,
    populaire: true,
    hashtags: ["bureau", "humour", "réunion"],
  },
  {
    id: "3",
    titre: "L'art de la diplomatie moderne",
    contenu:
      "La véritable élégance réside dans la capacité à naviguer avec aisance entre les complexités des relations humaines.",
    auteur: {
      nom: "Claire Fontaine",
      username: "claire.fontaine",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "CF",
    },
    date: "17 avril",
    categorie: "Classe",
    likes: 989,
    commentaires: 23,
    partages: 45,
    populaire: false,
    hashtags: ["élégance", "diplomatie", "relations"],
  },
  {
    id: "4",
    titre: "Murmures du crépuscule",
    contenu:
      "Les étoiles dansent sur la toile du firmament, tandis que les murmures du vent caressent les feuilles frémissantes.",
    auteur: {
      nom: "Thomas Rivière",
      username: "thomas_r",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "TR",
    },
    date: "29 mai",
    categorie: "Poétique",
    likes: 1312,
    commentaires: 47,
    partages: 78,
    populaire: true,
    hashtags: ["poésie", "nuit", "étoiles"],
  },
  {
    id: "5",
    titre: "STOP AUX EXCUSES !",
    contenu: "J'EN AI ASSEZ DE CES PROMESSES VIDES ! Quand allez-vous enfin AGIR au lieu de parler ?",
    auteur: {
      nom: "Julie Moreau",
      username: "julie.moreau",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "JM",
    },
    date: "8 juin",
    categorie: "Rageur",
    likes: 2421,
    commentaires: 156,
    partages: 87,
    populaire: true,
    hashtags: ["colère", "action", "promesses"],
  },
  {
    id: "6",
    titre: "Comment j'ai survécu à ma famille",
    contenu:
      "Réunion de famille : ce moment magique où l'on découvre que la génétique a un sens de l'humour très particulier.",
    auteur: {
      nom: "Pierre Dubois",
      username: "pierre_d",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "PD",
    },
    date: "22 mai",
    categorie: "Humoristique",
    likes: 3678,
    commentaires: 92,
    partages: 134,
    populaire: true,
    hashtags: ["famille", "humour", "weekend"],
  },
  {
    id: "7",
    titre: "Un café et des souvenirs",
    contenu: "Assis dans ce petit café au coin de la rue, je me laisse bercer par le doux murmure des conversations.",
    auteur: {
      nom: "Émilie Laurent",
      username: "emilie_l",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "EL",
    },
    date: "14 juin",
    categorie: "Chaleureux",
    likes: 1234,
    commentaires: 41,
    partages: 28,
    populaire: false,
    hashtags: ["café", "détente", "ambiance"],
  },
  {
    id: "8",
    titre: "Les secrets du vieux manoir",
    contenu: "Derrière ces murs centenaires se cachent des histoires que peu osent raconter.",
    auteur: {
      nom: "Nicolas Mercier",
      username: "nico.mercier",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "NM",
    },
    date: "2 juin",
    categorie: "Mystérieux",
    likes: 1345,
    commentaires: 67,
    partages: 52,
    populaire: false,
    hashtags: ["mystère", "manoir", "secrets"],
  },
  {
    id: "9",
    titre: "Respirer l'instant présent",
    contenu:
      "Chaque respiration est une opportunité de renouveau. Laissez vos pensées passer comme des nuages dans le ciel.",
    auteur: {
      nom: "Léa Martin",
      username: "lea.zen",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "LM",
    },
    date: "19 mai",
    categorie: "Zen",
    likes: 2289,
    commentaires: 34,
    partages: 61,
    populaire: false,
    hashtags: ["méditation", "présent", "sérénité"],
  },
  {
    id: "10",
    titre: "La dernière danse",
    contenu: "Les lumières s'éteignent une à une, ne laissant que l'écho lointain de la musique.",
    auteur: {
      nom: "Antoine Dupont",
      username: "antoine.d",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "AD",
    },
    date: "7 juin",
    categorie: "Dramatique",
    likes: 1198,
    commentaires: 29,
    partages: 17,
    populaire: false,
    hashtags: ["danse", "mélancolie", "nuit"],
  },
  {
    id: "11",
    titre: "Guide de méditation pour débutants",
    contenu: "Fermez les yeux, respirez profondément, et laissez votre esprit se calmer.",
    auteur: {
      nom: "Sarah Benoit",
      username: "sarah.zen",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "SB",
    },
    date: "11 juin",
    categorie: "Zen",
    likes: 1412,
    commentaires: 53,
    partages: 87,
    populaire: true,
    hashtags: ["méditation", "calme", "débutant"],
  },
  {
    id: "12",
    titre: "L'énigme du temps",
    contenu: "Dans les recoins oubliés de la vieille horloge, le temps garde ses secrets les plus précieux.",
    auteur: {
      nom: "Hugo Lefort",
      username: "hugo.mystere",
      avatar: "/placeholder.svg?height=40&width=40",
      initiales: "HL",
    },
    date: "25 mai",
    categorie: "Mystérieux",
    likes: 1267,
    commentaires: 38,
    partages: 42,
    populaire: true,
    hashtags: ["temps", "énigme", "mystère"],
  },
]

// Obtenir toutes les catégories uniques
const categories = ["Tous", ...Array.from(new Set(publications.map((pub) => pub.categorie)))]

// Obtenir les publications populaires
const publicationsPopulaires = publications.filter((pub) => pub.populaire)

// Formater les nombres pour l'affichage (1200 -> 1.2K)
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export default function PublicationsParTon() {
  const [activeTab, setActiveTab] = useState("Tous")
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  // Filtrer les publications selon l'onglet actif
  const publicationsFiltrees =
    activeTab === "Tous" ? publications : publications.filter((pub) => pub.categorie === activeTab)

  // Gérer le clic sur le bouton "J'adore"
  const handleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id))
    } else {
      setLikedPosts([...likedPosts, id])
    }
  }

  // Rendu d'une publication style réseau social moderne
  const renderPublication = (publication: Publication) => (
    <Card key={publication.id} className="mb-4 overflow-hidden rounded-xl border-0 shadow-md  ">
      {/* En-tête avec avatar et nom d'utilisateur */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Avatar className={`h-8 w-8 ${avatarColors[publication.categorie as keyof typeof avatarColors]}`}>
            <AvatarFallback>{publication.auteur.initiales}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">@{publication.auteur.username}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8  hover:text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Image principale */}
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImages[publication.categorie as keyof typeof backgroundImages]})`,
          height: "400px",
        }}
      />

      {/* Texte et hashtags */}
      <div className="p-3 pt-2">
        <p className="text-sm ">
          <span className="font-medium ">@{publication.auteur.username}</span> {publication.contenu}{" "}
          {publication.hashtags.map((tag, index) => (
            <span key={index} className="text-blue-400">
              #{tag}{" "}
            </span>
          ))}
        </p>
      </div>

      {/* Interactions */}
      <div className="flex justify-between px-3 pb-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 ${likedPosts.includes(publication.id) ? "text-red-500" : ""}`}
            onClick={() => handleLike(publication.id)}
          >
            <Heart className={`h-5 w-5 ${likedPosts.includes(publication.id) ? "fill-red-500" : ""}`} />
          </Button>
          <span className="text-sm ">
            {formatNumber(likedPosts.includes(publication.id) ? publication.likes + 1 : publication.likes)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <span className="text-sm">{formatNumber(publication.commentaires)}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ">
            <Share2 className="h-5 w-5" />
          </Button>
          <span className="text-sm ">{formatNumber(publication.partages)}</span>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="space-y-4 ">
      <div className="sticky top-0 z-10  border-b  pb-2 pt-2">
        <Tabs defaultValue="Tous" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex h-auto mb-0  justify-start overflow-x-auto space-x-2 p-1 rounded-lg">
            {categories.map((categorie) => (
              <TabsTrigger
                key={categorie}
                value={categorie}
                className="px-3 py-1 rounded-md data-[state=active]:bg-blue-600 "
              >
                {categorie}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((categorie) => (
            <TabsContent key={categorie} value={categorie} className="mt-2">
              <ScrollArea className="h-[650px]">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-2 max-w-3xl mx-auto">
                  {(categorie === "Tous"
                    ? publications
                    : publications.filter((pub) => pub.categorie === categorie)
                  ).map((pub) => (
                    <div key={pub.id}>{renderPublication(pub)}</div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className=" p-4 rounded-lg border ">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Tendances</h2>
          <Badge variant="outline" className="bg-blue-600  border-0">
            Populaire
          </Badge>
        </div>
        <Separator className="mb-4 " />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {publicationsPopulaires.slice(0, 3).map((publication) => (
            <Card
              key={`pop-${publication.id}`}
              className="overflow-hidden rounded-xl border-0 shadow-md  "
            >
              <div
                className="w-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${backgroundImages[publication.categorie as keyof typeof backgroundImages]})`,
                  height: "150px",
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t  to-transparent">
                  <div className="flex items-center gap-1">
                    <Avatar className={`h-5 w-5 ${avatarColors[publication.categorie as keyof typeof avatarColors]}`}>
                      <AvatarFallback className="text-xs">{publication.auteur.initiales}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">@{publication.auteur.username}</span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="flex justify-between text-xs ">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{formatNumber(publication.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{formatNumber(publication.commentaires)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    <span>{formatNumber(publication.partages)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
