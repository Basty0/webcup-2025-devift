import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageLayout from '@/layouts/page-layout';
import { Theend } from '@/types/theend';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Organize all images from different tones into a single array
const getAllImages = () => {
    const allImages: MediaItem[] = [];

    // Extract all images from media by tone
    Object.values(mediaByTone).forEach((toneItems) => {
        const images = toneItems.filter((item) => item.type === 'image');
        allImages.push(...images);
    });

    return allImages;
};

// Médias organisés par ton
const mediaByTone: Record<string, MediaItem[]> = {
    dramatique: [
        { id: 'dramatique1', url: '/media/dramatique/image1.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique2', url: '/media/dramatique/image2.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique3', url: '/media/dramatique/image3.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique4', url: '/media/dramatique/image4.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique5', url: '/media/dramatique/image5.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique6', url: '/media/dramatique/image6.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique7', url: '/media/dramatique/gif1.gif', tone: 'dramatique', type: 'gif' },
        { id: 'dramatique8', url: '/media/dramatique/sound1.mp3', tone: 'dramatique', type: 'sound' },
    ],
    ironique: [
        { id: 'ironique1', url: '/media/ironique/image1.jpg', tone: 'ironique', type: 'image' },
        { id: 'ironique2', url: '/media/ironique/image2.jpg', tone: 'ironique', type: 'image' },
        { id: 'ironique3', url: '/media/ironique/gif1.gif', tone: 'ironique', type: 'gif' },
        { id: 'ironique4', url: '/media/ironique/sound1.mp3', tone: 'ironique', type: 'sound' },
    ],
    cringe: [
        { id: 'cringe1', url: '/media/cringe/image1.jpg', tone: 'cringe', type: 'image' },
        { id: 'cringe2', url: '/media/cringe/image2.jpg', tone: 'cringe', type: 'image' },
        { id: 'cringe3', url: '/media/cringe/image3.jpg', tone: 'cringe', type: 'image' },
        { id: 'cringe4', url: '/media/cringe/image4.jpg', tone: 'cringe', type: 'image' },
        { id: 'cringe5', url: '/media/cringe/image5.jpg', tone: 'cringe', type: 'image' },
        { id: 'cringe6', url: '/media/cringe/image6.jpg', tone: 'cringe', type: 'image' },
        { id: 'cringe7', url: '/media/cringe/gif1.gif', tone: 'cringe', type: 'gif' },
        { id: 'cringe8', url: '/media/cringe/sound1.mp3', tone: 'cringe', type: 'sound' },
    ],
    classe: [
        { id: 'classe1', url: '/media/classe/image1.jpg', tone: 'classe', type: 'image' },
        { id: 'classe2', url: '/media/classe/image2.jpg', tone: 'classe', type: 'image' },
        { id: 'classe3', url: '/media/classe/image3.jpg', tone: 'classe', type: 'image' },
        { id: 'classe4', url: '/media/classe/image4.jpg', tone: 'classe', type: 'image' },
        { id: 'classe5', url: '/media/classe/image5.jpg', tone: 'classe', type: 'image' },
        { id: 'classe6', url: '/media/classe/image6.jpg', tone: 'classe', type: 'image' },
        { id: 'classe7', url: '/media/classe/gif1.gif', tone: 'classe', type: 'gif' },
        { id: 'classe8', url: '/media/classe/sound1.mp3', tone: 'classe', type: 'sound' },
    ],
    touchant: [
        { id: 'touchant1', url: '/media/touchant/image1.jpg', tone: 'touchant', type: 'image' },
        { id: 'touchant2', url: '/media/touchant/image2.jpg', tone: 'touchant', type: 'image' },
        { id: 'touchant3', url: '/media/touchant/image3.jpg', tone: 'touchant', type: 'image' },
        { id: 'touchant4', url: '/media/touchant/image4.jpg', tone: 'touchant', type: 'image' },
        { id: 'touchant5', url: '/media/touchant/gif1.gif', tone: 'touchant', type: 'gif' },
        { id: 'touchant6', url: '/media/touchant/sound1.mp3', tone: 'touchant', type: 'sound' },
    ],
    absurde: [
        { id: 'absurde1', url: '/media/absurde/image1.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde2', url: '/media/absurde/image2.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde3', url: '/media/absurde/image3.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde4', url: '/media/absurde/image4.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde5', url: '/media/absurde/image5.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde7', url: '/media/absurde/gif1.gif', tone: 'absurde', type: 'gif' },
        { id: 'absurde6', url: '/media/absurde/sound1.mp3', tone: 'absurde', type: 'sound' },
    ],
    passif_agressif: [
        { id: 'passif_agressif1', url: '/media/passif_agressif/image1.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif2', url: '/media/passif_agressif/image2.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif3', url: '/media/passif_agressif/image3.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif4', url: '/media/passif_agressif/image4.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif5', url: '/media/passif_agressif/image5.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif3', url: '/media/passif_agressif/gif1.gif', tone: 'passif_agressif', type: 'gif' },
        { id: 'passif_agressif4', url: '/media/passif_agressif/sound1.mp3', tone: 'passif_agressif', type: 'sound' },
    ],
    honnête: [
        { id: 'honnête1', url: '/media/honnête/image1.jpg', tone: 'honnête', type: 'image' },
        { id: 'honnête2', url: '/media/honnête/image2.jpg', tone: 'honnête', type: 'image' },
        { id: 'honnête3', url: '/media/honnête/image3.jpg', tone: 'honnête', type: 'image' },
        { id: 'honnête4', url: '/media/honnête/image4.jpg', tone: 'honnête', type: 'image' },
        { id: 'honnête5', url: '/media/honnête/gif1.gif', tone: 'honnête', type: 'gif' },
        { id: 'honnête6', url: '/media/honnête/sound1.mp3', tone: 'honnête', type: 'sound' },
    ],
};

interface Step3Props {
    theend: Theend;
}

interface MediaItem {
    id: string;
    url: string;
    tone: string;
    type: 'image' | 'gif' | 'sound';
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function Step3({ theend }: Step3Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Stocker des informations sur l'upload pour les images uniquement
    const [uploadedImage, setUploadedImage] = useState<{ file: File | null; previewUrl: string | null }>({
        file: null,
        previewUrl: null,
    });

    const { data, setData, post, errors } = useForm({
        image_url: theend.image_url || '',
        is_public: theend.is_public ?? true,
        image: null as File | null,
        // Explicitly set these values to null to override any existing values
        sound_url: null,
        gif_url: null,
    });

    // Get all images to display
    const allImages = getAllImages();

    // Tone-specific images shown first
    const toneImages = mediaByTone[theend.tone]?.filter((m) => m.type === 'image') || [];
    const otherImages = allImages.filter((img) => img.tone !== theend.tone);

    // Combine images with tone-specific first
    const sortedImages = [...toneImages, ...otherImages];

    // Pre-select media based on tone when component loads
    useEffect(() => {
        const toneMedia = mediaByTone[theend.tone] || [];
        const defaultMedia = toneMedia.find((m) => m.type === 'image');

        // Don't replace selection if user already chose an image
        if (defaultMedia && !data.image_url) {
            setData('image_url', defaultMedia.url);
        }
    }, [theend.tone]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create form data explicitly to control what's being sent
        const formData = new FormData();
        formData.append('image_url', data.image_url);
        formData.append('is_public', data.is_public ? '1' : '0');

        // Add image file if it exists
        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        // Explicitly set sound_url and gif_url to null
        formData.append('sound_url', '');
        formData.append('gif_url', '');

        post(`/exprimer-vous/step3/${theend.slug}`, {
            _method: 'POST',
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            data: formData,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadedImage({ file, previewUrl: url });

            // Clear previously selected image URL if from predefined options
            if (data.image_url.startsWith('/media/')) {
                setData('image_url', '');
            }

            // Set the image file for form submission
            setData('image', file);
        }
    };

    // Check if a specific image is selected
    const isImageSelected = (url: string) => {
        return data.image_url === url;
    };

    // Select a predefined image
    const selectPredefinedImage = (url: string) => {
        // Clear uploaded file
        setUploadedImage({ file: null, previewUrl: null });
        setData('image', null);
        setData('image_url', url);
    };

    return (
        <PageLayout>
            <motion.div className="mx-auto max-w-4xl p-6" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div className="mb-8 text-center" variants={itemVariants}>
                    {/* Display selected image at the top if available, otherwise show default image */}
                    <div className="relative overflow-hidden rounded-lg shadow-md">
                        {data.image_url || uploadedImage.previewUrl ? (
                            <>
                                <img
                                    src={uploadedImage.previewUrl || data.image_url}
                                    alt="Image sélectionnée"
                                    className="mx-auto h-64 w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                                    <h1 className="text-3xl font-bold">Image sélectionnée</h1>
                                    <p className="mt-1 text-white/90">Tu peux choisir une autre image ci-dessous</p>
                                </div>
                            </>
                        ) : (
                            <img src="/images/media-selection.jpg" alt="Sélection de médias" className="mx-auto h-64 w-full object-cover" />
                        )}
                    </div>
                    {!(data.image_url || uploadedImage.previewUrl) && (
                        <>
                            <h1 className="mt-6 text-3xl font-bold">Ajoute une image à ton histoire</h1>
                            <p className="text-muted-foreground mt-2">Choisis une image pour illustrer ton histoire</p>
                        </>
                    )}
                </motion.div>

                <motion.form onSubmit={handleSubmit} className="space-y-10" variants={containerVariants}>
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <h2 className="text-xl font-semibold">
                            Ton sélectionné: <span className="text-primary">{theend.tone}</span>
                        </h2>
                        <p className="text-muted-foreground">Nous te proposons des images adaptées à ton ton "{theend.tone}" en priorité</p>
                    </motion.div>

                    <motion.div className="space-y-4" variants={itemVariants}>
                        <h2 className="mb-4 text-xl font-semibold">Toutes les images disponibles</h2>

                        {/* Scrollable image gallery */}
                        <ScrollArea className="h-96 rounded-md border">
                            <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
                                {sortedImages.map((media) => (
                                    <motion.div
                                        key={media.id}
                                        className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 p-1 ${
                                            isImageSelected(media.url) ? 'border-primary' : 'border-transparent'
                                        }`}
                                        onClick={() => selectPredefinedImage(media.url)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <img src={media.url} alt="Media option" className="h-full w-full rounded object-cover" />
                                        {media.tone === theend.tone && (
                                            <div className="absolute right-1 bottom-1">
                                                <span className="bg-primary/80 text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                                                    {theend.tone}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="bg-muted/50 mt-6 rounded-lg p-4">
                            <div className="mb-4">
                                <Label className="mb-2 block font-medium">Ou télécharge ta propre image</Label>
                                <div className="relative">
                                    <div
                                        className={`rounded-lg border-2 bg-slate-50 ${data.image || uploadedImage.previewUrl ? 'border-primary' : 'border-dashed border-slate-300'} p-4 text-center`}
                                    >
                                        {uploadedImage.previewUrl ? (
                                            <p className="text-sm text-slate-600">
                                                Image sélectionnée: <span className="font-medium">{uploadedImage.file?.name}</span>
                                            </p>
                                        ) : data.image_url ? (
                                            <p className="text-sm text-slate-600">Image sélectionnée à partir de la galerie</p>
                                        ) : (
                                            <p className="text-sm text-slate-500">Sélectionne une image depuis ton ordinateur</p>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90 mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2"
                                    />
                                </div>
                                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="space-y-4" variants={itemVariants}>
                        <h2 className="text-xl font-semibold">Options de partage</h2>
                        <div className="flex items-center">
                            <input
                                id="is_public"
                                type="checkbox"
                                checked={data.is_public}
                                onChange={(e) => setData('is_public', e.target.checked)}
                                className="mr-2 h-4 w-4"
                            />
                            <Label htmlFor="is_public">Partager avec la communauté</Label>
                        </div>
                    </motion.div>

                    <motion.div className="flex justify-between" variants={itemVariants}>
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Précédent
                        </Button>
                        <Button type="submit">Terminer</Button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </PageLayout>
    );
}
