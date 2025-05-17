import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Theend } from '@/types/theend';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Médias organisés par ton
const mediaByTone: Record<string, MediaItem[]> = {
    dramatique: [
        { id: 'dramatique1', url: '/media/dramatique/image1.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique2', url: '/media/dramatique/image2.jpg', tone: 'dramatique', type: 'image' },
        { id: 'dramatique3', url: '/media/dramatique/gif1.gif', tone: 'dramatique', type: 'gif' },
        { id: 'dramatique4', url: '/media/dramatique/sound1.mp3', tone: 'dramatique', type: 'sound' },
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
        { id: 'cringe3', url: '/media/cringe/gif1.gif', tone: 'cringe', type: 'gif' },
        { id: 'cringe4', url: '/media/cringe/sound1.mp3', tone: 'cringe', type: 'sound' },
    ],
    classe: [
        { id: 'classe1', url: '/media/classe/image1.jpg', tone: 'classe', type: 'image' },
        { id: 'classe2', url: '/media/classe/image2.jpg', tone: 'classe', type: 'image' },
        { id: 'classe3', url: '/media/classe/gif1.gif', tone: 'classe', type: 'gif' },
        { id: 'classe4', url: '/media/classe/sound1.mp3', tone: 'classe', type: 'sound' },
    ],
    touchant: [
        { id: 'touchant1', url: '/media/touchant/image1.jpg', tone: 'touchant', type: 'image' },
        { id: 'touchant2', url: '/media/touchant/image2.jpg', tone: 'touchant', type: 'image' },
        { id: 'touchant3', url: '/media/touchant/gif1.gif', tone: 'touchant', type: 'gif' },
        { id: 'touchant4', url: '/media/touchant/sound1.mp3', tone: 'touchant', type: 'sound' },
    ],
    absurde: [
        { id: 'absurde1', url: '/media/absurde/image1.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde2', url: '/media/absurde/image2.jpg', tone: 'absurde', type: 'image' },
        { id: 'absurde3', url: '/media/absurde/gif1.gif', tone: 'absurde', type: 'gif' },
        { id: 'absurde4', url: '/media/absurde/sound1.mp3', tone: 'absurde', type: 'sound' },
    ],
    passif_agressif: [
        { id: 'passif_agressif1', url: '/media/passif_agressif/image1.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif2', url: '/media/passif_agressif/image2.jpg', tone: 'passif_agressif', type: 'image' },
        { id: 'passif_agressif3', url: '/media/passif_agressif/gif1.gif', tone: 'passif_agressif', type: 'gif' },
        { id: 'passif_agressif4', url: '/media/passif_agressif/sound1.mp3', tone: 'passif_agressif', type: 'sound' },
    ],
    honnête: [
        { id: 'honnête1', url: '/media/honnête/image1.jpg', tone: 'honnête', type: 'image' },
        { id: 'honnête2', url: '/media/honnête/image2.jpg', tone: 'honnête', type: 'image' },
        { id: 'honnête3', url: '/media/honnête/gif1.gif', tone: 'honnête', type: 'gif' },
        { id: 'honnête4', url: '/media/honnête/sound1.mp3', tone: 'honnête', type: 'sound' },
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
    const [activeTab, setActiveTab] = useState<'image' | 'gif' | 'sound'>('image');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Stocker des informations sur l'upload pour les images uniquement
    const [uploadedImage, setUploadedImage] = useState<{ file: File | null; previewUrl: string | null }>({
        file: null,
        previewUrl: null,
    });

    const { data, setData, post, errors } = useForm({
        image_url: theend.image_url || '',
        gif_url: theend.gif_url || '',
        sound_url: theend.sound_url || '',
        is_public: theend.is_public ?? true,
        image: null as File | null,
    });

    // Pre-select media based on tone when tab changes
    useEffect(() => {
        const toneMedia = mediaByTone[theend.tone] || [];
        const defaultMedia = toneMedia.find((m) => m.type === activeTab);

        // Ne pas remplacer la sélection si l'utilisateur a déjà choisi un média pour cet onglet
        const currentUrl = activeTab === 'image' ? data.image_url : activeTab === 'gif' ? data.gif_url : data.sound_url;

        if (defaultMedia && !currentUrl) {
            setData(activeTab === 'image' ? 'image_url' : activeTab === 'gif' ? 'gif_url' : 'sound_url', defaultMedia.url);
        }
    }, [theend.tone, activeTab]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/exprimer-vous/step3/${theend.slug}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
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

    // Détermine l'URL d'aperçu pour l'onglet actif
    const getCurrentMediaUrl = (type: 'image' | 'gif' | 'sound') => {
        if (type === 'image' && uploadedImage.previewUrl) {
            return uploadedImage.previewUrl;
        }
        return type === 'image' ? data.image_url : type === 'gif' ? data.gif_url : data.sound_url;
    };

    // Vérifie si un média est sélectionné dans l'onglet actif
    const isMediaSelected = (type: 'image' | 'gif' | 'sound', url: string) => {
        const currentUrl = type === 'image' ? data.image_url : type === 'gif' ? data.gif_url : data.sound_url;
        return currentUrl === url;
    };

    // Sélectionne une image prédéfinie
    const selectPredefinedImage = (url: string) => {
        // Clear uploaded file
        setUploadedImage({ file: null, previewUrl: null });
        setData('image', null);
        setData('image_url', url);
    };

    return (
        <motion.div className="mx-auto max-w-4xl p-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="mb-8 text-center" variants={itemVariants}>
                {/* Afficher l'image sélectionnée en haut si disponible, sinon afficher l'image par défaut */}
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
                        <h1 className="mt-6 text-3xl font-bold">Ajoute des médias à ton histoire</h1>
                        <p className="text-muted-foreground mt-2">Choisis une image, un GIF ou un son pour illustrer ton histoire</p>
                    </>
                )}
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-10" variants={containerVariants}>
                <motion.div className="space-y-4" variants={itemVariants}>
                    <h2 className="text-xl font-semibold">
                        Ton sélectionné: <span className="text-primary">{theend.tone}</span>
                    </h2>
                    <p className="text-muted-foreground">Nous te proposons des médias adaptés à ton ton "{theend.tone}"</p>
                </motion.div>

                <motion.div className="space-y-4" variants={itemVariants}>
                    <Tabs defaultValue="image" onValueChange={(value) => setActiveTab(value as 'image' | 'gif' | 'sound')}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="image">Image {data.image_url && '✓'}</TabsTrigger>
                            <TabsTrigger value="gif">GIF {data.gif_url && '✓'}</TabsTrigger>
                            <TabsTrigger value="sound">Son {data.sound_url && '✓'}</TabsTrigger>
                        </TabsList>

                        {/* Aperçu du média sélectionné */}
                        {(activeTab === 'image' && data.image_url) ||
                        (activeTab === 'gif' && data.gif_url) ||
                        (activeTab === 'sound' && data.sound_url) ? (
                            <motion.div
                                className="mt-6 mb-6"
                                variants={itemVariants}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="mb-4 text-xl font-semibold">Aperçu</h2>
                                <div className="bg-muted flex h-72 justify-center rounded-lg p-4">
                                    {activeTab === 'sound' ? (
                                        <audio controls src={getCurrentMediaUrl('sound')} className="w-full max-w-lg" />
                                    ) : activeTab === 'gif' ? (
                                        <img src={getCurrentMediaUrl('gif')} alt="Preview GIF" className="h-full w-full rounded-lg object-cover" />
                                    ) : (
                                        <img
                                            src={getCurrentMediaUrl('image')}
                                            alt="Preview image"
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        ) : null}

                        <TabsContent value="image" className="mt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {mediaByTone[theend.tone]
                                    ?.filter((m) => m.type === 'image')
                                    .map((media) => (
                                        <motion.div
                                            key={media.id}
                                            className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 p-1 ${
                                                isMediaSelected('image', media.url) ? 'border-primary' : 'border-transparent'
                                            }`}
                                            onClick={() => selectPredefinedImage(media.url)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <img src={media.url} alt="Media option" className="h-full w-full rounded object-cover" />
                                        </motion.div>
                                    ))}
                            </div>

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
                        </TabsContent>

                        <TabsContent value="gif" className="mt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {mediaByTone[theend.tone]
                                    ?.filter((m) => m.type === 'gif')
                                    .map((media) => (
                                        <motion.div
                                            key={media.id}
                                            className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 p-1 ${
                                                isMediaSelected('gif', media.url) ? 'border-primary' : 'border-transparent'
                                            }`}
                                            onClick={() => setData('gif_url', media.url)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <img src={media.url} alt="GIF option" className="h-full w-full rounded object-cover" />
                                        </motion.div>
                                    ))}
                            </div>

                            <div className="bg-muted/50 mt-6 rounded-lg p-4">
                                <p className="text-muted-foreground text-sm italic">
                                    Les GIFs sont disponibles uniquement parmi les options proposées selon ton ton "{theend.tone}"
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="sound" className="mt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {mediaByTone[theend.tone]
                                    ?.filter((m) => m.type === 'sound')
                                    .map((media) => (
                                        <motion.div
                                            key={media.id}
                                            className={`aspect-square cursor-pointer rounded-lg border-2 p-1 ${
                                                isMediaSelected('sound', media.url) ? 'border-primary' : 'border-transparent'
                                            }`}
                                            onClick={() => setData('sound_url', media.url)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="bg-muted flex h-full w-full items-center justify-center rounded">
                                                <span className="text-3xl">🔊</span>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>

                            <div className="bg-muted/50 mt-6 rounded-lg p-4">
                                <p className="text-muted-foreground text-sm italic">
                                    Les sons sont disponibles uniquement parmi les options proposées selon ton ton "{theend.tone}"
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
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
    );
}
