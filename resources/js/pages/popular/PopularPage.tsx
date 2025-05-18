import ShareModal from '@/components/share/ShareModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';

interface TheEndType {
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
    views_count?: number;
}

interface CategoryType {
    type_id: number;
    type_label: string;
    theends: TheEndType[];
}

interface PopularPageProps {
    categorizedContent: CategoryType[];
    mostPopular: TheEndType[];
    error?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Populaire',
        href: '/populaire',
    },
];

export default function PopularPage({ categorizedContent, mostPopular, error }: PopularPageProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

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

    const renderTheEndCard = (post: TheEndType) => (
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
                            <p className="text-muted-foreground text-sm">{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="ml-auto flex flex-wrap items-center gap-2">
                            {(post.reactions_count && post.reactions_count > 5) || (post.comments_count && post.comments_count > 3) ? (
                                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Populaire</span>
                            ) : null}
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-800">{post.content_type}</span>
                        </div>
                    </div>

                    <Link href={route('theend.show', post.slug)}>
                        <h3 className="mb-2 text-xl font-semibold hover:text-blue-600">{post.title || 'Sans titre'}</h3>
                        <p className="text-muted-foreground mb-3 line-clamp-3 h-[4.5rem] overflow-hidden">{post.content}</p>
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
                    <Button variant="ghost" size="sm" className="flex items-center">
                        <Heart className="mr-1 h-4 w-4 text-rose-500" />
                        <span className="mr-1">{post.reactions_count || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => navigateToPost(e, post.slug, true)}>
                        <MessageCircle className="mr-1 h-4 w-4" />
                        <span className="mr-1">{post.comments_count || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        <span className="mr-1">{post.views_count || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => handleShareClick(e, post.slug)}>
                        <Share2 className="mr-1 h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );

    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="Contenu Populaire" />

            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto mb-8 max-w-3xl">
                    <h1 className="mb-6 text-3xl font-bold">Contenu Populaire</h1>
                </div>

                {error ? (
                    <div className="mx-auto max-w-3xl rounded-lg bg-red-50 p-4 text-red-800">
                        <p>Une erreur est survenue: {error}</p>
                    </div>
                ) : (
                    <div className="mx-auto max-w-3xl">
                        {/* Most Popular Section */}
                        <section className="mb-10">
                            <h2 className="mb-6 text-2xl font-semibold">Les plus populaires</h2>
                            <div className="space-y-6">
                                {mostPopular && mostPopular.length > 0 ? (
                                    mostPopular.slice(0, 5).map((post) => renderTheEndCard(post))
                                ) : (
                                    <p className="text-muted-foreground">Aucun contenu populaire disponible</p>
                                )}
                            </div>

                            {mostPopular && mostPopular.length > 5 && (
                                <div className="mt-4 text-center">
                                    <Button variant="outline" onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>
                                        Voir plus de contenu populaire
                                    </Button>
                                </div>
                            )}
                        </section>

                        {/* Categories Section */}
                        <section>
                            <h2 className="mb-6 text-2xl font-semibold">Par catégorie</h2>

                            <Tabs defaultValue="all">
                                <TabsList className="mb-6 w-full overflow-x-auto">
                                    <TabsTrigger value="all">Tous</TabsTrigger>
                                    {categorizedContent.map((category) => (
                                        <TabsTrigger key={category.type_id} value={`category-${category.type_id}`}>
                                            {category.type_label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="all" className="space-y-8">
                                    {categorizedContent.map((category) => (
                                        <div key={category.type_id} className="mb-8">
                                            <div className="mb-4 flex items-center justify-between">
                                                <h3 className="text-xl font-medium">{category.type_label}</h3>
                                                <Link
                                                    href={route('popular.category', category.type_id)}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Voir tout →
                                                </Link>
                                            </div>
                                            <div className="space-y-6">{category.theends.slice(0, 3).map((post) => renderTheEndCard(post))}</div>
                                        </div>
                                    ))}
                                </TabsContent>

                                {categorizedContent.map((category) => (
                                    <TabsContent key={category.type_id} value={`category-${category.type_id}`} className="space-y-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-xl font-medium">{category.type_label}</h3>
                                            <Link
                                                href={route('popular.category', category.type_id)}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Voir tout →
                                            </Link>
                                        </div>
                                        {category.theends.map((post) => renderTheEndCard(post))}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </section>
                    </div>
                )}

                {selectedPostSlug && <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={selectedPostSlug} />}
            </main>
        </PageLayout>
    );
}
