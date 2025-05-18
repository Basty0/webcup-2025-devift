import { Button } from '@/components/ui/button';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollTimeRef = useRef<number>(0);
    const { scrollY } = useScroll({ container: containerRef });

    // Use this to prevent scroll handler from firing too frequently
    const SCROLL_DEBOUNCE_DELAY = 50;
    // Time to prevent new scrolls after a programmatic scroll
    const SCROLL_LOCK_DURATION = 600;

    // Clean up any existing timeout when component unmounts
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Optimized scroll function with better physics
    const scrollToIndex = useCallback(
        (index: number) => {
            if (isScrolling || index < 0 || index >= posts.length) return;

            const now = Date.now();
            if (now - lastScrollTimeRef.current < SCROLL_LOCK_DURATION) return;

            lastScrollTimeRef.current = now;
            setDirection(index > activeIndex ? 1 : -1);
            setActiveIndex(index);
            setIsScrolling(true);

            // Use the scroll container's height for precise positioning
            const container = containerRef.current;
            if (container) {
                const targetPosition = index * container.clientHeight;

                // Smooth scroll with enhanced easing
                container.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });

                // Reset the scrolling state after animation completes
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    setIsScrolling(false);
                }, SCROLL_LOCK_DURATION);
            }
        },
        [activeIndex, isScrolling, posts.length],
    );

    // Use framer-motion's scrollY to detect scroll changes precisely
    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (isScrolling || !containerRef.current) return;

        const now = Date.now();
        // Skip if we recently had a programmatic scroll
        if (now - lastScrollTimeRef.current < SCROLL_LOCK_DURATION) return;

        const container = containerRef.current;
        const postHeight = container.clientHeight;
        // Use the scroll position to determine which post is in view
        const newIndex = Math.round(latest / postHeight);

        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < posts.length) {
            setDirection(newIndex > activeIndex ? 1 : -1);
            setActiveIndex(newIndex);
        }
    });

    // Optimized scroll handler with debouncing
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (isScrolling) return;

        const now = Date.now();
        if (now - lastScrollTimeRef.current < SCROLL_LOCK_DURATION) return;

        // Use debouncing to improve performance
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const container = e.currentTarget;
            const scrollPosition = container.scrollTop;
            const postHeight = container.clientHeight;

            // Calculate nearest post index
            const newIndex = Math.round(scrollPosition / postHeight);

            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < posts.length) {
                setDirection(newIndex > activeIndex ? 1 : -1);
                setActiveIndex(newIndex);

                // Snap precisely to the nearest post after manual scrolling
                lastScrollTimeRef.current = now;
                setIsScrolling(true);

                container.scrollTo({
                    top: newIndex * postHeight,
                    behavior: 'smooth',
                });

                setTimeout(() => {
                    setIsScrolling(false);
                }, SCROLL_LOCK_DURATION);
            }
        }, SCROLL_DEBOUNCE_DELAY);
    };

    // Keyboard navigation with optimized handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' && activeIndex < posts.length - 1) {
                e.preventDefault(); // Prevent default scrolling
                scrollToIndex(activeIndex + 1);
            } else if (e.key === 'ArrowUp' && activeIndex > 0) {
                e.preventDefault(); // Prevent default scrolling
                scrollToIndex(activeIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, posts.length, scrollToIndex]);

    // Handle wheel events for better scroll control
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Don't intercept if already scrolling
            if (isScrolling) return;

            const now = Date.now();
            if (now - lastScrollTimeRef.current < SCROLL_LOCK_DURATION) return;

            // Detect direction and scroll one post at a time
            if (e.deltaY > 50 && activeIndex < posts.length - 1) {
                e.preventDefault();
                scrollToIndex(activeIndex + 1);
            } else if (e.deltaY < -50 && activeIndex > 0) {
                e.preventDefault();
                scrollToIndex(activeIndex - 1);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [activeIndex, isScrolling, posts.length, scrollToIndex]);

    return (
        <div className="relative flex h-full w-full justify-center">
            {/* Affichage mobile : barre d'interaction en overlay fixe */}
            {isMobile && (
                <AnimatePresence mode="sync">
                    <motion.div
                        className="fixed bottom-30 left-2 z-50"
                        key={`interaction-container-${activeIndex}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                        <InteractionBar
                            stats={posts[activeIndex].stats}
                            postId={posts[activeIndex].id}
                            slug={posts[activeIndex].slug}
                            isMobile={isMobile}
                            userReaction={posts[activeIndex].user_reaction}
                        />
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Desktop navigation buttons */}
            {!isMobile && (
                <motion.div
                    className="fixed top-1/3 right-8 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
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
            )}

            <div
                ref={containerRef}
                className="scrollbar-hide h-[calc(100vh)] snap-y snap-mandatory overflow-y-scroll overscroll-y-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={handleScroll}
                style={{ WebkitOverflowScrolling: 'touch' }}
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
                                    <motion.div
                                        className="mb-90 ml-12 flex h-full flex-shrink-0 flex-col items-center justify-end"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.2 }}
                                    >
                                        <InteractionBar
                                            stats={post.stats}
                                            postId={post.id}
                                            slug={post.slug}
                                            isMobile={false}
                                            userReaction={post.user_reaction}
                                        />
                                    </motion.div>
                                ) : null
                            }
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
