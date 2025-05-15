import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface StickyItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    index: number;
    active: boolean;
}

function StickyItem({ title, description, icon, color, active }: StickyItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm ${
                active ? 'scale-105' : 'scale-100'
            } transition-all duration-300`}
        >
            <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${color} mb-6 flex items-center justify-center`}>{icon}</div>
            <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
            <p className="text-white/80">{description}</p>
        </motion.div>
    );
}

interface StickySectionProps {
    image: string;
    title: string;
    subtitle: string;
    inView: boolean;
    items: {
        title: string;
        description: string;
        icon: React.ReactNode;
        color: string;
    }[];
}

export function StickySection({ image, title, subtitle, inView, items }: StickySectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Calculate which item should be active based on scroll position
    const activeIndex = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [0, 1, 2, 3, 4]);

    return (
        <div ref={sectionRef} className="relative min-h-[300vh]">
            {/* Title at the top */}
            <div className="sticky top-0 z-10 bg-black pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4 text-center text-3xl font-bold text-white md:text-5xl"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-center text-lg text-white/80"
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </div>

            {/* Content with sticky image */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
                        {/* Sticky image on the left */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="aspect-square overflow-hidden rounded-2xl">
                                <motion.div
                                    className="h-full w-full"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, 0, -2, 0],
                                    }}
                                    transition={{
                                        duration: 20,
                                        ease: 'easeInOut',
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: 'reverse',
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 mix-blend-overlay" />
                            </div>
                        </motion.div>

                        {/* Scrolling content on the right */}
                        <div className="space-y-8">
                            {items.map((item, i) => (
                                <StickyItem key={item.title} {...item} index={i} active={Math.round(activeIndex.get()) === i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
