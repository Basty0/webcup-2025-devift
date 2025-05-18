import ContentFeed from '@/components/defilement/ContentFeed';
import { type ReactionType } from '@/components/reactions/ReactionHandler';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { useIsMobile } from '@/hooks/use-mobile';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, HomeIcon, Plus, Search, UserRound } from 'lucide-react';
import React from 'react';

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
       // Sécurité : on vérifie que theends n’est pas vide
 
    
    const isMobile = useIsMobile();
    const { ziggy } = usePage<SharedData>().props;
    const currentPath = ziggy?.location;

    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <ContentFeed isMobile={isMobile} posts={theends} />

            {/* Add the Dock directly to the dashboard */}
            <AppleStyleDock currentPath={currentPath} />
        </div>
    );
}
