import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';

import DeleteUser from '@/components/delete-user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeleteIcon, Lock, User } from 'lucide-react';
import { useState } from 'react';
import Password from '../settings/password';
import ProfileForm from '../settings/profile';

export default function Modifuser() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSuccess = () => {
        // Fermer le dialogue sur succès
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button className="w-full sm:w-auto">
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier le profil
                </Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-[90vh] w-[95vw] max-w-2xl flex-col overflow-hidden p-4 sm:p-6">
                <DialogTitle className="text-lg sm:text-xl">Modifier votre profil</DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                    Mettez à jour vos informations personnelles, votre mot de passe ou supprimez votre compte.
                </DialogDescription>

                <Tabs defaultValue="profile" className="mt-4 flex flex-1 flex-col overflow-hidden">
                    <TabsList className="mb-4 grid w-full grid-cols-3 gap-1 sm:gap-2">
                        <TabsTrigger value="profile" className="flex items-center justify-center gap-1 p-2 text-xs sm:text-sm">
                            <User className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Profil</span>
                        </TabsTrigger>
                        <TabsTrigger value="password" className="flex items-center justify-center gap-1 p-2 text-xs sm:text-sm">
                            <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Mot de passe</span>
                        </TabsTrigger>
                        <TabsTrigger value="deleteUser" className="flex items-center justify-center gap-1 p-2 text-xs sm:text-sm">
                            <DeleteIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Supprimer</span>
                        </TabsTrigger>
                    </TabsList>
                    <div className="flex-1 overflow-y-auto pr-1">
                        <TabsContent value="profile" className="h-full">
                            <ProfileForm mustVerifyEmail={false} onSuccess={handleSuccess} />
                        </TabsContent>
                        <TabsContent value="password" className="h-full">
                            <Password onSuccess={handleSuccess} />
                        </TabsContent>
                        <TabsContent value="deleteUser" className="h-full">
                            <DeleteUser onSuccess={handleSuccess} />
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
