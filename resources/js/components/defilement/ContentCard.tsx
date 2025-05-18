import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    // Animations variants
    const cardVariants = {
        hidden: (direction: number) => ({
            y: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        },
        exit: (direction: number) => ({
            y: direction > 0 ? -100 : 100,
            opacity: 0,
            transition: {
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }),
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const imageVariants = {
        hidden: { scale: 1.1, filter: 'blur(8px)' },
        visible: {
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
        exit: {
            scale: 0.95,
            filter: 'blur(8px)',
            transition: {
                duration: 0.4,
                ease: 'easeIn',
            },
        },
    };

    return (
        <motion.div
            key={post.id}
            className={`relative flex h-full w-full snap-start snap-always ${isMobile ? 'flex-col' : 'items-center justify-center'}`}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            exit="exit"
            variants={cardVariants}
            custom={direction}
        >
            {/* Background Image with Animation */}
            <motion.div className="absolute inset-0 z-0 overflow-hidden" variants={imageVariants}>
                {isMobile ? (
                    <Image
                        src={post.content.image || '/placeholder.svg'}
                        alt={post.content.title}
                        fill
                        className="object-cover brightness-[0.85]"
                        priority={index === 0}
                    />
                ) : (
                    <Image
                        src={post.content.image || '/placeholder.svg'}
                        alt={post.content.title}
                        className="h-full w-full object-cover brightness-[0.85]"
                        priority={index === 0}
                    />
                )}
            </motion.div>

            {/* Overlay for better readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>

            {/* Content + InteractionBar (desktop) */}
            <div
                className={`relative z-10 w-full ${
                    isMobile ? 'flex h-full flex-col justify-between' : 'mx-auto flex h-full max-w-5xl flex-row items-center justify-between'
                }`}
            >
                {/* Bloc principal (texte, auteur) */}
                <div className={isMobile ? 'flex h-full flex-col justify-between' : 'flex h-full flex-col justify-between'}>
                    {/* Header - Publicateur (Always at the top) */}
                    <motion.div className="p-4" variants={contentVariants}>
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
                        <motion.div className={`${isMobile ? 'ml-16 px-4' : 'mb-6 max-w-2xl px-8 pb-10'}`} variants={contentVariants}>
                            <motion.h2 className="mb-2 text-2xl font-bold text-white" variants={itemVariants}>
                                {post.content.title}
                            </motion.h2>
                            <motion.p className="line-clamp-2 text-sm text-white/90 md:text-base" variants={itemVariants}>
                                {post.content.description}
                            </motion.p>
                            <motion.div className="mt-4" variants={itemVariants}>
                                <Link href={`/theend/${post.slug}`}>
                                    <Button variant="outline" className="group border-white/20 bg-black/30 text-white hover:bg-white/10">
                                        Voir la page
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
