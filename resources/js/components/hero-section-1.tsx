import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DistortionEffect } from './distortion-effect';
import { MagneticButton } from './magnetic-button';
import { ParticleCanvas } from './particle-canvas';
import TextReveal from './text-reveal';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
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
                        <div className="flex items-center gap-2">
                            <div className="mx-auto max-w-full">
                                <TextReveal
                                    text="Tu pars ? Laisse une trace."
                                    className="mb-6 text-6xl leading-tight font-extrabold md:text-7xl text-center"
                                    inView={heroInView}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="w-full text-center"
                                >
                                   <p className="mb-8 text-xl md:text-2xl font-sans font-bold ">
                                    Crée ta page de fin personnalisée, drôle ou touchante, pour marquer les esprits une dernière fois.
                                    </p>
                                    
  


                                    <MagneticButton>
                                        <Button className='bg-primary' size={'lg'} variant={'border'}>
                                            <Link href={'/exprimer-vous'}>Créer ma TheEndPage</Link>
                                        
                                            
                                        </Button>
                                    </MagneticButton>
                                </motion.div>
                            </div>
                            
                        </div>
                    </motion.div>

                    <DistortionEffect progress={smoothScrollYProgress} />
                </section>
            </AnimatePresence>
        </>
    );
}
