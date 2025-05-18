import ShareModal from '@/components/share/ShareModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import PageLayout from '@/layouts/page-layout';
import { Link, router } from '@inertiajs/react';
import { MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';

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
    type: {
        id: number;
        label: string;
    };
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
    slug: string;
    bio: string | null;
    photo: string | null;
    photo_cover: string | null;
    twitter?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    tiktok?: string | null;
    linkedin?: string | null;
    location?: string | null;
}

interface PublicProfileProps {
    user: User;
    publishedPosts: Theend[];
    isOwner: boolean;
}

export default function PublicProfile({ user, publishedPosts = [], isOwner }: PublicProfileProps) {
    // S'assurer que publishedPosts est un tableau
    const safePublishedPosts = Array.isArray(publishedPosts) ? publishedPosts : [];

    return (
        <PageLayout>
            <div className="bg-background container mx-auto px-4 pb-8">
                {/* Section de couverture et profil */}
                <div className="relative mb-6">
                    {/* Photo de couverture */}
                    <div className="relative h-[200px] w-full overflow-hidden rounded-b-lg md:h-[300px]">
                        <Image
                            src={user?.photo_cover || '/placeholder-cover.jpeg'}
                            alt="Photo de couverture"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Photo de profil et informations */}
                    <div className="relative z-10 -mt-16 flex flex-col items-center gap-4 px-4 md:-mt-20 md:flex-row md:items-end">
                        <Avatar className="border-background h-32 w-32 border-4 md:h-40 md:w-40">
                            <AvatarImage src={user?.photo || '/placeholder-avatar.jpg'} alt="Photo de profil" />
                            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>

                        <div className="flex w-full flex-col items-center justify-between md:flex-row md:items-end">
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-bold">{user?.name || 'Utilisateur'}</h1>
                                <p className="text-muted-foreground">{user?.bio || 'Aucune biographie'}</p>
                                {user?.location && (
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        <span className="font-medium">Localisation:</span> {user.location}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 flex flex-wrap justify-center gap-2 md:mt-0 md:justify-end">
                                {/* Social media links */}
                                {user?.twitter && (
                                    <a
                                        href={`https://twitter.com/${user.twitter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#1da1f2]/10 p-2 text-[#1da1f2] transition-colors hover:bg-[#1da1f2]/20"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                        </svg>
                                    </a>
                                )}
                                {user?.instagram && (
                                    <a
                                        href={`https://instagram.com/${user.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#e1306c]/10 p-2 text-[#e1306c] transition-colors hover:bg-[#e1306c]/20"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                )}
                                {user?.facebook && (
                                    <a
                                        href={`https://facebook.com/${user.facebook}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#1877f2]/10 p-2 text-[#1877f2] transition-colors hover:bg-[#1877f2]/20"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </a>
                                )}
                                {user?.tiktok && (
                                    <a
                                        href={`https://tiktok.com/@${user.tiktok}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-black/10 p-2 text-black transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                                            <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                            <path d="M15 8v8a4 4 0 0 1-4 4" />
                                            <path d="M15 8h-4" />
                                        </svg>
                                    </a>
                                )}
                                {user?.linkedin && (
                                    <a
                                        href={`https://linkedin.com/in/${user.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#0077b5]/10 p-2 text-[#0077b5] transition-colors hover:bg-[#0077b5]/20"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                            <rect x="2" y="9" width="4" height="12"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    </a>
                                )}
                            </div>

                            {isOwner && (
                                <div className="mt-4 md:mt-0">
                                    <Link href={route('profil.ViewProfil')}>
                                        <Button variant="outline">Modifier mon profil</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 border-b" />
                </div>

                {/* Section des publications */}
                <div className="mx-auto w-full max-w-3xl">
                    <h2 className="mb-6 text-xl font-bold">Publications</h2>
                    <div className="space-y-6">
                        {safePublishedPosts.length > 0 ? (
                            safePublishedPosts.map((post) => <PostCard key={post.id} theend={post} user={user} />)
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-muted-foreground">Aucune publication pour le moment</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

// Composant pour les cartes de publication
interface PostCardProps {
    theend: Theend;
    user: User;
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
        type: theend.type || { id: 0, label: 'Non catégorisé' },
    };
};

function PostCard({ theend: rawTheend, user }: PostCardProps) {
    // Ensure all the properties we need are defined
    const theend = ensureTheendProperties(rawTheend);
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

    // Calculer le total des réactions
    const totalReactions = Object.values(reactionsByType).reduce((sum, count) => sum + count, 0);

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

    // Navigate to theend show page
    const navigateToTheend = () => {
        if (theend.slug) {
            router.visit(route('theend.show', theend.slug));
        }
    };

    // Navigate to theend with comments open
    const navigateToTheendWithComments = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (theend.slug) {
            router.visit(`${route('theend.show', theend.slug)}?showComments=true`);
        }
    };

    return (
        <Card className="overflow-hidden border-none bg-transparent shadow-none">
            <CardHeader className="flex cursor-pointer flex-row items-center gap-4 pb-2" onClick={navigateToTheend}>
                <Avatar>
                    <AvatarImage src={user.photo || '/placeholder-avatar.jpg'} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <div className="text-muted-foreground flex items-center space-x-2 text-sm">
                        <span>{formatDate(theend.created_at)}</span>
                        {theend.type?.label && (
                            <>
                                <span className="text-xs">•</span>
                                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">{theend.type.label}</span>
                            </>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="cursor-pointer" onClick={navigateToTheend}>
                {theend.title && <h4 className="mb-2 font-semibold">{theend.title}</h4>}
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
                {totalReactions > 0 && (
                    <div className="mb-2 flex w-full justify-start">
                        <div className="text-muted-foreground flex items-center text-sm">
                            <span className="mr-1">❤️</span>
                            <span>{totalReactions}</span>
                        </div>
                    </div>
                )}

                <div className="w-full border-t pt-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" onClick={navigateToTheend}>
                                <span className="mr-2 text-lg">👍</span>
                                <span>J'aime</span>
                                {totalReactions > 0 && <span className="ml-1">({totalReactions})</span>}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={navigateToTheendWithComments}>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                {theend.comments?.length || 0} Commentaires
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
                    </div>
                </div>
            </CardFooter>

            {/* Modal de partage */}
            <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={theend.slug} />
        </Card>
    );
}
