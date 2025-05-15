'use client';

import CursorFollower from '@/components/cursor-follower';
import { DistortionEffect } from '@/components/distortion-effect';
import { HorizontalScrollGallery } from '@/components/horizontal-scroll-gallery';
import { MagneticButton } from '@/components/magnetic-button';
import { ParticleCanvas } from '@/components/particle-canvas';
import { ScrollProgress } from '@/components/scroll-progress';
import { SmoothScroll } from '@/components/smooth-scroll';
import { StickySection } from '@/components/sticky-section';
import TextReveal from '@/components/text-reveal';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Code, ExternalLink, Lightbulb, Menu, Play, Sparkles, Star, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [menuOpen, setMenuOpen] = useState(false);

    // Sections refs for animations
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    // Check if sections are in view
    const heroInView = useInView(heroRef, { once: false, amount: 0.5 });
    const aboutInView = useInView(aboutRef, { once: false, amount: 0.3 });
    const workInView = useInView(workRef, { once: false, amount: 0.3 });
    const processInView = useInView(processRef, { once: false, amount: 0.3 });
    const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 });
    const teamInView = useInView(teamRef, { once: false, amount: 0.3 });
    const blogInView = useInView(blogRef, { once: false, amount: 0.3 });
    const contactInView = useInView(contactRef, { once: false, amount: 0.3 });

    // Scroll progress for animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothScrollYProgress = useSpring(scrollYProgress, {
        damping: 15,
        stiffness: 100,
    });

    // Parallax and transform effects
    const heroY = useTransform(smoothScrollYProgress, [0, 0.25], [0, -150]);
    const heroOpacity = useTransform(smoothScrollYProgress, [0, 0.25], [1, 0]);
    const aboutScale = useTransform(smoothScrollYProgress, [0.15, 0.3], [0.8, 1]);
    const aboutOpacity = useTransform(smoothScrollYProgress, [0.15, 0.3], [0, 1]);
    const workRotate = useTransform(smoothScrollYProgress, [0.4, 0.6], [-5, 0]);
    const workScale = useTransform(smoothScrollYProgress, [0.4, 0.6], [0.9, 1]);

    // Mouse position for interactive elements
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Text animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 1.2,
                ease: [0.25, 1, 0.5, 1],
            },
        }),
    };

    // Project card animation variants
    const projectVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
            },
        }),
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    };

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

    const menuItems = [
        { name: 'Accueil', href: '#hero' },
        { name: 'À propos', href: '#about' },
        { name: 'Projets', href: '#work' },
        { name: 'Processus', href: '#process' },
        { name: 'Témoignages', href: '#testimonials' },
        { name: 'Équipe', href: '#team' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
    ];

    const projects = [
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
    ];

    const processSteps = [
        {
            title: 'Découverte',
            description: "Nous explorons vos besoins, objectifs et vision pour comprendre l'essence de votre projet.",
            icon: <Lightbulb className="h-8 w-8" />,
            color: 'from-amber-400 to-orange-500',
        },
        {
            title: 'Stratégie',
            description: 'Nous élaborons une stratégie sur mesure qui aligne vos objectifs avec les dernières tendances.',
            icon: <Zap className="h-8 w-8" />,
            color: 'from-emerald-400 to-teal-500',
        },
        {
            title: 'Création',
            description: 'Notre équipe conçoit et développe des solutions innovantes avec une attention méticuleuse aux détails.',
            icon: <Sparkles className="h-8 w-8" />,
            color: 'from-blue-400 to-indigo-500',
        },
        {
            title: 'Développement',
            description: 'Nous transformons les concepts en réalité avec un code propre et des technologies de pointe.',
            icon: <Code className="h-8 w-8" />,
            color: 'from-purple-400 to-violet-500',
        },
        {
            title: 'Lancement',
            description: 'Nous déployons votre projet et assurons une transition en douceur vers votre nouvelle présence numérique.',
            icon: <Play className="h-8 w-8" />,
            color: 'from-rose-400 to-pink-500',
        },
    ];

    const testimonials = [
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
    ];

    const teamMembers = [
        {
            name: 'Alexandre Moreau',
            position: 'Directeur Créatif',
            bio: "Visionnaire du design avec 10 ans d'expérience dans la création d'expériences numériques primées.",
            avatar: '/placeholder.svg?height=400&width=400',
            social: { twitter: '#', linkedin: '#', behance: '#' },
        },
        {
            name: 'Emma Laurent',
            position: 'Lead Developer',
            bio: 'Experte en technologies front-end qui transforme les concepts créatifs en expériences interactives fluides.',
            avatar: '/placeholder.svg?height=400&width=400',
            social: { twitter: '#', linkedin: '#', github: '#' },
        },
        {
            name: 'Lucas Bernard',
            position: 'Motion Designer',
            bio: "Spécialiste de l'animation qui donne vie aux interfaces avec des mouvements fluides et expressifs.",
            avatar: '/placeholder.svg?height=400&width=400',
            social: { twitter: '#', linkedin: '#', dribbble: '#' },
        },
        {
            name: 'Camille Petit',
            position: 'UX Strategist',
            bio: "Passionnée par la création d'expériences utilisateur intuitives et centrées sur l'humain.",
            avatar: '/placeholder.svg?height=400&width=400',
            social: { twitter: '#', linkedin: '#', medium: '#' },
        },
    ];

    const blogPosts = [
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
            excerpt: "Explorez comment l'intelligence artificielle transforme la façon dont nous concevons et interagissons avec les interfaces.",
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
    ];

    return (
        <SmoothScroll>
            <div ref={containerRef} className="relative">
                {isDesktop && <CursorFollower mouseX={mouseX} mouseY={mouseY} />}
                <ScrollProgress progress={smoothScrollYProgress} />

                {/* Navigation */}
                <header className="fixed top-0 left-0 z-50 w-full mix-blend-difference">
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
                </header>

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
                                        <motion.li
                                            key={item.name}
                                            custom={i}
                                            variants={menuItemVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                        >
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

                {/* Hero Section */}
                <section id="hero" ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
                    <ParticleCanvas />

                    <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 container mx-auto px-6">
                        <div className="mx-auto max-w-5xl">
                            <TextReveal
                                text="CRÉATIVITÉ SANS LIMITES"
                                className="mb-6 text-5xl leading-tight font-bold text-white md:text-8xl"
                                inView={heroInView}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="max-w-2xl"
                            >
                                <p className="mb-8 text-xl text-white/80 md:text-2xl">
                                    Nous créons des expériences numériques immersives qui repoussent les limites du design et de la technologie.
                                </p>

                                <MagneticButton>
                                    <Button size="lg" className="rounded-full bg-white px-8 text-black hover:bg-white/90">
                                        Découvrir
                                        <ArrowDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </MagneticButton>
                            </motion.div>
                        </div>
                    </motion.div>

                    <DistortionEffect progress={smoothScrollYProgress} />
                </section>

                {/* About Section */}
                <section id="about" ref={aboutRef} className="relative bg-black py-32 md:py-40">
                    <motion.div style={{ scale: aboutScale, opacity: aboutOpacity }} className="container mx-auto px-6">
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                    transition={{ duration: 1 }}
                                    className="relative"
                                >
                                    <div className="aspect-square overflow-hidden rounded-2xl">
                                        <motion.div
                                            className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500"
                                            animate={
                                                aboutInView
                                                    ? {
                                                          borderRadius: [
                                                              '60% 40% 30% 70%/60% 30% 70% 40%',
                                                              '30% 60% 70% 40%/50% 60% 30% 60%',
                                                              '60% 40% 30% 70%/60% 30% 70% 40%',
                                                          ],
                                                      }
                                                    : {}
                                            }
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
                                    custom={0}
                                    variants={titleVariants}
                                    initial="hidden"
                                    animate={aboutInView ? 'visible' : 'hidden'}
                                    className="mb-6 text-3xl font-bold text-white md:text-5xl"
                                >
                                    Notre approche
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    <p className="mb-6 text-lg text-white/80">
                                        Nous combinons design avant-gardiste, technologies émergentes et narration immersive pour créer des
                                        expériences numériques mémorables qui transcendent les attentes.
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
                                                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                    </motion.div>
                </section>

                {/* Work Section */}
                <section id="work" ref={workRef} className="relative bg-neutral-950 py-32 md:py-40">
                    <motion.div style={{ rotate: workRotate, scale: workScale }} className="container mx-auto px-6">
                        <motion.h2
                            custom={0}
                            variants={titleVariants}
                            initial="hidden"
                            animate={workInView ? 'visible' : 'hidden'}
                            className="mb-16 text-center text-3xl font-bold text-white md:text-5xl"
                        >
                            Projets sélectionnés
                        </motion.h2>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.title}
                                    custom={i}
                                    variants={projectVariants}
                                    initial="hidden"
                                    animate={workInView ? 'visible' : 'hidden'}
                                    whileHover="hover"
                                    className="group relative"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                                        <div
                                            className={cn(
                                                'absolute inset-0 bg-gradient-to-br',
                                                project.color,
                                                'opacity-80 transition-opacity duration-500 group-hover:opacity-90',
                                            )}
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

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileHover={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="rounded-full border-white text-white hover:bg-white hover:text-black"
                                                >
                                                    Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Process Section with Sticky Image */}
                <section id="process" ref={processRef} className="relative bg-black py-20 md:py-0">
                    <StickySection
                        image="/placeholder.svg?height=800&width=800"
                        title="Notre processus"
                        subtitle="Une approche méthodique pour des résultats exceptionnels"
                        inView={processInView}
                        items={processSteps}
                    />
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" ref={testimonialsRef} className="relative overflow-hidden bg-neutral-950 py-32 md:py-40">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 container mx-auto px-6"
                    >
                        <motion.h2
                            custom={0}
                            variants={titleVariants}
                            initial="hidden"
                            animate={testimonialsInView ? 'visible' : 'hidden'}
                            className="mb-16 text-center text-3xl font-bold text-white md:text-5xl"
                        >
                            Ce que disent nos clients
                        </motion.h2>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {testimonials.map((testimonial, i) => (
                                <motion.div
                                    key={testimonial.author}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ duration: 0.8, delay: 0.2 * i }}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                                >
                                    <div className="mb-4 flex items-center">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
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

                {/* Team Section */}
                <section id="team" ref={teamRef} className="relative bg-black py-32 md:py-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="container mx-auto px-6"
                    >
                        <motion.h2
                            custom={0}
                            variants={titleVariants}
                            initial="hidden"
                            animate={teamInView ? 'visible' : 'hidden'}
                            className="mb-6 text-center text-3xl font-bold text-white md:text-5xl"
                        >
                            Notre équipe
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mx-auto mb-16 max-w-3xl text-center text-lg text-white/80"
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
                                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                    <p className="mb-2 text-white/60">{member.position}</p>
                                    <p className="text-sm text-white/80">{member.bio}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Horizontal Scroll Gallery */}
                <section className="relative bg-neutral-950">
                    <HorizontalScrollGallery />
                </section>

                {/* Blog Section */}
                <section id="blog" ref={blogRef} className="relative bg-black py-32 md:py-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={blogInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="container mx-auto px-6"
                    >
                        <motion.h2
                            custom={0}
                            variants={titleVariants}
                            initial="hidden"
                            animate={blogInView ? 'visible' : 'hidden'}
                            className="mb-6 text-center text-3xl font-bold text-white md:text-5xl"
                        >
                            Dernières actualités
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mx-auto mb-16 max-w-3xl text-center text-lg text-white/80"
                        >
                            Découvrez nos réflexions sur les dernières tendances et innovations dans le monde du design numérique.
                        </motion.p>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {blogPosts.map((post, i) => (
                                <motion.div
                                    key={post.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ duration: 0.8, delay: 0.2 * i }}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className="group"
                                >
                                    <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
                                        <div
                                            className={cn(
                                                'absolute inset-0 bg-gradient-to-br',
                                                post.color,
                                                'opacity-80 transition-opacity duration-500 group-hover:opacity-90',
                                            )}
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
                                        Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Contact Section */}
                <section id="contact" ref={contactRef} className="relative overflow-hidden bg-neutral-950 py-32 md:py-40">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
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
                                className="mb-12 text-3xl leading-tight font-bold text-white md:text-6xl"
                                inView={contactInView}
                            />

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="mb-12 text-xl text-white/80"
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
                                    <Button size="lg" className="rounded-full bg-white px-8 text-black hover:bg-white/90">
                                        Contactez-nous
                                    </Button>
                                </MagneticButton>

                                <span className="text-white/60">ou</span>

                                <a href="mailto:hello@studio25.com" className="text-white transition-colors hover:text-white/80">
                                    hello@studio25.com
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Footer */}
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
            </div>
        </SmoothScroll>
    );
}
