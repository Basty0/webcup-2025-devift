import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { MediaSelector } from '@/components/media-selector';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Types pour les médias
type Media = {
    id: string;
    url: string;
    name: string;
    tone?: string;
};

// Schéma de validation pour le formulaire
const formSchema = z.object({
    title: z.string().min(1, 'Donne un titre à ton histoire'),
    content: z.string().min(10, 'Raconte-nous un peu plus...'),
    is_public: z.boolean().default(true),
    tone: z.enum(['dramatique', 'ironique', 'cringe', 'classe', 'touchant', 'absurde', 'passif_agressif', 'honnête']),
    type_id: z.string().min(1, 'Choisis un type'),
    image_url: z.string().optional(),
    gif_url: z.string().optional(),
    sound_url: z.string().optional(),
});

// Données fictives pour les types
const typeOptions = [
    { id: '1', label: 'Anecdote' },
    { id: '2', label: 'Confession' },
    { id: '3', label: 'Aventure' },
    { id: '4', label: 'Réflexion' },
    { id: '5', label: 'Rêve' },
];

// Données fictives pour les images
const mockImages: Media[] = [
    { id: '1', url: '/placeholder.svg?height=200&width=300', name: 'Image dramatique', tone: 'dramatique' },
    { id: '2', url: '/placeholder.svg?height=200&width=300', name: 'Image ironique', tone: 'ironique' },
    { id: '3', url: '/placeholder.svg?height=200&width=300', name: 'Image cringe', tone: 'cringe' },
    { id: '4', url: '/placeholder.svg?height=200&width=300', name: 'Image classe', tone: 'classe' },
    { id: '5', url: '/placeholder.svg?height=200&width=300', name: 'Image touchante', tone: 'touchant' },
    { id: '6', url: '/placeholder.svg?height=200&width=300', name: 'Image absurde', tone: 'absurde' },
    { id: '7', url: '/placeholder.svg?height=200&width=300', name: 'Image passive-agressive', tone: 'passif_agressif' },
    { id: '8', url: '/placeholder.svg?height=200&width=300', name: 'Image honnête', tone: 'honnête' },
];

// Données fictives pour les sons
const mockSounds: Media[] = [
    { id: '1', url: '/sounds/dramatic.mp3', name: 'Son dramatique', tone: 'dramatique' },
    { id: '2', url: '/sounds/ironic.mp3', name: 'Son ironique', tone: 'ironique' },
    { id: '3', url: '/sounds/cringe.mp3', name: 'Son cringe', tone: 'cringe' },
    { id: '4', url: '/sounds/classy.mp3', name: 'Son classe', tone: 'classe' },
    { id: '5', url: '/sounds/touching.mp3', name: 'Son touchant', tone: 'touchant' },
    { id: '6', url: '/sounds/absurd.mp3', name: 'Son absurde', tone: 'absurde' },
    { id: '7', url: '/sounds/passive-aggressive.mp3', name: 'Son passif-agressif', tone: 'passif_agressif' },
    { id: '8', url: '/sounds/honest.mp3', name: 'Son honnête', tone: 'honnête' },
];

// Données fictives pour les GIFs
const mockGifs: Media[] = [
    { id: '1', url: '/placeholder.svg?height=200&width=300', name: 'GIF dramatique', tone: 'dramatique' },
    { id: '2', url: '/placeholder.svg?height=200&width=300', name: 'GIF ironique', tone: 'ironique' },
    { id: '3', url: '/placeholder.svg?height=200&width=300', name: 'GIF cringe', tone: 'cringe' },
    { id: '4', url: '/placeholder.svg?height=200&width=300', name: 'GIF classe', tone: 'classe' },
    { id: '5', url: '/placeholder.svg?height=200&width=300', name: 'GIF touchant', tone: 'touchant' },
    { id: '6', url: '/placeholder.svg?height=200&width=300', name: 'GIF absurde', tone: 'absurde' },
    { id: '7', url: '/placeholder.svg?height=200&width=300', name: 'GIF passif-agressif', tone: 'passif_agressif' },
    { id: '8', url: '/placeholder.svg?height=200&width=300', name: 'GIF honnête', tone: 'honnête' },
];

// Mapping des tons avec des emojis et textes
const toneOptions = [
    { value: 'dramatique', emoji: '😱', label: "C'est dramatique!" },
    { value: 'ironique', emoji: '😏', label: "C'est ironique" },
    { value: 'cringe', emoji: '😬', label: 'Tellement cringe' },
    { value: 'classe', emoji: '😎', label: 'Très classe' },
    { value: 'touchant', emoji: '🥺', label: 'Ça me touche' },
    { value: 'absurde', emoji: '🤪', label: "C'est absurde" },
    { value: 'passif_agressif', emoji: '😒', label: 'Je suis passif-agressif' },
    { value: 'honnête', emoji: '😊', label: 'Je suis honnête' },
];

export default function CreateTheend() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filteredImages, setFilteredImages] = useState<Media[]>(mockImages);
    const [filteredSounds, setFilteredSounds] = useState<Media[]>(mockSounds);
    const [filteredGifs, setFilteredGifs] = useState<Media[]>(mockGifs);

    // Initialiser le formulaire avec des valeurs par défaut
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
            is_public: true,
            tone: 'classe',
            type_id: '',
            image_url: '',
            gif_url: '',
            sound_url: '',
        },
    });

    // Récupérer la valeur actuelle du ton
    const currentTone = form.watch('tone');

    // Filtrer les médias en fonction du ton sélectionné
    useEffect(() => {
        if (currentTone) {
            setFilteredImages(mockImages.filter((img) => img.tone === currentTone || !img.tone));
            setFilteredSounds(mockSounds.filter((sound) => sound.tone === currentTone || !sound.tone));
            setFilteredGifs(mockGifs.filter((gif) => gif.tone === currentTone || !gif.tone));
        }
    }, [currentTone]);

    // Fonction de soumission du formulaire
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            // Simuler un appel API
            console.log('Données soumises:', values);

            // Attendre pour simuler un appel réseau
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Rediriger vers la liste des thèmes après la soumission
            router.push('/themes');
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const renderStep1 = () => (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=400&width=800" alt="Qu'est-ce qui s'est passé?" fill className="object-cover" />
                <div className="to-background/90 absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent p-6">
                    <h1 className="text-center text-3xl font-bold">Qu'est-ce qui s'est passé?</h1>
                </div>
            </div>

            <CardContent className="space-y-6 pt-6">
                <FormField
                    control={form.control}
                    name="type_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">C'était quel genre d'histoire?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Choisis un type..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {typeOptions.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className="text-lg">Comment tu te sens par rapport à ça?</FormLabel>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {toneOptions.map((tone) => (
                                    <div
                                        key={tone.value}
                                        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-3 transition-all ${
                                            field.value === tone.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                                        }`}
                                        onClick={() => form.setValue('tone', tone.value as any)}
                                    >
                                        <span className="mb-1 text-3xl">{tone.emoji}</span>
                                        <span className="text-center text-sm">{tone.label}</span>
                                    </div>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );

    const renderStep2 = () => (
        <Card className="overflow-hidden">
            <CardContent className="space-y-6 pt-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Donne un titre à ton histoire</FormLabel>
                            <FormControl>
                                <Input placeholder="Un titre accrocheur..." className="h-12 text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Raconte-nous...</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Je me souviens de ce jour où..." className="min-h-[150px] text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );

    const renderStep3 = () => (
        <Card className="overflow-hidden">
            <CardContent className="space-y-6 pt-6">
                <div className="rounded-lg border p-4">
                    <h3 className="mb-4 text-lg font-medium">Ajoute un média qui correspond à ton mood</h3>
                    <Tabs defaultValue="images" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="images">Images</TabsTrigger>
                            <TabsTrigger value="gifs">GIFs</TabsTrigger>
                            <TabsTrigger value="sounds">Sons</TabsTrigger>
                        </TabsList>

                        <TabsContent value="images">
                            <FormField
                                control={form.control}
                                name="image_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <MediaSelector
                                                items={filteredImages}
                                                selectedValue={field.value}
                                                onSelect={(value) => form.setValue('image_url', value)}
                                                type="image"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TabsContent>

                        <TabsContent value="gifs">
                            <FormField
                                control={form.control}
                                name="gif_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <MediaSelector
                                                items={filteredGifs}
                                                selectedValue={field.value}
                                                onSelect={(value) => form.setValue('gif_url', value)}
                                                type="image"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TabsContent>

                        <TabsContent value="sounds">
                            <FormField
                                control={form.control}
                                name="sound_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <MediaSelector
                                                items={filteredSounds}
                                                selectedValue={field.value}
                                                onSelect={(value) => form.setValue('sound_url', value)}
                                                type="audio"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                <FormField
                    control={form.control}
                    name="is_public"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Partager avec tout le monde?</FormLabel>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                <div className="flex justify-between">
                    {currentStep > 1 && (
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="px-8 py-6 text-lg">
                            Précédent
                        </Button>
                    )}
                    {currentStep < 3 ? (
                        <Button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="px-8 py-6 text-lg">
                            Suivant
                        </Button>
                    ) : (
                        <Button type="submit" size="lg" className="px-8 py-6 text-lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : (
                                'Partager mon histoire'
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
