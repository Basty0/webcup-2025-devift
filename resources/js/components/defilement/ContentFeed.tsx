import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import ContentCard from './ContentCard';
import InteractionBar from './InteractionBar';

// Types
export interface Author {
    name: string;
    image: string;
    type: string;
}

export interface Content {
    title: string;
    description: string;
    image: string;
}

export interface Stats {
    likes: number;
    comments: number;
    shares: number;
}

export interface Post {
    id: number;
    author: Author;
    content: Content;
    stats: Stats;
}

interface ContentFeedProps {
    isMobile: boolean;
}

export default function ContentFeed({ isMobile }: ContentFeedProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const posts: Post[] = [
        {
            id: 1,
            author: {
                name: 'Marie Dubois',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Photographie',
            },
            content: {
                title: 'Coucher de soleil à Paris',
                description:
                    'Un magnifique coucher de soleil capturé depuis la Tour Eiffel hier soir. Les couleurs étaient incroyables! La vue depuis le sommet offrait un panorama à couper le souffle sur toute la ville.',
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 125,
                comments: 124,
                shares: 67,
            },
        },
        {
            id: 2,
            author: {
                name: 'Thomas Martin',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Cuisine',
            },
            content: {
                title: 'Recette de tarte aux pommes traditionnelle',
                description:
                    "Ma grand-mère m'a transmis cette recette de tarte aux pommes. Simple mais délicieuse, elle ravira vos papilles! Le secret est dans la pâte brisée maison et les pommes de saison.",
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 856,
                comments: 124,
                shares: 67,
            },
        },
        {
            id: 3,
            author: {
                name: 'Sophie Leroy',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Voyage',
            },
            content: {
                title: 'Découverte des plages de Normandie',
                description:
                    "Week-end incroyable sur les plages de Normandie. L'air marin et les paysages sont à couper le souffle! Les falaises d'Étretat sont vraiment impressionnantes, je vous recommande vivement cette destination.",
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 2156,
                comments: 203,
                shares: 178,
            },
        },
        {
            id: 4,
            author: {
                name: 'Lucas Bernard',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Nature',
            },
            content: {
                title: 'Randonnée dans les Alpes',
                description:
                    "Une journée inoubliable à explorer les sentiers des Alpes. Les paysages de montagne sont à couper le souffle et l'air pur revigore l'esprit.",
                image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 432,
                comments: 56,
                shares: 34,
            },
        },
        {
            id: 5,
            author: {
                name: 'Emma Petit',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Art',
            },
            content: {
                title: 'Nouvelle fresque murale',
                description:
                    "J'ai terminé ma dernière fresque murale dans le centre-ville. Un projet coloré qui m'a permis d'exprimer toute ma créativité!",
                image: 'https://images.unsplash.com/photo-1465101053361-7630c1c470a8?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 678,
                comments: 89,
                shares: 45,
            },
        },
        {
            id: 6,
            author: {
                name: 'Julien Moreau',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Technologie',
            },
            content: {
                title: 'Impression 3D : mon premier prototype',
                description:
                    "Après plusieurs essais, j'ai enfin réussi à imprimer mon premier prototype en 3D. Une expérience enrichissante!",
                image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 234,
                comments: 45,
                shares: 22,
            },
        },
        {
            id: 7,
            author: {
                name: 'Claire Dubreuil',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Mode',
            },
            content: {
                title: 'Défilé printemps-été',
                description:
                    "Retour sur le défilé printemps-été de cette année. Les créations étaient originales et pleines de fraîcheur!",
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 789,
                comments: 102,
                shares: 54,
            },
        },
        {
            id: 8,
            author: {
                name: 'Antoine Lefevre',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Sport',
            },
            content: {
                title: 'Marathon de Paris',
                description:
                    "Fier d'avoir terminé le marathon de Paris cette année! Une expérience intense et inoubliable.",
                image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 345,
                comments: 67,
                shares: 29,
            },
        },
        {
            id: 9,
            author: {
                name: 'Isabelle Girard',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Lecture',
            },
            content: {
                title: 'Coup de cœur littéraire',
                description:
                    "Je viens de finir un roman bouleversant. Je le recommande à tous les amateurs de belles histoires!",
                image: 'https://images.unsplash.com/photo-1465101053361-7630c1c470a8?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 567,
                comments: 78,
                shares: 31,
            },
        },
        {
            id: 10,
            author: {
                name: 'Nicolas Perrot',
                image: '/placeholder.svg?height=40&width=40',
                type: 'Musique',
            },
            content: {
                title: 'Concert en plein air',
                description:
                    "Ambiance incroyable hier soir lors du concert en plein air. Merci à tous ceux qui sont venus partager ce moment!",
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            },
            stats: {
                likes: 890,
                comments: 134,
                shares: 60,
            },
        },
    ];

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (isScrolling) return;

        const container = e.currentTarget;
        const scrollPosition = container.scrollTop;
        const postHeight = container.clientHeight;

        const newIndex = Math.round(scrollPosition / postHeight);

        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < posts.length) {
            setDirection(newIndex > activeIndex ? 1 : -1);
            setActiveIndex(newIndex);

            // Smooth scroll to the exact position of the new post
            setIsScrolling(true);
            container.scrollTo({
                top: newIndex * postHeight,
                behavior: 'smooth',
            });

            // Reset scrolling state after animation completes
            setTimeout(() => {
                setIsScrolling(false);
            }, 500);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' && activeIndex < posts.length - 1) {
                setDirection(1);
                setActiveIndex((prev) => prev + 1);
                containerRef.current?.scrollTo({
                    top: (activeIndex + 1) * containerRef.current.clientHeight,
                    behavior: 'smooth',
                });
            } else if (e.key === 'ArrowUp' && activeIndex > 0) {
                setDirection(-1);
                setActiveIndex((prev) => prev - 1);
                containerRef.current?.scrollTo({
                    top: (activeIndex - 1) * containerRef.current.clientHeight,
                    behavior: 'smooth',
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, posts.length]);

    return (
        <div className="relative flex h-full w-full justify-center ">
            {/* Affichage mobile : barre d'interaction en overlay fixe */}
            {isMobile && (
                <AnimatePresence mode="wait">
                    <div
                        className="fixed z-50 bottom-30 left-2"
                        key={`interaction-container-${activeIndex}`}
                    >
                        <InteractionBar stats={posts[activeIndex].stats} postId={posts[activeIndex].id} isMobile={isMobile} />
                    </div>
                </AnimatePresence>
            )}

            <div
                ref={containerRef}
                className="scrollbar-hide h-[calc(100vh-10rem)] snap-y snap-mandatory overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={handleScroll}
            >
                <AnimatePresence initial={false} mode="wait">
                    {posts.map((post, index) => (
                        <ContentCard
                            key={post.id}
                            post={post}
                            isActive={index === activeIndex}
                            isMobile={isMobile}
                            direction={direction}
                            index={index}
                            // Affichage desktop : interactionBar à droite
                            interactionBar={
                                !isMobile && index === activeIndex ? (
                                    <div className="ml-12 flex-shrink-0 flex flex-col justify-end items-center h-full">
                                        <InteractionBar stats={post.stats} postId={post.id} isMobile={false} />
                                    </div>
                                ) : null
                            }
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
