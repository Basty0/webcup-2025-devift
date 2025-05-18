import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center rounded-full lg:hidden">
                        <AppLogoIcon className="h-20 rounded-full fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
            <div className="relative hidden h-full flex-col p-10 text-white backdrop-blur-sm lg:flex">
                <div
                    className="absolute inset-0 m-4 rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/9.jpg')" }}
                />
                <Link
                    href={route('home')}
                    className="relative z-20 flex items-center rounded-full bg-black/40 p-2 text-lg font-medium backdrop-blur-md"
                >
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    The End - Votre dernier au revoir
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-4">
                            <p className="text-lg leading-relaxed italic">
                                &ldquo;Chaque fin est un nouveau départ. Laissez votre message pour l'éternité. Dans ce monde numérique en constante
                                évolution, nous vous offrons un espace unique pour partager vos dernières pensées, vos souvenirs les plus précieux, et
                                créer un héritage digital qui traversera le temps. Car chaque histoire mérite d'être racontée, chaque vie mérite
                                d'être célébrée.&rdquo;
                            </p>
                            <footer className="text-sm text-neutral-300">- The End, votre compagnon dans l'éternité digitale</footer>
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    );
}
