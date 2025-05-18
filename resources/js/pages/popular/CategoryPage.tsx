import ShareModal from '@/components/share/ShareModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
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

interface TypeInfo {
    id: number;
    label: string;
}

interface PaginationInfo {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface CategoryPageProps {
    type: TypeInfo;
    theends: TheEndType[];
    pagination: PaginationInfo;
    error?: string;
}

export default function CategoryPage({ type, theends, pagination, error }: CategoryPageProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Populaire',
            href: '/populaire',
        },
        {
            title: type.label,
            href: `/populaire/categorie/${type.id}`,
        },
    ];

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

    // Function to navigate to a specific page
    const goToPage = (page: number) => {
        router.visit(route('popular.category', { typeId: type.id, page }));
    };

    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title={`Populaire: ${type.label}`} />

            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto mb-8 max-w-3xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{type.label}</h1>
                        <Link href={route('popular.index')} className="text-blue-600 hover:underline">
                            Retour à toutes les catégories
                        </Link>
                    </div>
                    <p className="text-muted-foreground mt-2">Les contenus les plus populaires de cette catégorie</p>
                </div>

                {error ? (
                    <div className="mx-auto max-w-3xl rounded-lg bg-red-50 p-4 text-red-800">
                        <p>Une erreur est survenue: {error}</p>
                    </div>
                ) : (
                    <div className="mx-auto max-w-3xl">
                        {theends && theends.length > 0 ? (
                            <div className="space-y-6">
                                {theends.map((post) => (
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
                                                    </div>
                                                </div>

                                                <Link href={route('theend.show', post.slug)}>
                                                    <h3 className="mb-2 text-xl font-semibold hover:text-blue-600">{post.title || 'Sans titre'}</h3>
                                                    <p className="text-muted-foreground mb-3 line-clamp-3 h-[4.5rem] overflow-hidden">
                                                        {post.content}
                                                    </p>
                                                </Link>

                                                {post.image_url && (
                                                    <div className="mb-4 h-60 w-full overflow-hidden rounded-md">
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
                                ))}
                            </div>
                        ) : (
                            <div className="py-10 text-center">
                                <p className="text-muted-foreground">Aucun contenu disponible dans cette catégorie</p>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {pagination && pagination.last_page > 1 && (
                            <div className="mt-10 flex justify-center">
                                <Pagination>
                                    <Pagination.Previous
                                        onClick={() => goToPage(pagination.current_page - 1)}
                                        disabled={pagination.current_page === 1}
                                    />

                                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                        <Pagination.Item key={page} isActive={page === pagination.current_page} onClick={() => goToPage(page)}>
                                            {page}
                                        </Pagination.Item>
                                    ))}

                                    <Pagination.Next
                                        onClick={() => goToPage(pagination.current_page + 1)}
                                        disabled={pagination.current_page === pagination.last_page}
                                    />
                                </Pagination>
                            </div>
                        )}
                    </div>
                )}

                {selectedPostSlug && <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={selectedPostSlug} />}
            </main>
        </PageLayout>
    );
}
