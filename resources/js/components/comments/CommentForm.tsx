import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { Page } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CommentList from './CommentList';

interface User {
    id: number;
    name: string;
    avatar_url: string | null;
}

interface Comment {
    id: number;
    content: string;
    user: User;
    created_at: string;
}

interface CommentFormProps {
    theendSlug: string;
    comments: Comment[];
    cardClass?: string;
    headingClass?: string;
    textClass?: string;
}

interface CommentPageProps {
    comment?: Comment;
    [key: string]: unknown;
}

interface ValidationErrors {
    content?: string;
    [key: string]: string | undefined;
}

export default function CommentForm({ theendSlug, comments: initialComments, cardClass, headingClass, textClass }: CommentFormProps) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.content.trim()) {
            toast.error('Le commentaire ne peut pas être vide');
            return;
        }

        setIsSubmitting(true);

        try {
            post(`/theend/${theendSlug}/comment`, {
                onSuccess: (page: Page<CommentPageProps>) => {
                    const newComment = page.props.comment;
                    if (newComment) {
                        // Validate the comment data before adding it
                        if (newComment.id && newComment.content && newComment.user && newComment.user.name) {
                            setComments((prevComments) => [newComment, ...prevComments]);
                            reset('content');
                            toast.success('Commentaire ajouté avec succès');
                        } else {
                            throw new Error('Invalid comment data received from server');
                        }
                    }
                },
                onError: (errors: ValidationErrors) => {
                    if (errors.content) {
                        toast.error(errors.content);
                    } else {
                        toast.error("Une erreur est survenue lors de l'ajout du commentaire");
                    }
                },
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
            toast.error("Une erreur est survenue lors de l'ajout du commentaire");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Afficher le formulaire uniquement pour les utilisateurs authentifiés */}
            {isAuthenticated && (
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div>
                            <Textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Exprimez-vous dans les commentaires..."
                                rows={3}
                                disabled={processing || isSubmitting}
                                className="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border-2 border-gray-300 px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.content && <div className="mt-1 text-sm text-red-500">{errors.content}</div>}
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing || isSubmitting || !data.content.trim()}
                                className="bg-gradient-to-br from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-purple-700"
                            >
                                {processing || isSubmitting ? 'Envoi...' : 'Commenter'}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
            {/* Afficher la liste des commentaires en premier */}
            <CommentList comments={comments} cardClass={cardClass} headingClass={headingClass} textClass={textClass} />
        </div>
    );
}
