import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { type ReactNode, useEffect, useRef } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const transform = useTransform(scrollY, [0, 1], [0, 1]);
    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const spring = useSpring(transform, physics);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const content = contentRef.current;

        if (!scroller || !content) return;

        const updateHeight = () => {
            document.body.style.height = `${content.scrollHeight}px`;
        };

        const onScroll = () => {
            if (scroller) {
                scroller.scrollTop = window.scrollY;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateHeight);

        updateHeight();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    useEffect(() => {
        const content = contentRef.current;

        return spring.onChange((latest) => {
            if (content) {
                content.style.transform = `translate3d(0, ${-latest * window.scrollY}px, 0)`;
            }
        });
    }, [spring]);

    return (
        <div ref={scrollerRef} className="fixed top-0 left-0 h-screen w-full overflow-hidden">
            <motion.div ref={contentRef} className="will-change-transform">
                {children}
            </motion.div>
        </div>
    );
}
