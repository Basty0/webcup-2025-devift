import { CarouselGallery } from '@/components/carousel-gallery';
import { GalleryDetail } from '@/components/gallery-detail';
import ModelViewer from '@/components/model-viewer';
import ScrollableCard from '@/components/scrollable-card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
// import { type SharedData } from '@/types';
// import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    const galleryItems = [
        {
            id: '01',
            name: 'pickles',
            author: 'Omar Faruq Tawsif',
            bg: '#e4cdac',
            image: '/images/1.jpeg',
        },
        {
            id: '02',
            name: 'tea',
            author: 'Omar Faruq Tawsif',
            bg: '#f0f0f0',
            image: '/images/2.jpeg',
        },
        {
            id: '03',
            name: 'still',
            author: 'Omar Faruq Tawsif',
            bg: '#d1d1ca',
            image: '/images/3.jpeg',
        },
        {
            id: '04',
            name: 'nature',
            author: 'Omar Faruq Tawsif',
            bg: '#c9d6c9',
            image: '/images/4.jpeg',
        },
        {
            id: '05',
            name: 'abstract',
            author: 'Omar Faruq Tawsif',
            bg: '#e0d0e0',
            image: '/images/5.jpeg',
        },
    ];

    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleOpenItem = (id: string) => {
        setSelectedItem(id);
    };

    const handleCloseItem = () => {
        setSelectedItem(null);
    };

    const selectedGalleryItem = galleryItems.find((item) => item.id === selectedItem);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <h1 className="mb-4 text-2xl font-bold">Modèle 3D</h1>
            <div className="grid w-full grid-cols-2 gap-4 p-2">
                {/* <div className="flex w-1/2 flex-col gap-4">
                    <ModelViewer scale={0.08} url="/3d/tere.glb" />
                    <ModelViewer scale={3} url="/3d/tere2.glb" />
                </div> */}
                <div
                    className="bg-background flex h-80 w-full flex-col gap-4 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {/* <ModelViewer scale={3} url="/3d/earth (1).glb" /> */}
                    <ModelViewer scale={0.8} url="/3d/voiture.glb" />
                </div>
                <div
                    className="flex h-80 w-full flex-col gap-4 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {/* <ModelViewer scale={3} url="/3d/earth (1).glb" /> */}
                    <ModelViewer animate={true} scale={1.5} url="/3d/ordinateur.glb" />
                </div>
                <div
                    className="flex h-80 w-full flex-col gap-4 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {/* <ModelViewer scale={3} url="/3d/earth (1).glb" /> */}
                    <ModelViewer animate={true} scale={1.5} url="/3d/logo.glb" />
                </div>
            </div>

            <ScrollableCard />

            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="mb-12 text-3xl font-bold">Galerie d'Art</h1>

                <CarouselGallery items={galleryItems} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onOpenItem={handleOpenItem} />

                <Dialog open={!!selectedItem} onOpenChange={handleCloseItem}>
                    <DialogContent className="max-w-4xl overflow-hidden border-none bg-transparent p-0 shadow-2xl">
                        {selectedGalleryItem && (
                            <GalleryDetail name={selectedGalleryItem.name} author={selectedGalleryItem.author} image={selectedGalleryItem.image} />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
