import { motion, type MotionValue } from 'framer-motion';

interface ScrollProgressProps {
    progress: MotionValue<number>;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
    return <motion.div className="bg-primary fixed top-0 right-0 left-0 z-50 h-0.5 origin-left" style={{ scaleX: progress }} />;
}
