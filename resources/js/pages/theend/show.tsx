import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '@/layouts/page-layout';
import { Theend } from '@/types/theend';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ShowProps {
    theend: Theend & {
        user: {
            id: number;
            name: string;
            avatar_url: string | null;
        };
        type: {
            id: number;
            label: string;
        };
        comments: Array<{
            id: number;
            content: string;
            user: {
                id: number;
                name: string;
                avatar_url: string | null;
            };
            created_at: string;
        }>;
        reactions: Array<{
            id: number;
            type: string;
            user_id: number;
        }>;
        created_at: string;
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function Show({ theend }: ShowProps) {
    const [isLiked, setIsLiked] = useState(theend.reactions.some((r) => r.type === 'like' && r.user_id === theend.user.id));
    const [isSaved, setIsSaved] = useState(theend.reactions.some((r) => r.type === 'save' && r.user_id === theend.user.id));
    const [showComments, setShowComments] = useState(false);

    const {
        data: commentData,
        setData: setCommentData,
        post: postComment,
        processing,
    } = useForm({
        content: '',
    });

    const reactionForm = useForm({
        type: '',
    });

    const handleReaction = (type: 'like' | 'save') => {
        if (type === 'like') {
            setIsLiked(!isLiked);
        } else {
            setIsSaved(!isSaved);
        }
        reactionForm.data.type = type;
        reactionForm.post(`/theend/${theend.slug}/react`);
    };

    const handleComment = (e: React.FormEvent) => {
        e.preventDefault();
        postComment(`/theend/${theend.slug}/comment`, {
            onSuccess: () => {
                setCommentData('content', '');
            },
        });
    };

    return (
        <PageLayout>
            <motion.div className="mx-auto max-w-4xl p-6" variants={containerVariants} initial="hidden" animate="visible">
                {/* En-tête */}
                <motion.div className="mb-8" variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={theend.user.avatar_url || undefined} />
                                        <AvatarFallback>{theend.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-lg font-semibold">{theend.user.name}</h2>
                                        <p className="text-muted-foreground text-sm">{new Date(theend.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">{theend.type.label}</Badge>
                            </div>
                        </CardHeader>
                    </Card>
                </motion.div>

                {/* Contenu principal */}
                <motion.div className="mb-8 space-y-6" variants={itemVariants}>
                    <Card>
                        <CardContent className="pt-6">
                            <h1 className="mb-4 text-3xl font-bold">{theend.title}</h1>
                            <p className="text-lg leading-relaxed whitespace-pre-wrap">{theend.content}</p>

                            {/* Médias */}
                            {(theend.image_url || theend.gif_url || theend.sound_url) && (
                                <div className="mt-6 space-y-4">
                                    {theend.image_url && <img src={theend.image_url} alt="Image" className="w-full rounded-lg object-cover" />}
                                    {theend.gif_url && <img src={theend.gif_url} alt="GIF" className="w-full rounded-lg object-cover" />}
                                    {theend.sound_url && (
                                        <div>
                                            <audio src={theend.sound_url} controls className="w-full" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Actions */}
                <motion.div className="mb-8 flex items-center justify-between" variants={itemVariants}>
                    <div className="flex space-x-4">
                        <Button
                            variant={isLiked ? 'default' : 'outline'}
                            onClick={() => handleReaction('like')}
                            className="flex items-center space-x-2"
                        >
                            <Heart className={isLiked ? 'fill-current' : ''} />
                            <span>{theend.reactions.filter((r) => r.type === 'like').length}</span>
                        </Button>
                        <Button variant="outline" onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2">
                            <MessageCircle />
                            <span>{theend.comments.length}</span>
                        </Button>
                    </div>
                    <Button variant={isSaved ? 'default' : 'outline'} onClick={() => handleReaction('save')} className="flex items-center space-x-2">
                        <Bookmark className={isSaved ? 'fill-current' : ''} />
                        <span>{isSaved ? 'Sauvegardé' : 'Sauvegarder'}</span>
                    </Button>
                </motion.div>

                {/* Commentaires */}
                {showComments && (
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl font-semibold">Commentaires</h3>
                            </CardHeader>
                            <CardContent>
                                {/* Formulaire de commentaire */}
                                <form onSubmit={handleComment} className="mb-6">
                                    <Textarea
                                        value={commentData.content}
                                        onChange={(e) => setCommentData('content', e.target.value)}
                                        placeholder="Ajouter un commentaire..."
                                        className="mb-4"
                                        rows={3}
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={processing}>
                                            Commenter
                                        </Button>
                                    </div>
                                </form>

                                {/* Liste des commentaires */}
                                <div className="space-y-4">
                                    {theend.comments.map((comment) => (
                                        <motion.div key={comment.id} variants={itemVariants}>
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <div className="mb-2 flex items-center space-x-2">
                                                        <Avatar>
                                                            <AvatarImage src={comment.user.avatar_url || undefined} />
                                                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{comment.user.name}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {new Date(comment.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-foreground">{comment.content}</p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </PageLayout>
    );
}
