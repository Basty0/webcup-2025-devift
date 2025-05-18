// Import pour les composants UI
import ShareModal from '@/components/share/ShareModal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp, MessageCircle, Pencil, Share2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Modifuser from './modif-user';

// Define types for Theend posts
interface Reaction {
    id: number;
    user_id: number;
    theend_id?: number;
    comment_id?: number;
    type: string;
    created_at: string;
    updated_at: string;
}

// Simplified comment structure for the UI
interface UIComment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    reactions: Record<string, number>;
    replies: UIComment[];
}

interface Comment {
    id: number;
    user_id: number;
    theend_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        photo: string | null;
    };
}

interface Theend {
    id: number;
    user_id: number;
    slug: string;
    title: string;
    content: string;
    is_public: boolean;
    tone: string;
    type_id: number;
    image_url: string | null;
    gif_url: string | null;
    sound_url: string | null;
    views: number;
    is_draft: boolean;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    reactions: Reaction[];
}

interface User {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    photo: string | null;
    photo_cover: string | null;
    slug: string;
}

interface ProfilePageProps {
    user: User;
    publishedPosts: Theend[];
    draftPosts: Theend[];
}

export default function ProfilePage({ user, publishedPosts = [], draftPosts = [] }: ProfilePageProps) {
    // S'assurer que publishedPosts et draftPosts sont des tableaux
    const safePublishedPosts = Array.isArray(publishedPosts) ? publishedPosts : [];
    const safeDraftPosts = Array.isArray(draftPosts) ? draftPosts : [];

    return (
        <div className="bg-background container mx-auto px-4 pb-8">
            {/* Section de couverture et profil */}
            <div className="relative mb-6">
                {/* Photo de couverture */}
                <div className="relative h-[200px] w-full overflow-hidden rounded-b-lg md:h-[300px]">
                    <Image src={user?.photo_cover || '/placeholder-cover.jpeg'} alt="Photo de couverture" fill className="object-cover" priority />
                </div>

                {/* Photo de profil et informations */}
                <div className="relative z-10 -mt-16 flex flex-col items-center gap-4 px-4 md:-mt-20 md:flex-row md:items-end">
                    <Avatar className="border-background h-32 w-32 border-4 md:h-40 md:w-40">
                        <AvatarImage src={user?.photo || '/placeholder-avatar.jpg'} alt="Photo de profil" />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>

                    <div className="flex w-full flex-col items-center justify-between pb-4 md:flex-row md:items-end">
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold">{user?.name || 'Utilisateur'}</h1>
                            <p className="text-muted-foreground">{user?.bio || 'Aucune biographie'}</p>
                        </div>

                        <div className="mt-2 md:mt-0">
                            <Modifuser />
                            {user?.slug && (
                                <Link href={route('user.profile', user.slug)} className="ml-2">
                                    <Button variant="secondary" size="sm">
                                        <span className="mr-2">👁️</span>
                                        Voir profil public
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 border-b" />
            </div>

            {/* Section des publications */}
            <Tabs defaultValue="published" className="mx-auto w-full max-w-3xl">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                    <TabsTrigger value="published">Publications</TabsTrigger>
                    <TabsTrigger value="drafts">Brouillons</TabsTrigger>
                </TabsList>

                <TabsContent value="published" className="space-y-6">
                    {safePublishedPosts.length > 0 ? (
                        safePublishedPosts.map((post) => <PostCard key={post.id} theend={post} user={user} isPublished={true} />)
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-muted-foreground">Aucune publication pour le moment</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="drafts" className="space-y-6">
                    {safeDraftPosts.length > 0 ? (
                        safeDraftPosts.map((post) => <PostCard key={post.id} theend={post} user={user} isPublished={false} />)
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-muted-foreground">Aucun brouillon pour le moment</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Composant pour les cartes de publication
interface PostCardProps {
    theend: Theend;
    user: User;
    isPublished: boolean;
}

// Définir des valeurs par défaut pour les propriétés Theend
const ensureTheendProperties = (theend: Theend): Theend => {
    return {
        ...theend,
        content: theend.content || '',
        image_url: theend.image_url || null,
        gif_url: theend.gif_url || null,
        sound_url: theend.sound_url || null,
        views: theend.views || 0,
        created_at: theend.created_at || new Date().toISOString(),
        updated_at: theend.updated_at || new Date().toISOString(),
        reactions: theend.reactions || [],
        comments: theend.comments || [],
    };
};

function PostCard({ theend: rawTheend, user, isPublished }: PostCardProps) {
    // Assurer que toutes les propriétés nécessaires sont définies
    const theend = ensureTheendProperties(rawTheend);

    const [showComments, setShowComments] = useState(false);
    const [showReactions, setShowReactions] = useState(false);
    const [userReaction] = useState<string | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Group reactions by type
    const reactionsByType = theend.reactions
        ? theend.reactions.reduce(
              (acc, reaction) => {
                  const type = reaction.type;
                  if (!acc[type]) acc[type] = 0;
                  acc[type]++;
                  return acc;
              },
              {} as Record<string, number>,
          )
        : {};

    // Convert comments to the format we need for UI
    const [postComments, setPostComments] = useState<UIComment[]>(
        theend.comments
            ? theend.comments.map((comment) => {
                  if (!comment.user) {
                      // Fallback for comments without user data
                      return {
                          id: comment.id,
                          author: 'Utilisateur inconnu',
                          avatar: '/placeholder-avatar.jpg',
                          content: comment.content,
                          date: formatDate(comment.created_at),
                          reactions: {},
                          replies: [],
                      };
                  }

                  return {
                      id: comment.id,
                      author: comment.user.name,
                      avatar: comment.user.photo || '/placeholder-avatar.jpg',
                      content: comment.content,
                      date: formatDate(comment.created_at),
                      reactions: {},
                      replies: [],
                  };
              })
            : [],
    );

    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [commentText, setCommentText] = useState('');

    // Définition des réactions disponibles avec des emojis
    const reactionTypes = [
        {
            type: 'like',
            label: "J'aime",
            emoji: '👍',
            color: 'text-blue-500',
            bgColor: 'bg-blue-100',
        },
        {
            type: 'love',
            label: "J'adore",
            emoji: '❤️',
            color: 'text-rose-500',
            bgColor: 'bg-rose-100',
        },
        {
            type: 'care',
            label: 'Solidaire',
            emoji: '👐',
            color: 'text-amber-500',
            bgColor: 'bg-amber-100',
        },
        {
            type: 'haha',
            label: 'Haha',
            emoji: '😂',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-100',
        },
        {
            type: 'angry',
            label: 'Grrrr',
            emoji: '😡',
            color: 'text-red-500',
            bgColor: 'bg-red-100',
        },
    ];

    // Format date helper function
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return "À l'instant";
        if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
        if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
        if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;

        return date.toLocaleDateString('fr-FR');
    }

    // Trouver la réaction actuelle de l'utilisateur
    const currentReaction = userReaction ? reactionTypes.find((r) => r.type === userReaction) : reactionTypes[0];

    // Calculer le total des réactions
    const totalReactions = Object.values(reactionsByType).reduce((sum, count) => sum + count, 0);

    // Gérer l'ajout d'un commentaire
    const handleAddComment = (parentId: number | null = null) => {
        if (!commentText.trim()) return;

        // Ici vous pourriez ajouter un appel API pour enregistrer le commentaire
        const newComment: UIComment = {
            id: Date.now(), // Temporaire, l'API fournirait un vrai ID
            author: user.name,
            avatar: user.photo || '/placeholder-avatar.jpg',
            content: commentText,
            date: "À l'instant",
            reactions: {} as Record<string, number>,
            replies: [],
        };

        if (parentId) {
            // Ajouter une réponse à un commentaire existant
            const updatedComments = postComments.map((comment) => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: [...comment.replies, newComment],
                    };
                }
                return comment;
            });
            setPostComments(updatedComments);
            setReplyingTo(null);
        } else {
            // Ajouter un nouveau commentaire principal
            setPostComments([...postComments, newComment]);
        }

        setCommentText('');
    };

    // Gérer la réaction à un commentaire
    const handleCommentReaction = (commentId: number, reactionType: string, isReply = false, parentId: number | null = null) => {
        // Ici vous pourriez ajouter un appel API pour enregistrer la réaction au commentaire
        if (isReply && parentId) {
            // Réagir à une réponse
            const updatedComments = postComments.map((comment) => {
                if (comment.id === parentId) {
                    const updatedReplies = comment.replies.map((reply) => {
                        if (reply.id === commentId) {
                            return {
                                ...reply,
                                reactions: {
                                    ...reply.reactions,
                                    [reactionType]: (reply.reactions[reactionType] || 0) + 1,
                                },
                            };
                        }
                        return reply;
                    });
                    return {
                        ...comment,
                        replies: updatedReplies,
                    };
                }
                return comment;
            });
            setPostComments(updatedComments);
        } else {
            // Réagir à un commentaire principal
            const updatedComments = postComments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        reactions: {
                            ...comment.reactions,
                            [reactionType]: (comment.reactions[reactionType] || 0) + 1,
                        },
                    };
                }
                return comment;
            });
            setPostComments(updatedComments);
        }
    };

    // Navigate to theend show page
    const navigateToTheend = () => {
        if (isPublished && theend.slug) {
            router.visit(route('theend.show', theend.slug));
        }
    };

    // Navigate to theend show page with comments open
    const navigateToTheendWithComments = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPublished && theend.slug) {
            router.visit(`${route('theend.show', theend.slug)}?showComments=true`);
        }
    };

    // Navigate to edit page for both published posts and drafts
    const navigateToEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (theend.slug) {
            router.visit(route('theend.step2', theend.slug));
        }
    };

    // Handle publish draft
    const publishDraft = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isPublished && theend.slug) {
            // Logic to publish the draft
            router.post(route('theend.update', theend.slug), {
                is_draft: false,
            });
        }
    };

    return (
        <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="flex cursor-pointer flex-row items-center gap-4 pb-2" onClick={navigateToTheend}>
                <Avatar>
                    <AvatarImage src={user.photo || '/placeholder-avatar.jpg'} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground text-sm">
                        {isPublished ? formatDate(theend.created_at) : `Modifié ${formatDate(theend.updated_at)}`}
                    </p>
                </div>
            </CardHeader>
            <CardContent className={isPublished ? 'cursor-pointer' : ''} onClick={isPublished ? navigateToTheend : undefined}>
                <p>{theend.content}</p>
                {/* Image de la publication */}
                {theend.image_url && (
                    <div className="mt-4 h-[350px] overflow-hidden rounded-md">
                        <Image src={theend.image_url} alt="Contenu de la publication" width={600} height={300} className="w-full object-cover" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col">
                {/* Affichage des compteurs de réactions */}
                {isPublished && totalReactions > 0 && (
                    <div className="mb-2 flex w-full justify-start">
                        <div className="text-muted-foreground flex items-center text-sm">
                            {reactionTypes.map(
                                (reaction) =>
                                    reactionsByType[reaction.type] > 0 && (
                                        <div key={reaction.type} className="mr-3 flex items-center">
                                            <span className="mr-1">{reaction.emoji}</span>
                                            <span>{reactionsByType[reaction.type]}</span>
                                        </div>
                                    ),
                            )}
                        </div>
                    </div>
                )}

                <div className="w-full border-t pt-4 pb-2">
                    {isPublished ? (
                        <div className="flex w-full justify-between">
                            <div className="flex space-x-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={userReaction && currentReaction ? `${currentReaction.color}` : ''}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isPublished) {
                                            navigateToTheend();
                                        } else {
                                            setShowReactions(!showReactions);
                                        }
                                    }}
                                >
                                    <span className="mr-2 text-lg">{userReaction && currentReaction ? currentReaction.emoji : '👍'}</span>
                                    <span>{userReaction && currentReaction ? currentReaction.label : "J'aime"}</span>
                                    {totalReactions > 0 && <span className="ml-1">({totalReactions})</span>}
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        if (isPublished) {
                                            navigateToTheendWithComments(e);
                                        } else {
                                            e.stopPropagation();
                                            setShowComments(!showComments);
                                        }
                                    }}
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    {theend.comments ? theend.comments.length : 0}
                                    {showComments ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsShareModalOpen(true);
                                    }}
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Partager
                                </Button>
                            </div>
                            <div>
                                <Button variant="outline" size="sm" className="mr-2" onClick={navigateToEdit}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Modifier
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button variant="destructive" size="sm" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Supprimer
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Êtes-vous sûr de vouloir supprimer cette publication ? Cette action est irréversible.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={(e: React.MouseEvent) => e.stopPropagation()}>Annuler</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={(e: React.MouseEvent) => {
                                                    e.stopPropagation();
                                                    router.delete(route('theend.destroy', theend.slug));
                                                }}
                                            >
                                                Supprimer
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full justify-end">
                            <Button variant="outline" size="sm" className="mr-2" onClick={navigateToEdit}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant="destructive" size="sm" className="mr-2" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Supprimer
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Êtes-vous sûr de vouloir supprimer ce brouillon ? Cette action est irréversible.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={(e: React.MouseEvent) => e.stopPropagation()}>Annuler</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                router.delete(route('theend.destroy', theend.slug));
                                            }}
                                        >
                                            Supprimer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Button onClick={publishDraft}>Publier</Button>
                        </div>
                    )}
                </div>

                {/* Modal de partage */}
                <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={theend.slug} />

                {/* Section des commentaires */}
                {isPublished && showComments && (
                    <div className="mt-2 w-full space-y-3 border-t pt-2">
                        {postComments.map((comment) => (
                            <div key={comment.id} className="space-y-3">
                                {/* Commentaire principal */}
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.avatar || '/placeholder-avatar.jpg'} alt={comment.author} />
                                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="bg-muted rounded-lg px-3 py-2">
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-sm font-medium">{comment.author}</h4>
                                                <span className="text-muted-foreground text-xs">{comment.date}</span>
                                            </div>
                                            <p className="mt-1 text-sm">{comment.content}</p>
                                        </div>

                                        {/* Actions du commentaire */}
                                        <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                            <div className="flex space-x-2">
                                                <div className="group relative">
                                                    <button className="hover:text-primary">J'aime</button>
                                                    <div className="bg-background absolute bottom-full left-0 mb-1 hidden rounded-full border p-1 shadow-md group-hover:flex">
                                                        {reactionTypes.map((reaction) => (
                                                            <button
                                                                key={reaction.type}
                                                                className="p-1 transition-transform hover:scale-125"
                                                                onClick={() => handleCommentReaction(comment.id, reaction.type)}
                                                                title={reaction.label}
                                                            >
                                                                <span className="text-lg">{reaction.emoji}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button
                                                    className="hover:text-primary"
                                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                >
                                                    Répondre
                                                </button>
                                            </div>

                                            {/* Affichage des réactions au commentaire */}
                                            {Object.keys(comment.reactions).length > 0 && (
                                                <div className="ml-auto flex items-center">
                                                    {Object.entries(comment.reactions).map(([type, count]) => {
                                                        const reaction = reactionTypes.find((r) => r.type === type);
                                                        return reaction ? (
                                                            <div key={type} className="ml-1 flex items-center">
                                                                <span className="text-sm">{reaction.emoji}</span>
                                                                <span className="ml-1 text-xs">{count}</span>
                                                            </div>
                                                        ) : null;
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {/* Formulaire de réponse */}
                                        {replyingTo === comment.id && (
                                            <div className="mt-2 flex items-center">
                                                <Avatar className="mr-2 h-6 w-6">
                                                    <AvatarImage src={user.photo || '/placeholder-avatar.jpg'} alt="Votre avatar" />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <input
                                                    type="text"
                                                    value={commentText}
                                                    onChange={(e) => setCommentText(e.target.value)}
                                                    placeholder={`Répondre à ${comment.author}...`}
                                                    className="bg-muted focus:ring-primary flex-1 rounded-lg px-3 py-1 text-sm focus:ring-1 focus:outline-none"
                                                />
                                                <Button size="sm" className="ml-2" onClick={() => handleAddComment(comment.id)}>
                                                    Commenter
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Réponses aux commentaires */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="ml-11 space-y-3">
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} className="flex gap-3">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarImage src={reply.avatar || '/placeholder-avatar.jpg'} alt={reply.author} />
                                                    <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="bg-muted rounded-lg px-3 py-2">
                                                        <div className="flex items-start justify-between">
                                                            <h4 className="text-sm font-medium">{reply.author}</h4>
                                                            <span className="text-muted-foreground text-xs">{reply.date}</span>
                                                        </div>
                                                        <p className="mt-1 text-sm">{reply.content}</p>
                                                    </div>

                                                    {/* Actions de la réponse */}
                                                    <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                                        <div className="flex space-x-2">
                                                            <div className="group relative">
                                                                <button className="hover:text-primary">J'aime</button>
                                                                <div className="bg-background absolute bottom-full left-0 mb-1 hidden rounded-full border p-1 shadow-md group-hover:flex">
                                                                    {reactionTypes.map((reaction) => (
                                                                        <button
                                                                            key={reaction.type}
                                                                            className="p-1 transition-transform hover:scale-125"
                                                                            onClick={() =>
                                                                                handleCommentReaction(reply.id, reaction.type, true, comment.id)
                                                                            }
                                                                            title={reaction.label}
                                                                        >
                                                                            <span className="text-lg">{reaction.emoji}</span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <button
                                                                className="hover:text-primary"
                                                                onClick={() => {
                                                                    setReplyingTo(comment.id);
                                                                    setCommentText(`@${reply.author} `);
                                                                }}
                                                            >
                                                                Répondre
                                                            </button>
                                                        </div>

                                                        {/* Affichage des réactions à la réponse */}
                                                        {Object.keys(reply.reactions).length > 0 && (
                                                            <div className="ml-auto flex items-center">
                                                                {Object.entries(reply.reactions).map(([type, count]) => {
                                                                    const reaction = reactionTypes.find((r) => r.type === type);
                                                                    return reaction ? (
                                                                        <div key={type} className="ml-1 flex items-center">
                                                                            <span className="text-sm">{reaction.emoji}</span>
                                                                            <span className="ml-1 text-xs">{count}</span>
                                                                        </div>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Formulaire pour ajouter un commentaire */}
                        <div className="mt-3 flex gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.photo || '/placeholder-avatar.jpg'} alt="Votre avatar" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Écrire un commentaire..."
                                    className="bg-muted focus:ring-primary flex-1 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                                />
                                <Button size="sm" className="ml-2" onClick={() => handleAddComment()}>
                                    Commenter
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
