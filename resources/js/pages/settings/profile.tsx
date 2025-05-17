import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Camera } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { Image } from '@/components/ui/image';

type ProfileForm = {
  name: string;
  email: string;
  bio: string;
  photo: File | string | null;
  photo_cover: File | string | null;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const { auth } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
    name: auth.user.name || '',
    email: auth.user.email || '',
    bio: auth.user.bio || '',
    photo: auth.user.photo || null,
    photo_cover: auth.user.photo_cover || null,
  });

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
      data: formData,
      preserveScroll: true,
      forceFormData: true,
    });
  };

  return (
    <>
      <Head title="Profile settings" />
      <div className="space-y-6">
        <HeadingSmall title="Profile information" description="Update your name, email and profile." />
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Colonne de gauche */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                autoComplete="name"
                placeholder="Full name"
              />
              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoComplete="username"
                placeholder="Email address"
              />
              <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                className="mt-1 block w-full"
                value={data.bio}
                onChange={(e) => setData('bio', e.target.value)}
                required
                autoComplete="bio"
                placeholder="Parle un peu de toi..."
              />
              <InputError className="mt-2" message={errors.bio} />
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-6">
            {/* Photo de profil */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Photo de profil</Label>
              <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <Avatar className="h-24 w-24 border-2 border-primary/10">
                  <AvatarImage
                    src={typeof data.photo === 'string' ? data.photo : URL.createObjectURL(data.photo as File)}
                    alt="Photo de profil"
                  />
                  <AvatarFallback className="text-lg">
                    {data.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'JD'}
                  </AvatarFallback>
                </Avatar>
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors">
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
              <div className="border rounded-lg overflow-hidden bg-muted/20">
                <div className="relative aspect-[3/1] bg-muted">
                  {typeof data.photo_cover === 'string' ? (
                    <Image src={data.photo_cover} alt="Photo de couverture" fill className="object-cover" />
                  ) : data.photo_cover instanceof File ? (
                    <img
                      src={URL.createObjectURL(data.photo_cover)}
                      alt="Photo de couverture"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Aucune image de couverture
                    </div>
                  )}
                </div>
                <div className="p-3 flex justify-center">
                  <Label htmlFor="photo_cover" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {data.photo_cover ? 'Changer l\'image' : 'Ajouter une image'}
                      </span>
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
                  Your email address is unverified.{' '}
                  <button
                    type="button"
                    className="text-foreground underline underline-offset-4 hover:decoration-current"
                    onClick={() => {
                      fetch(route('verification.send'), {
                        method: 'POST',
                        headers: {
                          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
                        },
                      }).then(() => alert('Verification email sent.'));
                    }}
                  >
                    Click here to resend the verification email.
                  </button>
                </p>
                {status === 'verification-link-sent' && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    A new verification link has been sent to your email address.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>
              {recentlySuccessful && <p className="text-sm text-neutral-600">Saved</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
