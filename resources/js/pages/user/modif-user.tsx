import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { User,  Lock,DeleteIcon } from "lucide-react"
import  ProfileForm  from "../settings/profile"
import DeleteUser from "@/components/delete-user"
import  Password  from "../settings/password"
export default function Modifuser() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button><Pencil className="mr-2 h-4 w-4" />Modifier le profil</Button> </DialogTrigger>
            <DialogContent>
                <Tabs defaultValue="account" className="w-full">
                   
                    <TabsList className="grid w-full grid-cols-3 mb-6 gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Mot de passe
            </TabsTrigger>
            <TabsTrigger value="deleteUser" className="flex items-center gap-2">
              <DeleteIcon className="h-4 w-4" />
              Supprimmer Compte
            </TabsTrigger>
          </TabsList>
                    <TabsContent value="profile">
                        
                        <ProfileForm />
                            
                            
                        
                    </TabsContent>
                    <TabsContent value="password">
                        
                        <Password />
                        
                    </TabsContent>
                    <TabsContent value="deleteUser">
                        
                    <DeleteUser />
                        
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>

    )
}
