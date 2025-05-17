import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Stats } from './ContentFeed';

interface InteractionBarProps {
    stats: Stats;
    postId: number;
    isMobile?: boolean;
}

export default function InteractionBar({ stats, postId, isMobile = false }: InteractionBarProps) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(stats.likes);
    const [commentCount, setCommentCount] = useState(stats.comments);
    const [shareCount, setShareCount] = useState(stats.shares);

    // Réinitialiser les états lorsque le postId change
    useEffect(() => {
        setLiked(false);
        setBookmarked(false);
        setLikeCount(stats.likes);
        setCommentCount(stats.comments);
        setShareCount(stats.shares);
    }, [postId, stats]);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
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
        <motion.div
            className={`flex flex-col items-center gap-${isMobile ? '3' : '6'} rounded-full bg-gray-300/70 p-${isMobile ? '2' : '4'} py-${isMobile ? '4' : '6'} backdrop-blur-md`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`interaction-bar-${postId}`}
        >
            <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button
                    className={`flex items-center justify-center rounded-full bg-gray-800 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                    onClick={handleLike}
                >
                    <Heart className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} ${liked ? 'fill-white text-white' : 'text-white'}`} />
                </button>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`likes-${likeCount}`}
                        className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={countVariants}
                    >
                        {likeCount}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button className={`flex items-center justify-center rounded-full bg-gray-800 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}>
                    <MessageCircle className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                </button>
                <AnimatePresence mode="wait">
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

            <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button className={`flex items-center justify-center rounded-full bg-gray-800 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}>
                    <Share2 className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
                </button>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`shares-${shareCount}`}
                        className={`mt-1 font-medium text-white ${isMobile ? 'text-[10px]' : 'text-xs'}`}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={countVariants}
                    >
                        {shareCount}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            <motion.div className="flex flex-col items-center" variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button
                    className={`flex items-center justify-center rounded-full bg-gray-800 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}
                    onClick={() => setBookmarked(!bookmarked)}
                >
                    <Bookmark className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} ${bookmarked ? 'fill-white text-white' : 'text-white'}`} />
                </button>
            </motion.div>
        </motion.div>
    );
}
