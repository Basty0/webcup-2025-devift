import ContentFeed from '@/components/defilement/ContentFeed';
import { type ReactionType } from '@/components/reactions/ReactionHandler';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    theends: Array<{
        id: number;
        slug: string;
        author: {
            id: number;
            name: string;
            image: string;
            type: string;
        };
        content: {
            title: string;
            description: string;
            image: string;
            tone: string;
        };
        stats: {
            likes: number;
            comments: number;
            shares: number;
            total_reactions: number;
            views: number;
        };
        user_reaction?: ReactionType | null;
        created_at: string;
    }>;
}

export default function Dashboard({ theends }: DashboardProps) {
    const isMobile = useIsMobile();

    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <ContentFeed isMobile={isMobile} posts={theends} />
        </PageLayout>
    );
}
