import ShareModal from '@/components/share/ShareModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, router, usePage } from '@inertiajs/react';
import { FileText, Heart, MessageCircle, Search, Share2, User } from 'lucide-react';
import { useState } from 'react';

interface TheEndResult {
    type: 'theend';
    id: number;
    slug: string;
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
    user: {
        name: string;
        avatar_url: string | null;
    };
    content_type: string;
    reactions_count?: number;
    comments_count?: number;
}

interface UserResult {
    type: 'user';
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar_url: string | null;
    created_at: string;
    slug: string;
}

interface SearchResults {
    theends: TheEndResult[];
    users: UserResult[];
}

export default function Resultat() {
    const { results, query, error } = usePage().props as {
        results?: SearchResults;
        query?: string;
        error?: string;
    };

    const [searchQuery, setSearchQuery] = useState(query || '');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(route('search', searchQuery.trim()));
        }
    };

    const handleShareClick = (e: React.MouseEvent, slug: string) => {
        e.stopPropagation();
        e.preventDefault();
        setSelectedPostSlug(slug);
        setIsShareModalOpen(true);
    };

    // Function to navigate to post detail page
    const navigateToPost = (e: React.MouseEvent, slug: string, showComments: boolean = false) => {
        e.stopPropagation();
        e.preventDefault();

        if (showComments) {
            router.visit(`${route('theend.show', slug)}?showComments=true`);
        } else {
            router.visit(route('theend.show', slug));
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mx-auto mb-8 max-w-3xl">
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5" />
                        </div>
                        <Input
                            type="search"
                            className="pl-10"
                            placeholder="Rechercher une publication, un utilisateur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
                {query && (
                    <div className="mt-4">
                        <h2 className="text-xl font-medium">Résultats pour "{query}"</h2>
                    </div>
                )}
            </div>

            {error ? (
                <div className="mx-auto max-w-3xl rounded-lg bg-red-50 p-4 text-red-800">
                    <p>Une erreur est survenue: {error}</p>
                </div>
            ) : results ? (
                <div className="mx-auto max-w-3xl">
                    <Tabs defaultValue="theends">
                        <TabsList className="mb-6 grid w-full grid-cols-2">
                            <TabsTrigger value="theends">
                                <FileText className="mr-2 h-4 w-4" />
                                Publications ({results.theends?.length || 0})
                            </TabsTrigger>
                            <TabsTrigger value="users">
                                <User className="mr-2 h-4 w-4" />
                                Utilisateurs ({results.users?.length || 0})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="theends" className="space-y-4">
                            {results.theends && results.theends.length > 0 ? (
                                results.theends.map((post) => (
                                    <Card key={post.id} className="overflow-hidden border-none bg-transparent shadow-none">
                                        <CardContent className="p-0">
                                            <div className="p-4">
                                                <div className="mb-3 flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={post.user.avatar_url || '/placeholder-avatar.jpg'} alt={post.user.name} />
                                                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{post.user.name}</p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {new Date(post.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto flex flex-wrap items-center gap-2">
                                                        {(post.reactions_count && post.reactions_count > 5) ||
                                                        (post.comments_count && post.comments_count > 3) ? (
                                                            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                                                Populaire
                                                            </span>
                                                        ) : null}
                                                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-800">
                                                            {post.content_type}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Link href={route('theend.show', post.slug)}>
                                                    <h3 className="mb-2 text-xl font-semibold hover:text-blue-600">{post.title || 'Sans titre'}</h3>
                                                    <p className="text-muted-foreground mb-3 line-clamp-3">{post.content}</p>
                                                </Link>

                                                {post.image_url && (
                                                    <div className="mb-4 h-80 w-full overflow-hidden rounded-md">
                                                        <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between p-3">
                                            <div className="flex space-x-4">
                                                <Button variant="ghost" size="sm" onClick={(e) => navigateToPost(e, post.slug)}>
                                                    <Heart className="mr-1 h-4 w-4" />
                                                    J'aime
                                                    {post.reactions_count ? (
                                                        <span className="ml-1 text-xs font-medium">({post.reactions_count})</span>
                                                    ) : null}
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={(e) => navigateToPost(e, post.slug, true)}>
                                                    <MessageCircle className="mr-1 h-4 w-4" />
                                                    Commenter
                                                    {post.comments_count ? (
                                                        <span className="ml-1 text-xs font-medium">({post.comments_count})</span>
                                                    ) : null}
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={(e) => handleShareClick(e, post.slug)}>
                                                    <Share2 className="mr-1 h-4 w-4" />
                                                    Partager
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <div className="py-10 text-center">
                                    <p className="text-muted-foreground">Aucune publication trouvée</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="users" className="space-y-4">
                            {results.users && results.users.length > 0 ? (
                                results.users.map((user) => (
                                    <Card key={user.id} className="overflow-hidden border-none bg-transparent shadow-none">
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage src={user.avatar_url || '/placeholder-avatar.jpg'} alt={user.name} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <Link href={user.slug ? route('user.profile', user.slug) : route('user.profile', user.id)}>
                                                        <h3 className="hover:text-primary text-xl font-semibold">{user.name}</h3>
                                                    </Link>
                                                    <p className="text-muted-foreground mb-2 text-sm">{user.email}</p>
                                                    {user.bio && <p className="text-muted-foreground line-clamp-2">{user.bio}</p>}
                                                </div>
                                                <Link href={user.slug ? route('user.profile', user.slug) : route('user.profile', user.id)}>
                                                    <Button size="sm">Voir profil</Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="py-10 text-center">
                                    <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            ) : (
                <div className="mx-auto max-w-3xl p-8 text-center">
                    <p className="text-muted-foreground">Effectuez une recherche pour voir les résultats</p>
                </div>
            )}

            {selectedPostSlug && <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={selectedPostSlug} />}
        </main>
    );
}
