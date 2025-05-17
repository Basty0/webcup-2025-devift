import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

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

interface CommentListProps {
    comments: Comment[];
    cardClass?: string;
    headingClass?: string;
    textClass?: string;
}

export default function CommentList({ comments, cardClass, headingClass, textClass }: CommentListProps) {
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
                            <div className="mb-2 flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src={comment.user.avatar_url || undefined} />
                                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className={`font-semibold ${headingClass}`}>{comment.user.name}</p>
                                    <p className="text-muted-foreground text-sm">
                                        {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className={textClass}>{comment.content}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
