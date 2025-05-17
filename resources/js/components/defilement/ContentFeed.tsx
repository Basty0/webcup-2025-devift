import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { type ReactionType } from '../reactions/ReactionHandler';
import ContentCard from './ContentCard';
import InteractionBar from './InteractionBar';

// Types
export interface Author {
    id: number;
    name: string;
    image: string;
    type: string;
}

export interface Content {
    title: string;
    description: string;
    image: string;
    tone: string;
}

export interface Stats {
    likes: number;
    comments: number;
    shares: number;
    total_reactions: number;
    views: number;
}

export interface Post {
    id: number;
    slug: string;
    author: Author;
    content: Content;
    stats: Stats;
    created_at: string;
    user_reaction?: ReactionType | null;
}

interface ContentFeedProps {
    isMobile: boolean;
    posts: Post[];
}

export default function ContentFeed({ isMobile, posts }: ContentFeedProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollToIndex = (index: number) => {
        if (isScrolling || index < 0 || index >= posts.length) return;

        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
        setIsScrolling(true);

        containerRef.current?.scrollTo({
            top: index * (containerRef.current.clientHeight || 0),
            behavior: 'smooth',
        });

        setTimeout(() => {
            setIsScrolling(false);
        }, 500);
    };

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

            setTimeout(() => {
                setIsScrolling(false);
            }, 500);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' && activeIndex < posts.length - 1) {
                scrollToIndex(activeIndex + 1);
            } else if (e.key === 'ArrowUp' && activeIndex > 0) {
                scrollToIndex(activeIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, posts.length]);

    return (
        <div className="relative flex h-full w-full justify-center">
            {/* Affichage mobile : barre d'interaction en overlay fixe */}
            {isMobile && (
                <AnimatePresence mode="sync">
                    <div className="fixed bottom-30 left-2 z-50" key={`interaction-container-${activeIndex}`}>
                        <InteractionBar
                            stats={posts[activeIndex].stats}
                            postId={posts[activeIndex].id}
                            slug={posts[activeIndex].slug}
                            isMobile={isMobile}
                            userReaction={posts[activeIndex].user_reaction}
                        />
                    </div>
                </AnimatePresence>
            )}

            {/* Desktop navigation buttons */}
            {!isMobile && (
                <>
                    <motion.div className="fixed top-1/3 right-8 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="mb-4 h-12 w-12 rounded-full border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-white/10"
                            onClick={() => scrollToIndex(activeIndex - 1)}
                            disabled={activeIndex <= 0 || isScrolling}
                            aria-label="Scroll up"
                        >
                            <ChevronUp className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-white/10"
                            onClick={() => scrollToIndex(activeIndex + 1)}
                            disabled={activeIndex >= posts.length - 1 || isScrolling}
                            aria-label="Scroll down"
                        >
                            <ChevronDown className="h-6 w-6" />
                        </Button>
                    </motion.div>
                </>
            )}

            <div
                ref={containerRef}
                className="scrollbar-hide h-[calc(100vh-6rem)] snap-y snap-mandatory overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={handleScroll}
            >
                <AnimatePresence initial={false} mode="sync">
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
                                    <div className="mb-90 ml-12 flex h-full flex-shrink-0 flex-col items-center justify-end">
                                        <InteractionBar
                                            stats={post.stats}
                                            postId={post.id}
                                            slug={post.slug}
                                            isMobile={false}
                                            userReaction={post.user_reaction}
                                        />
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
