import { motion, MotionValue, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface HorizontalScrollGalleryProps {
    mouseX?: MotionValue<number>;
    mouseY?: MotionValue<number>;
}

export function HorizontalScrollGallery({ mouseX, mouseY }: HorizontalScrollGalleryProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    // Valeurs par défaut si les props ne sont pas fournies
    const localMouseX = useMotionValue(0);
    const localMouseY = useMotionValue(0);

    // Mettre à jour la position de la souris locale si nécessaire
    useEffect(() => {
        if (mouseX && mouseY) return; // Si les props sont fournies, on ne fait rien

        const handleMouseMove = (e: MouseEvent) => {
            localMouseX.set(e.clientX);
            localMouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Optimiser la transformation horizontale pour un défilement plus fluide
    const x = useTransform(scrollYProgress, [0, 1], ['5%', '-80%']);

    // Transformation pour l'inclinaison du conteneur
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], ['3deg', '0deg', '-2deg']);
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], ['-5deg', '0deg', '5deg']);
    const perspective = useTransform(scrollYProgress, [0, 1], [1000, 1500]);

    // Animations pour les cartes
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0],
            },
        },
    };

    const projects = [
        {
          title: 'Dramatique',
          description: 'Un départ intense et chargé d’émotion.',
          image: 'https://i.pinimg.com/1200x/d3/59/72/d359725a65ed20b4cd181720428f1e09.jpg',
          color: 'from-blue-500 to-indigo-800',
        },
        {
          title: 'Ironique',
          description: 'Du sarcasme et des punchlines jusqu’au bout.',
          image: 'https://i.pinimg.com/1200x/04/f7/42/04f7421de820d28176d2c3fb38d977b9.jpg',
          color: 'from-yellow-400 to-red-500',
        },
        {
          title: 'Classe',
          description: 'Tu pars avec dignité et style.',
          image: 'https://i.pinimg.com/1200x/c3/ca/b5/c3cab5b336680ea41f335662669c6201.jpg',
          color: 'from-gray-700 to-black',
        },
        {
          title: 'Poétique',
          description: 'L’adieu mystérieux et poétique.',
          image: 'https://i.pinimg.com/1200x/f4/58/63/f45863bde5ff7c6ed7e05bfbc9839bde.jpg',
          color: 'from-purple-400 to-indigo-700',
        },
        {
          title: 'Rageur',
          description: 'Tu balances tout avant de claquer la porte.',
          image: 'https://i.pinimg.com/1200x/cd/d5/90/cdd590f1201e7349e341a479d1469e9a.jpg',
          color: 'from-red-600 to-orange-700',
        },
        {
          title: 'Humoristique',
          description: 'Un départ qui fait rire même les collègues relous.',
          image: 'https://i.pinimg.com/1200x/f3/3e/ba/f33eba0f9d862c1e31a976f693c963d4.jpg',
          color: 'from-pink-400 to-rose-600',
        },
        {
          title: 'Chaleureux',
          description: 'Un message tendre pour dire au revoir.',
          image: 'https://i.pinimg.com/1200x/05/4f/26/054f264ee6f231386b882154261b1c54.jpg',
          color: 'from-orange-300 to-amber-500',
        },
        {
          title: 'Mystérieux',
          description: 'Tu quittes la scène sans tout expliquer.',
          image: 'https://i.pinimg.com/1200x/d0/87/48/d08748c0d809238169a9b55eae868e79.jpg',
          color: 'from-gray-500 to-slate-800',
        },
        {
          title: 'Zen',
          description: 'Un départ tout en sérénité et en paix.',
          image: 'https://i.pinimg.com/1200x/ac/1c/8a/ac1c8ab20d9736068b8f5ee2128d59da.jpg',
          color: 'from-emerald-300 to-teal-500',
        },
      ];

    return (
        <div
            ref={containerRef}
            className="relative h-[400vh]"
            onMouseMove={(e) => {
                if (mouseX) mouseX.set(e.clientX);
                if (mouseY) mouseY.set(e.clientY);
            }}
        >
            {/* Titre de section fixe */}
            <div className="sticky top-0 flex h-screen items-center justify-start overflow-hidden">
                <div className="absolute top-20 left-0 z-10 w-full px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl dark:text-white">Nos Tons</h2>
                    <p className="mx-auto max-w-md text-gray-700 dark:text-gray-300">
                        Découvrez notre portfolio de projets innovants qui repoussent les limites du design et de la technologie.
                    </p>
                </div>

                {/* Conteneur de défilement horizontal avec inclinaison */}
                <motion.div
                    style={{
                        x,
                        rotateX,
                        rotateY,
                        perspective,
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center center',
                    }}
                    className="flex items-center space-x-6 pt-30 pb-16 pl-[10vw] md:pt-60"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            className="relative h-[50vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-xl shadow-2xl md:h-[60vh] md:w-[35vw] lg:w-[30vw]"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.03,
                                rotateY: '5deg',
                                z: 50,
                                transition: { duration: 0.3 },
                            }}
                            style={{
                                transformStyle: 'preserve-3d',
                            }}
                            onMouseEnter={() => {
                                document.body.style.cursor = 'pointer';
                            }}
                            onMouseLeave={() => {
                                document.body.style.cursor = 'auto';
                            }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 dark:opacity-90`} />
                            <motion.div
                                className="absolute inset-0 opacity-30 dark:opacity-20"
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8 }}
                            />
                            <motion.div
                                className="absolute inset-0 flex flex-col justify-end p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <span className="mb-4 inline-block w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm dark:bg-black/20">
                                    {project.description}
                                </span>
                                <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
