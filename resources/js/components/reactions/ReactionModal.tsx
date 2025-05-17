import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Angry, Award, Flame, Frown, Heart, SmilePlus, ThumbsUp, Zap } from 'lucide-react';
import { useState } from 'react';
import { type ReactionType } from './ReactionHandler';

interface ReactionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectReaction: (type: ReactionType) => void;
}

const reactionIcons: Record<ReactionType, React.ReactNode> = {
    heart: <Heart className="h-8 w-8" />,
    fire: <Flame className="h-8 w-8" />,
    joy: <SmilePlus className="h-8 w-8" />,
    cry: <Frown className="h-8 w-8" />,
    nauseated: <Zap className="h-8 w-8" />,
    clap: <Award className="h-8 w-8" />,
    angry: <Angry className="h-8 w-8" />,
    surprised: <ThumbsUp className="h-8 w-8" />,
};

const reactionLabels: Record<ReactionType, string> = {
    heart: 'Amour',
    fire: 'Feu',
    joy: 'Joie',
    cry: 'Tristesse',
    nauseated: 'Dégoût',
    clap: 'Applaudissement',
    angry: 'Colère',
    surprised: 'Surprise',
};

const reactionColors: Record<ReactionType, string> = {
    heart: 'bg-pink-500 hover:bg-pink-600',
    fire: 'bg-orange-500 hover:bg-orange-600',
    joy: 'bg-yellow-500 hover:bg-yellow-600',
    cry: 'bg-blue-500 hover:bg-blue-600',
    nauseated: 'bg-green-500 hover:bg-green-600',
    clap: 'bg-purple-500 hover:bg-purple-600',
    angry: 'bg-red-500 hover:bg-red-600',
    surprised: 'bg-indigo-500 hover:bg-indigo-600',
};

export default function ReactionModal({ open, onOpenChange, onSelectReaction }: ReactionModalProps) {
    const [hoveredReaction, setHoveredReaction] = useState<ReactionType | null>(null);

    const handleReactionClick = (type: ReactionType) => {
        onSelectReaction(type);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Choisir une réaction</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-4 gap-4">
                    {(Object.keys(reactionIcons) as ReactionType[]).map((type) => (
                        <Button
                            key={type}
                            variant="ghost"
                            className={`flex h-auto flex-col items-center rounded-xl p-3 text-white transition-colors ${reactionColors[type]}`}
                            onClick={() => handleReactionClick(type)}
                            onMouseEnter={() => setHoveredReaction(type)}
                            onMouseLeave={() => setHoveredReaction(null)}
                        >
                            <motion.div
                                animate={{
                                    y: hoveredReaction === type ? -5 : 0,
                                    rotate: hoveredReaction === type ? [0, -5, 5, -5, 5, 0] : 0,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {reactionIcons[type]}
                            </motion.div>
                            <span className="mt-2 text-xs font-medium">{reactionLabels[type]}</span>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
