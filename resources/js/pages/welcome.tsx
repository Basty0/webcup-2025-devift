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
// import { type SharedData } from '@/types';
// import { Head, Link, usePage } from '@inertiajs/react';

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
        { name: 'Processus', href: '#process' },
        { name: 'Témoignages', href: '#testimonials' },
        { name: 'Équipe', href: '#team' },
        { name: 'Contact', href: '#contact' },
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
            <div>
                <div style={{ height: '100vh' }} />
                <RevealImageSection />
                <div style={{ height: '100vh' }} />
            </div>
            {/* About Section */}
            <section id="about" className="relative bg-black py-32 md:py-40">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <div className="aspect-square overflow-hidden rounded-2xl">
                                    <motion.div
                                        className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500"
                                        animate={{
                                            borderRadius: [
                                                '60% 40% 30% 70%/60% 30% 70% 40%',
                                                '30% 60% 70% 40%/50% 60% 30% 60%',
                                                '60% 40% 30% 70%/60% 30% 70% 40%',
                                            ],
                                        }}
                                        transition={{
                                            duration: 8,
                                            ease: 'easeInOut',
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: 'reverse',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                                className="mb-6 text-3xl font-bold text-white md:text-5xl"
                            >
                                Notre approche
                            </motion.h2>

                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                                <p className="mb-6 text-lg text-white/80">
                                    Nous combinons design avant-gardiste, technologies émergentes et narration immersive pour créer des expériences
                                    numériques mémorables qui transcendent les attentes.
                                </p>

                                <p className="mb-8 text-lg text-white/80">
                                    Notre studio se spécialise dans la création d'interfaces utilisateur innovantes, d'animations fluides et
                                    d'interactions intuitives qui captivent et engagent.
                                </p>

                                <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {[
                                        'Design UI/UX',
                                        'Animation 3D',
                                        'Développement',
                                        'Réalité Augmentée',
                                        'Intelligence Artificielle',
                                        'Motion Design',
                                    ].map((skill, i) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                            className="rounded-lg bg-white/5 px-4 py-3 backdrop-blur-sm"
                                        >
                                            <p className="text-sm text-white/90">{skill}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            <HorizontalScrollGallery mouseX={mouseX} mouseY={mouseY} />

            {/* Work Section */}
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
            </section>

            <h1 className="mb-4 text-2xl font-bold dark:text-white">Modèle 3D</h1>
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
                    Our Features
                </h1>
                <div className="font-poppins mt-8 w-full max-w-[420px] text-sm dark:text-gray-300">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente qui quis, facere, cupiditate, doloremque natus ex
                        perspiciatis ratione hic corrupti adipisci ea doloribus!
                    </p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-5 h-auto rounded-full px-8 py-6 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        See More Details
                    </Button>
                </div>
            </div>

            <ScrollableCard />

            {/* Testimonials Section */}
            <section id="testimonials" className="relative overflow-hidden bg-neutral-950 py-32 md:py-40">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 container mx-auto px-6"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-16 text-center text-3xl font-bold text-white md:text-5xl"
                    >
                        Ce que disent nos clients
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                quote: 'Studio.25 a transformé notre vision en une expérience numérique exceptionnelle qui a dépassé toutes nos attentes.',
                                author: 'Marie Dubois',
                                position: 'Directrice Marketing, TechVision',
                                avatar: '/placeholder.svg?height=100&width=100',
                                rating: 5,
                            },
                            {
                                quote: 'Leur approche créative et leur maîtrise technique ont permis de créer un site qui se démarque vraiment dans notre secteur.',
                                author: 'Thomas Martin',
                                position: 'CEO, InnovateLab',
                                avatar: '/placeholder.svg?height=100&width=100',
                                rating: 5,
                            },
                            {
                                quote: "L'équipe a su capturer l'essence de notre marque et la traduire en une expérience utilisateur fluide et mémorable.",
                                author: 'Sophie Leclerc',
                                position: 'Directrice Artistique, DesignCraft',
                                avatar: '/placeholder.svg?height=100&width=100',
                                rating: 5,
                            },
                        ].map((testimonial, i) => (
                            <motion.div
                                key={testimonial.author}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 * i }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                            >
                                <div className="mb-4 flex items-center">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="mb-6 text-white/90 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center">
                                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                                        <img
                                            src={testimonial.avatar || '/placeholder.svg'}
                                            alt={testimonial.author}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{testimonial.author}</h4>
                                        <p className="text-sm text-white/60">{testimonial.position}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="mb-12 text-3xl font-bold dark:text-white">Galerie d'Art</h1>

                <CarouselGallery items={galleryItems} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onOpenItem={handleOpenItem} />

                <Dialog open={!!selectedItem} onOpenChange={handleCloseItem}>
                    <DialogContent className="max-w-4xl overflow-hidden border-none bg-transparent p-0 shadow-2xl">
                        {selectedGalleryItem && (
                            <GalleryDetail name={selectedGalleryItem.name} author={selectedGalleryItem.author} image={selectedGalleryItem.image} />
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Team Section */}
            <section id="team" ref={teamRef} className="relative bg-gray-50 py-20 md:py-32 dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="container mx-auto px-6"
                >
                    <motion.h2
                        initial="hidden"
                        animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-6 text-center text-3xl font-bold text-gray-900 md:text-5xl dark:text-white"
                    >
                        Notre équipe
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto mb-16 max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300"
                    >
                        Des experts passionnés qui repoussent les limites de la créativité et de l'innovation.
                    </motion.p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 50 }}
                                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.8, delay: 0.2 * i }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group"
                            >
                                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl">
                                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <motion.img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute right-0 bottom-0 left-0 translate-y-full p-6 transition-transform duration-300 group-hover:translate-y-0">
                                        <div className="flex justify-center space-x-4">
                                            {Object.keys(member.social).map((platform) => (
                                                <a
                                                    key={platform}
                                                    href={member.social[platform as keyof typeof member.social]}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/40"
                                                >
                                                    <span className="text-xs text-white capitalize">{platform[0]}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="mb-2 text-gray-600 dark:text-gray-400">{member.position}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

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

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto mb-16 max-w-3xl text-center text-lg text-white/80"
                    >
                        Découvrez nos réflexions sur les dernières tendances et innovations dans le monde du design numérique.
                    </motion.p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "L'avenir du design d'interface en 2025",
                                excerpt: "Découvrez les tendances émergentes qui façonneront l'avenir du design numérique dans les années à venir.",
                                date: '15 Mai 2025',
                                category: 'Design Trends',
                                image: '/placeholder.svg?height=600&width=800',
                                color: 'from-purple-400 to-indigo-500',
                            },
                            {
                                title: "Comment l'IA révolutionne l'expérience utilisateur",
                                excerpt:
                                    "Explorez comment l'intelligence artificielle transforme la façon dont nous concevons et interagissons avec les interfaces.",
                                date: '28 Avril 2025',
                                category: 'Intelligence Artificielle',
                                image: '/placeholder.svg?height=600&width=800',
                                color: 'from-emerald-400 to-teal-500',
                            },
                            {
                                title: "Le rôle de l'animation dans l'engagement utilisateur",
                                excerpt: "Analyse approfondie de l'impact des animations sur l'expérience utilisateur et l'engagement.",
                                date: '10 Avril 2025',
                                category: 'Motion Design',
                                image: '/placeholder.svg?height=600&width=800',
                                color: 'from-amber-400 to-orange-500',
                            },
                        ].map((post, i) => (
                            <motion.div
                                key={post.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 * i }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group"
                            >
                                <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-80 transition-opacity duration-500 group-hover:opacity-90`}
                                    />
                                    <motion.div
                                        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                                        style={{
                                            backgroundImage: `url(${post.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8 }}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-2 text-sm text-white/60">{post.date}</div>
                                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-white/80">{post.title}</h3>
                                <p className="mb-4 text-white/80">{post.excerpt}</p>
                                <Button variant="link" className="h-auto p-0 font-medium text-white transition-colors hover:text-white/80">
                                    Lire l'article <span className="ml-2">→</span>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact" ref={contactRef} className="relative overflow-hidden bg-gray-100 py-20 md:py-32 dark:bg-gray-950">
                <div className="absolute inset-0 opacity-10 dark:opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200 dark:to-black" />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 container mx-auto px-6"
                >
                    <div className="mx-auto max-w-4xl text-center">
                        <TextReveal
                            text="COMMENÇONS QUELQUE CHOSE D'EXTRAORDINAIRE"
                            className="mb-12 text-3xl leading-tight font-bold text-gray-900 md:text-5xl dark:text-white"
                            inView={contactInView}
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mb-12 text-lg text-gray-700 md:text-xl dark:text-gray-300"
                        >
                            Prêt à transformer votre vision en réalité numérique ? Contactez-nous pour discuter de votre prochain projet.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="flex flex-col items-center justify-center gap-6 md:flex-row"
                        >
                            <MagneticButton>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 dark:bg-white dark:text-black dark:hover:bg-white/90">
                                    Contactez-nous
                                </Button>
                            </MagneticButton>

                            <span className="text-gray-500 dark:text-gray-400">ou</span>

                            <a
                                href="mailto:hello@studio25.com"
                                className="text-gray-900 transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            >
                                hello@studio25.com
                            </a>
                        </motion.div>
                    </div>
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
                            STUDIO.25
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
                        <p className="mb-4 text-sm text-white/60 md:mb-0">© 2025 Studio.25. Tous droits réservés.</p>

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
