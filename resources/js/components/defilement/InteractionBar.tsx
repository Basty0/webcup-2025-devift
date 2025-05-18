import ShareModal from '@/components/share/ShareModal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { Angry, Award, Eye, Flame, Frown, Heart, MessageCircle, Share2, SmilePlus, ThumbsUp, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { type ReactionType } from '../reactions/ReactionHandler';
import { type Stats } from './ContentFeed';

interface InteractionBarProps {
    stats: Stats;
    postId: number;
    slug: string;
    isMobile?: boolean;
    userReaction?: ReactionType | null;
}

// Configuration des icônes de réaction
const reactionIcons: Record<ReactionType, React.ReactElement> = {
    heart: <Heart className="h-8 w-8" />,
    fire: <Flame className="h-8 w-8" />,
    joy: <SmilePlus className="h-8 w-8" />,
    cry: <Frown className="h-8 w-8" />,
    nauseated: <Zap className="h-8 w-8" />,
    clap: <Award className="h-8 w-8" />,
    angry: <Angry className="h-8 w-8" />,
    surprised: <ThumbsUp className="h-8 w-8" />,
};

const reactionColors: Record<ReactionType, string> = {
    heart: 'bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700',
    fire: 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700',
    joy: 'bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700',
    cry: 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    nauseated: 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700',
    clap: 'bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700',
    angry: 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700',
    surprised: 'bg-gradient-to-br from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700',
};

// Couleurs pour les boutons d'interaction
const interactionColors = {
    views: 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    comments: 'bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700',
    share: 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700',
    default: 'bg-gradient-to-br from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700',
};

export default function InteractionBar({ stats, postId, slug, isMobile = false, userReaction = null }: InteractionBarProps) {
    const [commentCount, setCommentCount] = useState(stats.comments);
    const [viewCount, setViewCount] = useState(stats.views);
    const [totalReactions, setTotalReactions] = useState(stats.total_reactions || 0);
    const [isReactionModalOpen, setIsReactionModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(userReaction);
    const [scope, animate] = useAnimate();

    useEffect(() => {
        setCommentCount(stats.comments);
        setViewCount(stats.views);
        setTotalReactions(stats.total_reactions || 0);
        setCurrentReaction(userReaction);
    }, [stats, userReaction]);

    // Add animation when reaction changes
    useEffect(() => {
        if (currentReaction) {
            animate(scope.current, { scale: [1.2, 1] }, { duration: 0.4, type: 'spring', stiffness: 400, damping: 10 });
        }
    }, [currentReaction, animate, scope]);

    const handleSelectReaction = async (type: ReactionType) => {
        const isCurrentlyActive = currentReaction === type;

        // Si c'est la même réaction, on ne fait rien
        if (isCurrentlyActive) {
            setIsReactionModalOpen(false);
            return;
        }

        // Mettre à jour l'état immédiatement pour une UI réactive
        setCurrentReaction(type);
        setIsReactionModalOpen(false);

        // Update total reactions count
        if (!currentReaction) {
            setTotalReactions((prev) => prev + 1);
        }

        // Animation for the reaction change
        animate(scope.current, { scale: [1.2, 1] }, { duration: 0.4, type: 'spring', stiffness: 400, damping: 10 });

        // Envoyer au serveur
        try {
            await axios.get(`/reaction/${postId}/react`, {
                params: {
                    type: type,
                },
            });
        } catch (error) {
            console.error('Error processing reaction:', error);
            setCurrentReaction(currentReaction);

            // Revert total reactions count on error
            if (!currentReaction) {
                setTotalReactions((prev) => prev - 1);
            }
        }
    };

    const handleComment = () => {
        window.location.href = `/theend/${slug}`;
    };

    // Enhanced TikTok-like animation variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                type: 'spring',
                stiffness: 400,
                damping: 25,
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.8, // Lower mass makes motion more responsive
            },
        },
        exit: {
            opacity: 0,
            y: 10,
            scale: 0.9,
            transition: { duration: 0.2 },
        },
        hover: {
            scale: 1.1,
            y: -5,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.9,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const countVariants = {
        initial: {
            opacity: 0,
            y: -10,
            scale: 0.8,
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 20,
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            y: 10,
            scale: 0.8,
            transition: { duration: 0.2 },
        },
    };

    // Button animations for react dialogue
    const buttonVariants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 20,
            },
        },
        hover: {
            scale: 1.05,
            y: -3,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 },
        },
        exit: {
            scale: 0.9,
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    return (
        <>
            <motion.div
                className={`flex flex-col items-center gap-${isMobile ? '3' : '6'} bg-background/40 rounded-full shadow-xl backdrop-saturate-150 p-${isMobile ? '2' : '4'} py-${isMobile ? '4' : '6'} backdrop-blur-lg`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={`interaction-bar-${postId}`}
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Views counter */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover="hover" whileTap="tap">
                    <motion.div
                        className={`flex items-center justify-center rounded-full ${interactionColors.views} shadow-lg transition-colors ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                        whileHover={{ boxShadow: '0 0 15px rgba(0, 87, 255, 0.6)' }}
                    >
                        <Eye className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                    </motion.div>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={`views-${viewCount}`}
                            className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={countVariants}
                            layoutId={`views-label-${postId}`}
                        >
                            {viewCount}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Comment button */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover="hover" whileTap="tap">
                    <motion.button
                        className={`flex items-center justify-center rounded-full ${interactionColors.comments} shadow-lg transition-colors ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                        onClick={handleComment}
                        whileHover={{ boxShadow: '0 0 15px rgba(128, 0, 255, 0.6)' }}
                    >
                        <MessageCircle className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                    </motion.button>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={`comments-${commentCount}`}
                            className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={countVariants}
                            layoutId={`comments-label-${postId}`}
                        >
                            {commentCount}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Share button */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover="hover" whileTap="tap">
                    <motion.button
                        className={`flex items-center justify-center rounded-full ${interactionColors.share} shadow-lg transition-colors ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                        onClick={() => setIsShareModalOpen(true)}
                        whileHover={{ boxShadow: '0 0 15px rgba(0, 200, 81, 0.6)' }}
                    >
                        <Share2 className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                    </motion.button>
                    <motion.span className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`} variants={countVariants}>
                        Partager
                    </motion.span>
                </motion.div>

                {/* Reaction button */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover="hover" whileTap="tap" ref={scope}>
                    <motion.button
                        className={`relative flex items-center justify-center rounded-full ${
                            currentReaction ? reactionColors[currentReaction] : interactionColors.default
                        } ${isMobile ? 'h-8 w-8' : 'h-12 w-12'} z-40 shadow-lg transition-colors`}
                        onClick={() => setIsReactionModalOpen(true)}
                        whileHover={{
                            boxShadow: currentReaction ? '0 0 15px rgba(255, 100, 100, 0.6)' : '0 0 15px rgba(255, 46, 99, 0.6)',
                        }}
                    >
                        {currentReaction ? (
                            React.cloneElement(reactionIcons[currentReaction], {
                                className: `${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`,
                            } as React.HTMLAttributes<SVGElement>)
                        ) : (
                            <ThumbsUp className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                        )}
                    </motion.button>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            className="flex flex-col items-center"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={countVariants}
                            layoutId={`reaction-label-${postId}`}
                        >
                            <motion.span
                                key={`total-reactions-${totalReactions}`}
                                className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                            >
                                {totalReactions}
                            </motion.span>
                            <motion.span
                                className={`font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                                animate={{
                                    scale: currentReaction ? [1, 1.1, 1] : 1,
                                    transition: {
                                        repeat: currentReaction ? 1 : 0,
                                        duration: 0.5,
                                    },
                                }}
                            >
                                {currentReaction ? 'Changer' : 'Réagir'}
                            </motion.span>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Reaction selection dialog */}
            <Dialog open={isReactionModalOpen} onOpenChange={setIsReactionModalOpen}>
                <DialogContent className="border-none bg-gray-900/95 px-6 py-10 text-white backdrop-blur-xl">
                    <DialogTitle className="mb-6 text-center text-2xl font-bold text-white">
                        {currentReaction ? 'Changer de réaction' : 'Choisir une réaction'}
                    </DialogTitle>

                    <motion.div
                        className="grid grid-cols-4 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
                    >
                        {(Object.keys(reactionIcons) as ReactionType[]).map((type) => (
                            <motion.button
                                key={type}
                                className={`flex flex-col items-center rounded-xl p-3 text-white transition-colors ${
                                    currentReaction === type ? 'ring-2 ring-white' : ''
                                } ${reactionColors[type]}`}
                                onClick={() => handleSelectReaction(type)}
                                variants={buttonVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <motion.div
                                    animate={{
                                        y: currentReaction === type ? [0, -5, 0] : 0,
                                    }}
                                    transition={{
                                        repeat: currentReaction === type ? Infinity : 0,
                                        duration: 1.5,
                                        repeatType: 'mirror',
                                    }}
                                >
                                    {reactionIcons[type]}
                                </motion.div>
                                <span className="mt-2 text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Share Modal */}
            <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={slug} />
        </>
    );
}
