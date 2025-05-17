import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

// Type de réaction valide selon la migration
export type ReactionType = 'joy' | 'cry' | 'fire' | 'heart' | 'nauseated' | 'clap' | 'angry' | 'surprised';

interface SimpleReactionProps {
    theendId: number;
    initialReactions: number;
    isLiked: boolean;
    reactionType: ReactionType;
}

export default function SimpleReactionHandler({ theendId, initialReactions, isLiked: initialIsLiked, reactionType }: SimpleReactionProps) {
    const [reactions, setReactions] = useState(initialReactions);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleReact = () => {
        if (isProcessing) return;

        // Mise à jour optimiste
        setIsLiked(!isLiked);
        setReactions((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsProcessing(true);

        axios
            .post(`/api/theend/${theendId}/react`, {
                type: reactionType,
            })
            .then(() => {
                // Recharger uniquement les données du theend
                router.reload({ only: ['theend'] });
                setIsProcessing(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la réaction:', error);
                // Revenir à l'état précédent en cas d'erreur
                setIsLiked(isLiked);
                setReactions(reactions);
                setIsProcessing(false);
            });
    };

    return (
        <div className="flex flex-col items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${isLiked ? 'bg-pink-100 text-pink-500' : ''}`}
                    onClick={handleReact}
                    disabled={isProcessing}
                >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
            </motion.div>
            <AnimatePresence mode="wait">
                <motion.span
                    key={reactions}
                    className="mt-1 text-sm font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    {reactions}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
