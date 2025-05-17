'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

interface Post {
    id: string | number;
    author: {
        name: string;
        type: string;
        image?: string;
    };
    content: {
        title: string;
        description: string;
        image?: string;
    };
}

interface ContentCardProps {
    post: Post;
    isActive: boolean;
    isMobile: boolean;
    direction: number;
    index: number;
}

export default function ContentCard({ post, isActive, isMobile, direction, index }: ContentCardProps) {
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
            <motion.div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden" variants={imageVariants}>
                <Image
                    src={post.content.image || '/placeholder.svg'}
                    alt={post.content.title}
                    fill
                    className={`rounded-2xl object-cover brightness-[0.85] ${isMobile ? '' : 'md:object-contain'}`}
                    priority={index === 0}
                />
            </motion.div>

            {/* Overlay for better readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>

            {/* Content Container */}
            <div
                className={`relative z-10 w-full ${
                    isMobile ? 'flex h-full flex-col justify-between' : 'mx-auto flex h-full max-w-4xl flex-col justify-between'
                }`}
            >
                {/* Header - Publicateur */}
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

                {/* Main Content */}
                <div className="relative mb-8 flex justify-center">
                    {/* Content Text (Main) - Centré avec un espace à gauche pour la barre d'interaction fixe */}
                    <motion.div className={`${isMobile ? 'ml-12 px-4' : 'max-w-2xl px-8'}`} variants={contentVariants}>
                        <motion.h2 className="mb-2 text-2xl font-bold text-white" variants={itemVariants}>
                            {post.content.title}
                        </motion.h2>
                        <motion.p className="text-sm text-white/90 md:text-base" variants={itemVariants}>
                            {post.content.description}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
