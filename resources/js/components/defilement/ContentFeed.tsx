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
                image: '/placeholder.svg?height=600&width=800',
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
                image: '/placeholder.svg?height=600&width=800',
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
                image: '/placeholder.svg?height=600&width=800',
            },
            stats: {
                likes: 2156,
                comments: 203,
                shares: 178,
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
        <div className="relative flex h-full w-full justify-center">
            {/* Barre d'interaction fixe avec animation lors du changement de contenu */}
            <AnimatePresence mode="wait">
                <div
                    className={`fixed z-50 ${isMobile ? 'bottom-30 left-6' : 't left-6 -translate-y-1/2 transform'}`}
                    key={`interaction-container-${activeIndex}`}
                >
                    <InteractionBar stats={posts[activeIndex].stats} postId={posts[activeIndex].id} isMobile={isMobile} />
                </div>
            </AnimatePresence>

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
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
