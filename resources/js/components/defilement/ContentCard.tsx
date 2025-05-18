import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface Post {
    id: number | string;
    slug: string;
    author: {
        id: number;
        name: string;
        type: string;
        image?: string;
    };
    content: {
        title: string;
        description: string;
        image?: string;
        tone: string;
    };
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
    created_at: string;
}

interface ContentCardProps {
    post: Post;
    isActive: boolean;
    isMobile: boolean;
    direction: number;
    index: number;
    interactionBar?: React.ReactNode;
}

export default function ContentCard({ post, isActive, isMobile, direction, index, interactionBar }: ContentCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.3 });

    // Enhanced animation variants with better physics
    const cardVariants = {
        hidden: (direction: number) => ({
            y: direction > 0 ? '5%' : '-5%',
            opacity: 0,
        }),
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { type: 'spring', stiffness: 400, damping: 30 },
                opacity: { duration: 0.4 },
            },
        },
        exit: (direction: number) => ({
            y: direction > 0 ? '-5%' : '5%',
            opacity: 0,
            transition: {
                y: { type: 'spring', stiffness: 400, damping: 30 },
                opacity: { duration: 0.3 },
            },
        }),
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier for smooth motion
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for TikTok-like feel
            },
        },
    };

    // Optimized image animations with proper preloading
    const imageVariants = {
        hidden: { scale: 1.05, filter: 'blur(8px)' },
        visible: {
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0], // Custom easing
            },
        },
        exit: {
            scale: 0.98,
            filter: 'blur(4px)',
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    return (
        <motion.div
            ref={cardRef}
            key={post.id}
            className={`relative flex h-full w-full snap-start snap-always ${isMobile ? 'flex-col' : 'items-center justify-center'}`}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            exit="exit"
            variants={cardVariants}
            custom={direction}
            layoutId={`post-${post.id}`}
        >
            {/* Background Image with Animation */}
            <motion.div className="absolute inset-0 z-0 overflow-hidden" variants={imageVariants} style={{ willChange: 'transform, filter' }}>
                {isMobile ? (
                    <Image
                        src={post.content.image || '/placeholder.svg'}
                        alt={post.content.title}
                        fill
                        className="object-cover brightness-[0.85]"
                        priority={index < 3} // Prioritize loading first 3 items
                        sizes="100vw"
                        loading={index < 3 ? 'eager' : 'lazy'}
                    />
                ) : (
                    <Image
                        src={post.content.image || '/placeholder.svg'}
                        alt={post.content.title}
                        className="h-full w-full object-cover brightness-[0.85]"
                        priority={index < 3} // Prioritize loading first 3 items
                        sizes="100vw"
                        loading={index < 3 ? 'eager' : 'lazy'}
                    />
                )}
            </motion.div>

            {/* Enhanced overlay gradient for better readability */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isActive ? 0.7 : 0.9 }}
                transition={{ duration: 0.5 }}
            ></motion.div>

            {/* Content + InteractionBar (desktop) */}
            <div
                className={`relative z-10 w-full ${
                    isMobile ? 'flex h-full flex-col justify-between' : 'mx-auto flex h-full max-w-5xl flex-row items-center justify-between'
                }`}
            >
                {/* Bloc principal (texte, auteur) */}
                <div className={isMobile ? 'flex h-full flex-col justify-between' : 'flex h-full flex-col justify-between'}>
                    {/* Header - Publicateur (Always at the top) */}
                    <motion.div className="p-4" variants={contentVariants} initial="hidden" animate={isActive && isInView ? 'visible' : 'hidden'}>
                        <motion.div className="flex items-center gap-3" variants={itemVariants}>
                            <Avatar className="h-10 w-10 border-2 border-white">
                                <AvatarImage src={post.author.image || '/placeholder.svg'} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-white">{post.author.name}</h3>
                                <p className="text-xs text-white/80">{post.author.type}</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Main Content (Moved to bottom) */}
                    <div className="mb-20 flex justify-start">
                        {/* Content Text (Main) - Centré avec un espace à gauche pour la barre d'interaction fixe */}
                        <motion.div
                            className={`${isMobile ? 'ml-16 px-4' : 'mb-6 max-w-2xl px-8 pb-10'}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate={isActive && isInView ? 'visible' : 'hidden'}
                        >
                            <motion.h2 className="mb-2 text-2xl font-bold text-white" variants={itemVariants}>
                                {post.content.title}
                            </motion.h2>
                            <motion.p className="line-clamp-2 text-sm text-white/90 md:text-base" variants={itemVariants}>
                                {post.content.description}
                            </motion.p>
                            <motion.div className="mt-4" variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link href={`/theend/${post.slug}`}>
                                    <Button
                                        variant="outline"
                                        className="group border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/10"
                                    >
                                        Voir la page
                                        <motion.span
                                            animate={{ x: isActive ? [0, 3, 0] : 0 }}
                                            transition={{
                                                repeat: isActive ? Infinity : 0,
                                                repeatDelay: 2,
                                                duration: 1,
                                            }}
                                        >
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </motion.span>
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                {/* Affichage de la barre d'interaction à droite sur desktop */}
                {!isMobile && interactionBar}
            </div>
        </motion.div>
    );
}
