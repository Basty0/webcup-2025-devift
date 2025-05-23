import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import React, { type ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
interface AppLayoutProps {
    children: ReactNode;
}

interface User {
    id: number;
    name: string;
    email: string;
}
const menuVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
        },
    }),
};
export default ({ children }: AppLayoutProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleClick = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            // Scroll doux vers la cible
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        // Détecter le thème initial
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);

        // Observer les changements de thème
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    setIsDarkMode(isDark);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="min-h-screen"
            style={{
                background: isDarkMode
                    ? 'linear-gradient(135deg, oklch(0.12 0.03 240), oklch(0.15 0.05 280), oklch(0.145 0 0))'
                    : 'linear-gradient(135deg, oklch(0.97 0.02 240), oklch(0.98 0.04 260), oklch(1 0 0))',
            }}
        >
            <HeroHeader />
            {children}
        </div>
    );
};

const menuItems = [
    { name: 'Tons', id: 'Tons' },
    { name: 'TheEndPost', id: 'TheEndPost' },
    { name: 'À propos', id: 'apropos' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { auth } = usePage<{ auth?: { user: User | null } }>().props;
    const isAuthenticated = auth && auth.user;

    const handleClick = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header>
            <nav data-state={menuState && 'active'} className="group fixed z-20 w-full px-2">
                <div
                    className={cn(
                        'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                        isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5',
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                <AppLogo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Fermer Menu' : 'Ouvrir Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 in-data-[state=active]:rotate-180" />
                                <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 group-data-[state=active]:scale-100 group-data-[state=active]:rotate-0 group-data-[state=active]:opacity-100" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className="cursor-pointer"
                                        variants={menuVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        custom={index}
                                        onClick={() => handleClick(item.id)}
                                    >
                                        <span>{item.name}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:group-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <span className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer" onClick={() => handleClick(item.id)}>{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                {isAuthenticated ? (
                                    <Button asChild size="sm">
                                        <Link href="/dashboard">
                                            <span>Tableau de bord</span>
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button asChild variant="outline" size="sm" className={cn(isScrolled && 'lg:hidden')}>
                                            <Link href="/login">
                                                <span>Connexion</span>
                                            </Link>
                                        </Button>
                                        <Button asChild size="sm" className={cn(isScrolled && 'lg:hidden')}>
                                            <Link href="/register">
                                                <span>Inscription</span>
                                            </Link>
                                        </Button>
                                        <Button asChild size="sm" className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                            <Link href="/register">
                                                <span>Commencer</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                                <AppearanceToggleDropdown />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
