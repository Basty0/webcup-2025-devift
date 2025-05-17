import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Heart, MessageCircle, MoreVertical, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TheEndPostProps {
    username: string;
    userAvatar: string;
    videoUrl: string;
    description: string;
    likes: string;
    comments: string;
    shares: string;
    index: number;
    title?: string;
}

export default function TheEndPost({ username, userAvatar, videoUrl, description, likes, comments, shares, index, title }: TheEndPostProps) {
    const [liked, setLiked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Animation de chargement initial avec délai progressif
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 150 * index); // Délai progressif basé sur l'index

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <Card
            className={`relative aspect-[4/5] overflow-hidden rounded-lg border shadow-md transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isHovered ? 'z-10 scale-[1.02] shadow-xl' : 'z-0 scale-100 shadow-md'} `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image en arrière-plan qui occupe toute la carte */}
            <div className="absolute inset-0 h-full w-full">
                <Image
                    src={videoUrl || '/placeholder.svg'}
                    alt={title || 'Contenu de la publication'}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dégradés pour améliorer la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
            </div>

            {/* En-tête avec avatar et nom d'utilisateur */}
            <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                    <Avatar className={`h-8 w-8 border border-white/50 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                        <AvatarImage src={userAvatar || '/placeholder.svg'} alt={username} />
                        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white drop-shadow-md">@{username}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-black/20">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>

            {/* Pied de page avec interactions et description */}
            <div className="absolute right-0 bottom-0 left-0 z-10 p-4">
                {title && <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-white drop-shadow-md">{title}</h3>}
                <p className="mb-3 line-clamp-2 text-sm text-white drop-shadow-md">
                    <span className="font-medium">@{username}</span> {description}
                </p>

                <div className="flex w-full items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 px-2 text-white transition-transform duration-300 hover:bg-white/10 ${isHovered ? 'scale-110' : ''}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <Heart className={`h-5 w-5 transition-all duration-300 ${liked ? 'scale-125 fill-red-500 text-red-500' : 'text-white'}`} />
                        <span>{likes}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 px-2 text-white transition-transform duration-300 hover:bg-white/10 ${isHovered ? 'scale-110' : ''}`}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span>{comments}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 px-2 text-white transition-transform duration-300 hover:bg-white/10 ${isHovered ? 'scale-110' : ''}`}
                    >
                        <Share2 className="h-5 w-5" />
                        <span>{shares}</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
