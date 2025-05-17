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
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell, Component, HomeIcon, LogOut, Package, Plus, Search, Settings, SunMoon, UserRound } from 'lucide-react';
import React, { type ReactNode } from 'react';
import SearchCommandDialog from '@/components/ui/SearchCommandDialog';

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
        title: 'Products',
        icon: <Package className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '#',
    },
    {
        title: 'Components',
        icon: <Component className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '#',
    },
    {
        title: 'Creer un TheEnd',
        icon: <Plus className="h-10 w-10 rounded-full text-neutral-600 dark:text-neutral-300" />,
        href: '/theends/create',
    },
    {
        title: 'Profil',
        icon: <UserRound className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '/profil',
    },
    {
        title: 'Paramètres',
        icon: <Settings className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '/settings',
    },
    {
        title: 'Theme',
        icon: <SunMoon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '#',
    },
];

export default function PageLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    const { auth, ziggy } = usePage<SharedData>().props;
    const getInitials = useInitials();

    // Récupérer le chemin actuel de l'URL
    const currentPath = ziggy?.location;

    // Ajout pour la recherche
    const [searchOpen, setSearchOpen] = React.useState(false);

    return (
        <div className="bg-background relative min-h-screen pb-20">
            {/* Header */}
            <header className="bg-background/30 fixed top-0 right-0 left-0 z-40 m-2 mx-auto max-w-6xl rounded-lg px-6 backdrop-blur-sm transition-all duration-300 lg:px-12">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                            </div>
                        </div>
                        {breadcrumbs.length > 0 && (
                            <div className="hidden text-lg font-medium md:block">{breadcrumbs[breadcrumbs.length - 1].title}</div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="hidden flex-1 items-center justify-center px-4 md:flex">
                        <div className="w-full max-w-xl">
                            <div className="relative">
                                <button
                                    type="button"
                                    className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    onClick={() => setSearchOpen(true)}
                                    tabIndex={-1}
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                                <Input
                                    type="search"
                                    placeholder="Rechercher..."
                                    className="bg-background/50 w-full rounded-full pl-9 backdrop-blur-sm"
                                    onFocus={() => setSearchOpen(true)}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <SearchCommandDialog open={searchOpen} onOpenChange={setSearchOpen} />

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
                                            {getInitials(auth.user.name)}
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
            <main className="pt-20">{children}</main>

            <AppleStyleDock currentPath={currentPath} />
        </div>
    );
}

export function AppleStyleDock({ currentPath }: { currentPath?: string }) {
    return (
        <div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
            <Dock className="items-end pb-3">
                {data.map((item, idx) => {
                    // Vérifier si cet élément est actif en comparant son href avec l'URL actuelle
                    const isActive = currentPath && item.href !== '#' && currentPath.startsWith(item.href);

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
