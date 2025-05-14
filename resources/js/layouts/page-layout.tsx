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
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, Component, HomeIcon, LogOut, Package, ScrollText, Settings, SunMoon } from 'lucide-react';
import { type ReactNode } from 'react';

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
        title: 'Activity',
        icon: <Activity className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '#',
    },
    {
        title: 'Change Log',
        icon: <ScrollText className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
        href: '#',
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
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <div className="relative min-h-screen pb-20">
            {/* Header */}
            <header className="bg-background/30 fixed top-0 right-0 left-0 z-40 border-b border-gray-200 backdrop-blur-sm dark:border-gray-800">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                            </div>
                            <div className="ml-2 hidden text-sm font-semibold sm:block">Laravel Starter Kit</div>
                        </div>
                        {breadcrumbs.length > 0 && (
                            <div className="hidden text-lg font-medium md:block">{breadcrumbs[breadcrumbs.length - 1].title}</div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <AppearanceToggleDropdown />
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

            <AppleStyleDock />
        </div>
    );
}

export function AppleStyleDock() {
    return (
        <div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
            <Dock className="items-end pb-3">
                {data.map((item, idx) => (
                    <DockItem key={idx} className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800" href={item.href}>
                        <DockLabel>{item.title}</DockLabel>
                        <DockIcon>{item.icon}</DockIcon>
                    </DockItem>
                ))}
            </Dock>
        </div>
    );
}
