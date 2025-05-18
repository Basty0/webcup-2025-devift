import AppLogoIcon from '@/components/app-logo-icon';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import SearchCommandDialog from '@/components/ui/SearchCommandDialog';
import { Toaster } from '@/components/ui/sonner';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, BookOpen, HomeIcon, LogOut, Plus, Search, Settings, UserRound } from 'lucide-react';
import React, { type ReactNode } from 'react';
import { Image } from '@/components/ui/image';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const data = [
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

export default function PageLayout({ children = [] }: AppLayoutProps) {

   


    const { auth, ziggy } = usePage<SharedData>().props;
    const getInitials = useInitials();

    // Get current path and active section
    const currentPath = ziggy?.location;



    // Ajout pour la recherche
    const [searchOpen, setSearchOpen] = React.useState(false);
    const searchAnchorRef = React.useRef<HTMLDivElement>(null);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get('search')?.toString() || '';

        if (searchQuery.trim()) {
            router.visit(route('search', searchQuery.trim()));
        }
    };

    return (
        <div className="bg-background relative min-h-screen pb-20">
            {/* Header */}
            <header className="bg-background/30 fixed top-0 right-0 left-0 z-40 m-2 mx-auto max-w-6xl rounded-lg px-6 backdrop-blur-sm transition-all duration-300 lg:px-12">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-10 rounded-full fill-current text-white dark:text-black" />
                            </div>
                        </div>
                        {/* {activeSection && (
                            <div className="hidden text-lg font-medium md:block">
                                <span className="text-primary">{activeSection}</span>
                            </div>
                        )}
                        {!activeSection && breadcrumbs.length > 0 && (
                            <div className="hidden text-lg font-medium md:block">{breadcrumbs[breadcrumbs.length - 1].title}</div>
                        )} */}
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 items-center justify-center px-4 md:flex">
                        <div className="w-full max-w-xl">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="relative" ref={searchAnchorRef}>
                                    <button type="submit" className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2">
                                        <Search className="h-4 w-4" />
                                    </button>
                                    <Input
                                        type="search"
                                        name="search"
                                        placeholder="Rechercher..."
                                        className="bg-background/50 w-full rounded-full pl-9 backdrop-blur-sm"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <SearchCommandDialog
                        open={searchOpen}
                        onOpenChange={setSearchOpen}
                        anchorRef={searchAnchorRef as React.RefObject<HTMLDivElement>}
                    />

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="size-10 rounded-full p-1">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-10 rounded-full p-1">
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">

                                            <Image
                                                src={auth.user.photo || '/placeholder-avatar.jpg'}
                                                alt="Avatar"
                                                className="h-full w-full object-cover"
                                                width={40} // tu peux ajuster selon tes besoins
                                                height={40}
                                            />

                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{auth.user.name}</span>
                                            <span className="text-muted-foreground truncate text-xs">{auth.user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link className="flex w-full cursor-pointer items-center" href={route('profile.edit')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <AppearanceToggleDropdown />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link className="flex w-full cursor-pointer items-center" method="post" href={route('logout')}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Déconnexion
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="pt-20">
                <Toaster />
                {children}
            </main>

            <AppleStyleDock currentPath={currentPath} />
        </div>
    );
}

export function AppleStyleDock({ currentPath }: { currentPath?: string }) {
    return (
        <div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
            <Dock className="items-end pb-3">
                {data.map((item, idx) => {
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
                            className={`aspect-square rounded-full backdrop-blur-md ${isActive ? 'bg-primary/20 ring-primary dark:bg-primary/20 ring-2' : 'bg-gray-200/30 dark:bg-neutral-800/30'
                                }`}
                            href={item.href}
                        >
                            <DockLabel>{item.title}</DockLabel>
                            <DockIcon>
                                {React.cloneElement(item.icon, {
                                    className: `h-full w-full ${isActive ? 'text-primary dark:text-primary' : 'text-neutral-600 dark:text-neutral-300'
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
