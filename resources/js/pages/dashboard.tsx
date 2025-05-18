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

// Navigation data for the dock
const dockItems = [
    {
        title: 'Home',
        icon: <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '/dashboard',
    },
    {
        title: 'Populaires',
        icon: <BookOpen className="h-10 w-10 rounded-full text-neutral-600 dark:text-neutral-300" />,
        href: '/populaire',
    },
    {
        title: 'TheEnd pages',
        icon: <Plus className="h-12 w-12 rounded-full text-neutral-600 dark:text-neutral-300" />,
        href: '/exprimer-vous',
    },
    {
        title: 'Recherche',
        icon: <Search className="h-10 w-10 rounded-full text-neutral-600 dark:text-neutral-300" />,
        href: '/recherche',
    },
    {
        title: 'Profil',
        icon: <UserRound className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '/profil',
    },
];

// Dock Component copied from PageLayout
function AppleStyleDock({ currentPath }: { currentPath?: string }) {
    return (
        <div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
            <Dock className="items-end pb-3">
                {dockItems.map((item, idx) => {
                    // Check if the current page is active
                    let isActive = false;

                    if (!currentPath) {
                        isActive = false;
                    } else {
                        // Special case for single theend view
                        if (currentPath.startsWith('/theend/') && currentPath.length > 8) {
                            // Don't highlight any nav item for single post view
                            isActive = false;
                        } else {
                            // Special cases for different sections
                            switch (item.href) {
                                case '/recherche':
                                    // Active for search pages
                                    isActive = currentPath.includes('/search/') || currentPath.includes('/recherche');
                                    break;
                                case '/profil':
                                    // Active for profile and settings pages
                                    isActive =
                                        currentPath.startsWith('/profil') || currentPath.startsWith('/settings') || currentPath === '/user/profile';
                                    break;
                                case '/exprimer-vous':
                                    // Active for content creation flow
                                    isActive = currentPath.startsWith('/exprimer-vous') || currentPath.includes('/step');
                                    break;
                                case '/populaire':
                                    // Active for theend listing pages
                                    isActive = currentPath.startsWith('/populaire');
                                    break;
                                case '/dashboard':
                                    // Active only for exact dashboard path or root
                                    isActive = currentPath === '/dashboard' || currentPath === '/';
                                    break;
                                default:
                                    // Default case - check if path starts with the href
                                    isActive = item.href !== '#' && currentPath.startsWith(item.href);
                            }
                        }
                    }

                    return (
                        <DockItem
                            key={idx}
                            className={`aspect-square rounded-full backdrop-blur-md ${
                                isActive ? 'bg-primary/20 ring-primary dark:bg-primary/20 ring-2' : 'bg-gray-200/30 dark:bg-neutral-800/30'
                            }`}
                            href={item.href}
                        >
                            <DockLabel>{item.title}</DockLabel>
                            <DockIcon>
                                {React.cloneElement(item.icon, {
                                    className: `h-full w-full ${
                                        isActive ? 'text-primary dark:text-primary' : 'text-neutral-600 dark:text-neutral-300'
                                    }`,
                                })}
                            </DockIcon>
                        </DockItem>
                    );
                })}
            </Dock>
        </div>
    );
}

export default function Dashboard({ theends }: DashboardProps) {
    const isMobile = useIsMobile();
    const { ziggy } = usePage<SharedData>().props;
    const currentPath = ziggy?.location;

    return (
        <div className="flex h-screen flex-col gap-4 pb-20">
            <Head title="Dashboard" />
            <ContentFeed isMobile={isMobile} posts={theends} />

            {/* Add the Dock directly to the dashboard */}
            <AppleStyleDock currentPath={currentPath} />
        </div>
    );
}
