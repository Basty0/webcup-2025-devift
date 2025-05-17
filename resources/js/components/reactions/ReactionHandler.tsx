import axios from 'axios';
import { useEffect, useState } from 'react';

// Reaction types from migration
export type ReactionType = 'joy' | 'cry' | 'fire' | 'heart' | 'nauseated' | 'clap' | 'angry' | 'surprised';

interface UseReactionProps {
    theendId: number;
    reactionType: ReactionType;
    initialState?: boolean;
    onReactionChange?: (isActive: boolean) => void;
}

/**
 * Hook personnalisé qui gère les réactions sur les posts theend
 * Crée une nouvelle réaction si aucune n'existe, ou modifie celle existante
 */
export default function useReaction({ theendId, reactionType, initialState = false, onReactionChange }: UseReactionProps) {
    const [isActive, setIsActive] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setIsActive(initialState);
    }, [initialState, theendId]);

    const handleReaction = () => {
        if (isProcessing) return;

        const newState = !isActive;
        setIsActive(newState);
        setIsProcessing(true);

        // Notify parent component
        if (onReactionChange) {
            onReactionChange(newState);
        }

        // Send to server using axios
        axios
            .post(`/api/theend/${theendId}/react`, {
                type: reactionType,
            })
            .then(() => {
                console.log(`Reaction ${reactionType} ${newState ? 'added' : 'removed'}`);
                setIsProcessing(false);
            })
            .catch((error) => {
                console.error('Error processing reaction:', error);
                // Revert state on error
                setIsActive(!newState);
                if (onReactionChange) {
                    onReactionChange(!newState);
                }
                setIsProcessing(false);
            });
    };

    return {
        isActive,
        handleReaction,
        processing: isProcessing,
    };
}
