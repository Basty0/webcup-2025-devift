import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GalleryItem {
    id: string;
    name: string;
    author: string;
    bg: string;
    image: string;
}

interface CarouselGalleryProps {
    items: GalleryItem[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    onOpenItem: (id: string) => void;
}

export function CarouselGallery({ items, activeIndex, setActiveIndex, onOpenItem }: CarouselGalleryProps) {
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((activeIndex + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, isAutoPlaying, items.length, setActiveIndex]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    const handlePrev = () => {
        setActiveIndex((activeIndex - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setActiveIndex((activeIndex + 1) % items.length);
    };

    return (
        <div
            className="relative flex h-[500px] w-full max-w-5xl items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Button variant="outline" size="icon" className="absolute left-4 z-10 rounded-full" onClick={handlePrev}>
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    {items.map((item, index) => {
                        // Calculate position relative to active index
                        const position = (index - activeIndex + items.length) % items.length;

                        // Adjust for a 5-item carousel to make it circular
                        let adjustedPosition = position;
                        if (position > items.length / 2) adjustedPosition = position - items.length;

                        return (
                            <AnimatePresence key={item.id} mode="popLayout">
                                <motion.div
                                    key={item.id}
                                    initial={{
                                        scale: 0.8,
                                        opacity: 0.6,
                                        x: adjustedPosition * 300,
                                    }}
                                    animate={{
                                        scale: index === activeIndex ? 1 : 0.8,
                                        opacity: index === activeIndex ? 1 : 0.6,
                                        x: adjustedPosition * 300,
                                        zIndex: index === activeIndex ? 10 : 5 - Math.abs(adjustedPosition),
                                        filter: index === activeIndex ? 'brightness(1)' : 'brightness(0.7)',
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                        opacity: { duration: 0.2 },
                                    }}
                                    onClick={() => (index === activeIndex ? onOpenItem(item.id) : setActiveIndex(index))}
                                    className="absolute cursor-pointer"
                                    style={{ transformOrigin: 'center center' }}
                                >
                                    <div
                                        className="relative overflow-hidden rounded-4xl shadow-xl transition-all duration-300"
                                        style={{
                                            width: index === activeIndex ? 300 : 250,
                                            height: index === activeIndex ? 300 : 250,
                                        }}
                                    >
                                        <div className="relative aspect-square overflow-hidden">
                                            <img src={item.image || '/placeholder.svg'} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-3 text-white">
                                            <h2 className="truncate text-xl font-medium">{item.name}</h2>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="truncate text-gray-300">{item.author}</span>
                                                <span className="text-gray-400">/{item.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        );
                    })}
                </div>
            </div>

            <Button variant="outline" size="icon" className="absolute right-4 z-10 rounded-full" onClick={handleNext}>
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    );
}
