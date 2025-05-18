import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface User {
    id: number;
    name: string;
    avatar_url: string | null;
    photo?: string | null;
    bio?: string | null;
    slug?: string;
}

interface Comment {
    id: number;
    content: string;
    user: User;
    created_at: string;
}

interface CommentListProps {
    comments: Comment[];
    cardClass?: string;
    headingClass?: string;
    textClass?: string;
    currentUserId?: number;
}

export default function CommentList({ comments, cardClass, headingClass, textClass, currentUserId }: CommentListProps) {
    if (!Array.isArray(comments) || comments.length === 0) {
        return <p className="text-muted-foreground text-center">Aucun commentaire pour le moment</p>;
    }

    // Trier les commentaires par date décroissante (plus récent en premier)
    const sortedComments = [...comments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="space-y-4">
            {sortedComments.map((comment) => (
                <motion.div key={comment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <Card className={cardClass}>
                        <CardContent className="pt-6">
                            <div className="mb-4 flex items-start gap-3">
                                <Link
                                    href={
                                        comment.user.id === currentUserId
                                            ? route('profil.ViewProfil')
                                            : comment.user.slug
                                              ? route('user.profile', comment.user.slug)
                                              : '#'
                                    }
                                    className="group flex-shrink-0"
                                >
                                    <Avatar className="group-hover:border-primary/50 h-10 w-10 border border-white/20 transition-all">
                                        <AvatarImage src={comment.user.photo || comment.user.avatar_url || undefined} />
                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Link
                                            href={
                                                comment.user.id === currentUserId
                                                    ? route('profil.ViewProfil')
                                                    : comment.user.slug
                                                      ? route('user.profile', comment.user.slug)
                                                      : '#'
                                            }
                                            className={`font-semibold ${headingClass} hover:underline`}
                                        >
                                            {comment.user.name}
                                        </Link>
                                        <p className="text-muted-foreground text-xs">
                                            {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                    {comment.user.bio && <p className="text-muted-foreground mt-1 mb-2 line-clamp-1 text-xs">{comment.user.bio}</p>}
                                    <p className={`${textClass} mt-2`}>{comment.content}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
