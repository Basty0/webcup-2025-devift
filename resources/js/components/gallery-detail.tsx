'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GalleryDetailProps {
    name: string;
    author: string;
    image: string;
}

export function GalleryDetail({ name, author, image }: GalleryDetailProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative overflow-hidden"
        >
            <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-medium"
                    >
                        {name}
                    </motion.h1>
                    <div className="flex flex-col items-end">
                        {/* <motion.span initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm">
                            /{id}
                        </motion.span> */}
                        <motion.span initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-xs">
                            {author}
                        </motion.span>
                    </div>
                </div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="relative aspect-square overflow-hidden rounded-md"
                >
                    <img src={image || '/placeholder.svg'} alt={name} className="h-full w-full object-cover" />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 flex items-center justify-between"
                >
                    <p className="text-sm">Artwork by {author}</p>
                    <Button variant="ghost" size="sm" className="">
                        View more
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}
