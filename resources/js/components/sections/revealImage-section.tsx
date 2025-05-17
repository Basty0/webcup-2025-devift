// components/RevealImageSection.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function RevealImageSection() {
    const { ref, inView } = useInView({
        triggerOnce: true, // Animation une seule fois
        threshold: 0.3, // Déclenche quand 30% est visible
    });

    return (
        <motion.section
            ref={ref}
            initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
            animate={inView ? { backgroundColor: '#f0f4f8' } : {}}
            transition={{ duration: 1 }}
            className="flex min-h-screen items-center justify-center"
        >
            <motion.img
                src="/images/3.jpeg"
                alt="Dévoilement"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1 }}
                className="h-64 w-64 rounded-xl object-cover shadow-lg"
            />
        </motion.section>
    );
}
