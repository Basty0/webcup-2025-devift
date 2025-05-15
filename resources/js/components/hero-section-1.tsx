import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DistortionEffect } from './distortion-effect';
import { MagneticButton } from './magnetic-button';
import { ParticleCanvas } from './particle-canvas';
import TextReveal from './text-reveal';
import { Button } from './ui/button';

export function HeroSection() {
    const [heroInView, setHeroInView] = useState(true);
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll();
    const smoothScrollYProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    useEffect(() => {
        // Initialiser comme visible
        setHeroInView(true);

        const handleScroll = () => {
            // Vérifier si nous sommes près du haut de la page
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Si on est près du haut (<100px), on montre le texte
            // Sinon on le cache quand on scrolle vers le bas
            setHeroInView(scrollTop < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <AnimatePresence>
                {/* Hero Section */}
                <section id="hero" ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
                    <ParticleCanvas />

                    <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 container mx-auto px-6">
                        <div className="mx-auto max-w-5xl">
                            <TextReveal
                                text="CRÉATIVITÉ SANS LIMITES"
                                className="mb-6 text-5xl leading-tight font-bold md:text-8xl"
                                inView={heroInView}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="max-w-2xl"
                            >
                                <p className="mb-8 text-xl md:text-2xl">
                                    Nous créons des expériences numériques immersives qui repoussent les limites du design et de la technologie.
                                </p>

                                <MagneticButton>
                                    <Button className="rounded-full bg-white px-8 py-3 text-black hover:bg-white/90">
                                        Découvrir
                                        <ArrowDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </MagneticButton>
                            </motion.div>
                        </div>
                    </motion.div>

                    <DistortionEffect progress={smoothScrollYProgress} />
                </section>
            </AnimatePresence>
        </>
    );
}
