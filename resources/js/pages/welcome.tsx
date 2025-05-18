import { CarouselGallery } from '@/components/carousel-gallery';
import CursorFollower from '@/components/cursor-follower';
import { GalleryDetail } from '@/components/gallery-detail';
import { HeroSection } from '@/components/hero-section-1';
import { HorizontalScrollGallery } from '@/components/horizontal-scroll-gallery';
import { MagneticButton } from '@/components/magnetic-button';
import { ScrollProgress } from '@/components/scroll-progress';
import ScrollableCard from '@/components/scrollable-card';
import RevealImageSection from '@/components/sections/revealImage-section';
import TextReveal from '@/components/text-reveal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import LayoutApp from '@/layouts/layout-app';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PublicationsParTon from './publications-par-ton';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    const galleryItems = [
        {
            id: '01',
            name: 'pickles',
            author: 'Omar Faruq Tawsif',
            bg: '#e4cdac',
            image: '/images/1.jpeg',
        },
        {
            id: '02',
            name: 'tea',
            author: 'Omar Faruq Tawsif',
            bg: '#f0f0f0',
            image: '/images/2.jpeg',
        },
        {
            id: '03',
            name: 'still',
            author: 'Omar Faruq Tawsif',
            bg: '#d1d1ca',
            image: '/images/3.jpeg',
        },
        {
            id: '04',
            name: 'nature',
            author: 'Omar Faruq Tawsif',
            bg: '#c9d6c9',
            image: '/images/4.jpeg',
        },
        {
            id: '05',
            name: 'abstract',
            author: 'Omar Faruq Tawsif',
            bg: '#e0d0e0',
            image: '/images/5.jpeg',
        },
    ];

    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleOpenItem = (id: string) => {
        setSelectedItem(id);
    };

    const handleCloseItem = () => {
        setSelectedItem(null);
    };

    const isDesktop = useMediaQuery('(min-width: 768px)');
    const selectedGalleryItem = galleryItems.find((item) => item.id === selectedItem);

    // Mouse position for interactive elements
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Implémentation du suivi de défilement fluide
    const { scrollYProgress } = useScroll();
    const smoothScrollYProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Section refs et observation

    const teamRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const teamInView = useInView(teamRef, { once: false, amount: 0.3 });
    const contactInView = useInView(contactRef, { once: false, amount: 0.3 });

    // Gestionnaire global de suivi de la souris
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    // Menu items
    const menuItems = [
        { name: 'Accueil', href: '#hero' },
        { name: 'À propos', href: '#about' },
        { name: 'Projets', href: '#work' },
        { name: 'Témoignages', href: '#testimonials' },
        { name: 'Équipe', href: '#team' },
        { name: 'Contact', href: '#contact' }, { name: 'Processus', href: '#process' },

    ];

    // Menu animation variants
    const menuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        open: {
            opacity: 1,
            x: '0%',
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    const menuItemVariants = {
        closed: {
            opacity: 0,
            y: 50,
            transition: {
                duration: 0.5,
            },
        },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
            },
        }),
    };

    const teamMembers = [
        {
            name: 'Alexandre Moreau',
            position: 'Directeur Créatif',
            bio: "Visionnaire du design avec 10 ans d'expérience dans la création d'expériences numériques primées.",
            avatar: '/images/2.jpeg',
            social: { twitter: '#', linkedin: '#', behance: '#' },
        },
        {
            name: 'Emma Laurent',
            position: 'Lead Developer',
            bio: 'Experte en technologies front-end qui transforme les concepts créatifs en expériences interactives fluides.',
            avatar: '/images/3.jpeg',
            social: { twitter: '#', linkedin: '#', github: '#' },
        },
        {
            name: 'Lucas Bernard',
            position: 'Motion Designer',
            bio: "Spécialiste de l'animation qui donne vie aux interfaces avec des mouvements fluides et expressifs.",
            avatar: '/images/4.jpeg',
            social: { twitter: '#', linkedin: '#', dribbble: '#' },
        },
        {
            name: 'Camille Petit',
            position: 'UX Strategist',
            bio: "Passionnée par la création d'expériences utilisateur intuitives et centrées sur l'humain.",
            avatar: '/images/5.jpeg',
            social: { twitter: '#', linkedin: '#', medium: '#' },
        },
    ];

    return (
        <LayoutApp>
            {isDesktop && <CursorFollower mouseX={mouseX} mouseY={mouseY} />}
            <ScrollProgress progress={smoothScrollYProgress} />
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Navigation */}
            {/* <header className="fixed top-0 left-0 z-50 w-full mix-blend-difference">
                <div className="container mx-auto flex items-center justify-between px-6 py-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-xl font-bold text-white"
                    >
                        STUDIO.25
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="z-50 text-white"
                        aria-label="Menu"
                    >
                        <Menu size={24} />
                    </motion.button>
                </div>
            </header> */}

            {/* Fullscreen Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-40 flex items-center justify-center bg-black"
                    >
                        <div className="container mx-auto px-6">
                            <ul className="space-y-6 md:space-y-8">
                                {menuItems.map((item, i) => (
                                    <motion.li key={item.name} custom={i} variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                                        <a
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="text-4xl font-bold text-white transition-colors hover:text-gray-300 md:text-7xl"
                                        >
                                            {item.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section with Particle Canvas */}

            <HeroSection />


            <HorizontalScrollGallery mouseX={mouseX} mouseY={mouseY} />

            {/* Work Section
            <section id="work" className="relative bg-neutral-950 py-32 md:py-40">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-16 text-center text-3xl font-bold text-white md:text-5xl"
                    >
                        Projets sélectionnés
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                        {[
                            {
                                title: 'Néomorphisme 3D',
                                description: 'Une exploration des interfaces néomorphiques avec des interactions 3D avancées',
                                category: "Design d'interface",
                                image: '/placeholder.svg?height=600&width=800',
                                color: 'from-rose-400 to-orange-300',
                            },
                            {
                                title: 'Réalité Augmentée Web',
                                description: 'Expérience immersive combinant le monde réel et virtuel via le navigateur',
                                category: 'Technologie immersive',
                                image: '/placeholder.svg?height=600&width=800',
                                color: 'from-cyan-400 to-blue-500',
                            },
                            {
                                title: 'Intelligence Artificielle Créative',
                                description: 'Génération de contenu visuel et sonore par IA en temps réel',
                                category: 'IA & Design',
                                image: '/placeholder.svg?height=600&width=800',
                                color: 'from-violet-400 to-indigo-500',
                            },
                        ].map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.15 * i }}
                                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 transition-opacity duration-500 group-hover:opacity-90`}
                                    />

                                    <motion.div
                                        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                                        style={{
                                            backgroundImage: `url(${project.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8 }}
                                    />

                                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                                        <div>
                                            <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                                                {project.category}
                                            </span>
                                            <h3 className="mb-2 text-2xl font-bold text-white">{project.title}</h3>
                                            <p className="text-white/80">{project.description}</p>
                                        </div>

                                        <motion.div initial={{ opacity: 0, y: 20 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                            <Button
                                                variant="outline"
                                                className="rounded-full border-white text-white hover:bg-white hover:text-black"
                                            >
                                                Voir le projet
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}


            {/* <div className="grid w-full grid-cols-1 gap-4 p-2 md:grid-cols-2">
                <div
                    className="flex h-80 w-full flex-col gap-4 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <ModelViewer scale={0.8} url="/3d/voiture.glb" />
                </div>
                <div
                    className="flex h-80 w-full flex-col gap-4 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <ModelViewer animate={true} scale={1.5} url="/3d/ordinateur.glb" />
                </div>
                <div
                    className="flex h-80 w-full flex-col gap-4 rounded-2xl md:col-span-2"
                    style={{
                        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <ModelViewer animate={true} scale={1.5} url="/3d/logo.glb" />
                </div>
            </div> */}

            <div className="flex flex-col items-center justify-center p-4 md:hidden">
                <h1 className="font-poppins w-full max-w-[420px] text-5xl leading-tight font-bold md:text-[84px] md:leading-[88px] dark:text-white">
                    Votre Ton, C'est quoi ?
                </h1>
                <div className="font-poppins mt-8 w-full max-w-[420px] text-sm dark:text-gray-300">
                    <p>
                        Choisissez l’ambiance qui correspond à votre départ : dramatique, ironique, classe… Il y en a pour tous les styles !
                    </p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-5 h-auto rounded-full px-8 py-6 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        See More
                    </Button>
                </div>
            </div>

            <ScrollableCard />







            {/* Blog Section */}
            <section id="blog" className="relative bg-black py-32 md:py-40">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-6 text-center text-3xl font-bold text-white md:text-5xl"
                    >
                        Dernières actualités
                    </motion.h2>

                    
                    <main className="container mx-auto py-6 px-4">
                        <h1 className="text-2xl font-bold mb-6 text-center">Publications par Ton</h1>
                        <PublicationsParTon />
                    </main>

                </motion.div>
            </section>



            {/* Footer in dark style from home.tsx */}
            <footer className="border-t border-white/10 bg-black py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 text-xl font-bold text-white md:mb-0"
                        >
                            DEV iFT
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex space-x-8"
                        >
                            {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map((social) => (
                                <a key={social} href="#" className="text-white/60 transition-colors hover:text-white">
                                    {social}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-6 md:flex-row"
                    >
                        <p className="mb-4 text-sm text-white/60 md:mb-0">© 2025  DEV iFT.25. Tous droits réservés.</p>

                        <div className="flex space-x-6">
                            {['Politique de confidentialité', 'Mentions légales'].map((link) => (
                                <a key={link} href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </footer>
        </LayoutApp>
    );
}
