import { Head, useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProfileForm = {
    name: string;
    email: string;
    bio: string;
    photo: File | string | null;
    photo_cover: File | string | null;
};

interface ProfileProps {
    mustVerifyEmail: boolean;
    status?: string;
    onSuccess?: () => void;
}

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
            bio: string | null;
            photo: string | null;
            photo_cover: string | null;
            email_verified_at: string | null;
        };
    };
    [key: string]: unknown;
}

export default function Profile({ mustVerifyEmail, status, onSuccess }: ProfileProps) {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name || '',
        email: auth.user.email || '',
        bio: auth.user.bio || '',
        photo: auth.user.photo || null,
        photo_cover: auth.user.photo_cover || null,
    });

    useEffect(() => {
        if (recentlySuccessful && onSuccess) {
            onSuccess();
        }
    }, [recentlySuccessful, onSuccess]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('bio', data.bio);

        if (data.photo instanceof File) {
            formData.append('photo', data.photo);
        }

        if (data.photo_cover instanceof File) {
            formData.append('photo_cover', data.photo_cover);
        }

        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
            data: formData,
        });
    };

    return (
        <>
            <Head title="Paramètres du profil" />
            <div className="space-y-6">
                <HeadingSmall title="Informations du profil" description="Mettez à jour votre nom, email et profil." />
                <form onSubmit={submit} className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Colonne de gauche */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                name="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nom complet"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Adresse email"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Biographie</Label>
                            <Input
                                id="bio"
                                name="bio"
                                className="mt-1 block w-full"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                required
                                autoComplete="bio"
                                placeholder="Parlez un peu de vous..."
                            />
                            <InputError className="mt-2" message={errors.bio} />
                        </div>
                    </div>

                    {/* Colonne de droite */}
                    <div className="space-y-6">
                        {/* Photo de profil */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">Photo de profil</Label>
                            <div className="bg-muted/20 flex flex-col items-center gap-4 rounded-lg border p-4">
                                <Avatar className="border-primary/10 h-24 w-24 border-2">
                                    <AvatarImage
                                        src={
                                            typeof data.photo === 'string'
                                                ? data.photo
                                                : data.photo instanceof File
                                                  ? URL.createObjectURL(data.photo)
                                                  : ''
                                        }
                                        alt="Photo de profil"
                                    />
                                    <AvatarFallback className="text-lg">
                                        {data.name
                                            ?.split(' ')
                                            .map((n) => n[0])
                                            .join('')
                                            .toUpperCase() || 'JD'}
                                    </AvatarFallback>
                                </Avatar>
                                <Label htmlFor="photo" className="cursor-pointer">
                                    <div className="bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-md px-4 py-2 transition-colors">
                                        <Camera className="h-4 w-4" />
                                        <span className="text-sm font-medium">Changer la photo</span>
                                    </div>
                                </Label>
                                <Input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('photo', e.target.files[0]);
                                        }
                                    }}
                                    className="hidden"
                                />
                                <InputError className="mt-2" message={errors.photo || ''} />
                            </div>
                        </div>

                        {/* Photo de couverture */}
                        <div className="space-y-3">
                            <Label className="text-base font-medium">Photo de couverture</Label>
                            <div className="bg-muted/20 overflow-hidden rounded-lg border">
                                <div className="bg-muted relative aspect-[3/1]">
                                    {typeof data.photo_cover === 'string' && data.photo_cover ? (
                                        <Image src={data.photo_cover} alt="Photo de couverture" fill className="object-cover" />
                                    ) : data.photo_cover instanceof File ? (
                                        <img
                                            src={URL.createObjectURL(data.photo_cover)}
                                            alt="Photo de couverture"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-muted-foreground flex h-full items-center justify-center">
                                            Aucune image de couverture
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center p-3">
                                    <Label htmlFor="photo_cover" className="cursor-pointer">
                                        <div className="bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-md px-4 py-2 transition-colors">
                                            <Camera className="h-4 w-4" />
                                            <span className="text-sm font-medium">{data.photo_cover ? "Changer l'image" : 'Ajouter une image'}</span>
                                        </div>
                                    </Label>
                                    <Input
                                        id="photo_cover"
                                        name="photo_cover"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setData('photo_cover', e.target.files[0]);
                                            }
                                        }}
                                        className="hidden"
                                    />
                                    <InputError className="mt-2" message={errors.photo_cover || ''} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-full space-y-4">
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Votre adresse email n'est pas vérifiée.{' '}
                                    <button
                                        type="button"
                                        className="text-foreground underline underline-offset-4 hover:decoration-current"
                                        onClick={() => {
                                            fetch(route('verification.send'), {
                                                method: 'POST',
                                                headers: {
                                                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
                                                },
                                            }).then(() => alert('Email de vérification envoyé.'));
                                        }}
                                    >
                                        Cliquez ici pour renvoyer l'email de vérification.
                                    </button>
                                </p>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Un nouveau lien de vérification a été envoyé à votre adresse email.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Enregistrer</Button>
                            {recentlySuccessful && <p className="text-sm text-neutral-600">Enregistré</p>}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
