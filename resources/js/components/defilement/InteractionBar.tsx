import ShareModal from '@/components/share/ShareModal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
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

    useEffect(() => {
        setCommentCount(stats.comments);
        setViewCount(stats.views);
        setTotalReactions(stats.total_reactions || 0);
        setCurrentReaction(userReaction);
    }, [stats, userReaction]);

    const handleSelectReaction = (type: ReactionType) => {
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

        // Envoyer au serveur
        axios
            .get(`/reaction/${postId}/react`, {
                params: {
                    type: type,
                },
            })
            .catch((error) => {
                console.error('Error processing reaction:', error);
                setCurrentReaction(currentReaction);

                // Revert total reactions count on error
                if (!currentReaction) {
                    setTotalReactions((prev) => prev - 1);
                }
            });
    };

    const handleComment = () => {
        window.location.href = `/theend/${slug}`;
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
    };

    const countVariants = {
        initial: { opacity: 0, y: -10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: { duration: 0.2 },
        },
    };

    return (
        <>
            <motion.div
                className={`flex flex-col items-center gap-${isMobile ? '3' : '6'} bg-background/30 rounded-full p-${isMobile ? '2' : '4'} py-${isMobile ? '4' : '6'} backdrop-blur-md`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`interaction-bar-${postId}`}
            >
                {/* Views counter */}
                <motion.div className="flex flex-col items-center" variants={itemVariants}>
                    <div
                        className={`flex items-center justify-center rounded-full ${interactionColors.views} transition-all duration-200 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                    >
                        <Eye className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                    </div>
                    <AnimatePresence mode="sync">
                        <motion.span
                            key={`views-${viewCount}`}
                            className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={countVariants}
                        >
                            {viewCount}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Comment button */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                        className={`flex items-center justify-center rounded-full ${interactionColors.comments} transition-all duration-200 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                        onClick={handleComment}
                    >
                        <MessageCircle className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                    </button>
                    <AnimatePresence mode="sync">
                        <motion.span
                            key={`comments-${commentCount}`}
                            className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={countVariants}
                        >
                            {commentCount}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Share button */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                        className={`flex items-center justify-center rounded-full ${interactionColors.share} transition-all duration-200 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                        onClick={() => setIsShareModalOpen(true)}
                    >
                        <Share2 className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                    </button>
                    <span className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Partager</span>
                </motion.div>

                {/* Reaction button */}
                <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                        className={`relative flex items-center justify-center rounded-full ${
                            currentReaction ? reactionColors[currentReaction] : interactionColors.default
                        } ${isMobile ? 'h-8 w-8' : 'h-12 w-12'} z-40 transition-all duration-200`}
                        onClick={() => setIsReactionModalOpen(true)}
                    >
                        {currentReaction ? (
                            React.cloneElement(reactionIcons[currentReaction], {
                                className: `${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`,
                            } as React.HTMLAttributes<SVGElement>)
                        ) : (
                            <ThumbsUp className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                        )}
                    </button>
                    <AnimatePresence mode="sync">
                        <motion.div className="flex flex-col items-center" initial="initial" animate="animate" exit="exit" variants={countVariants}>
                            <motion.span
                                key={`total-reactions-${totalReactions}`}
                                className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                            >
                                {totalReactions}
                            </motion.span>
                            <span className={`font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                                {currentReaction ? 'Changer' : 'Réagir'}
                            </span>
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

                    <div className="grid grid-cols-4 gap-4">
                        {(Object.keys(reactionIcons) as ReactionType[]).map((type) => (
                            <motion.button
                                key={type}
                                className={`flex flex-col items-center rounded-xl p-3 text-white transition-colors ${
                                    currentReaction === type ? 'ring-2 ring-white' : ''
                                } ${reactionColors[type]}`}
                                onClick={() => handleSelectReaction(type)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div whileHover={{ y: -5 }}>{reactionIcons[type]}</motion.div>
                                <span className="mt-2 text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            </motion.button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Share Modal */}
            <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={slug} />
        </>
    );
}
