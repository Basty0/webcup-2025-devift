
import { Image } from "@/components/ui/image";
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react';
import LayoutApp from '@/layouts/layout-app';
export default function Error404() {
  return (
    <LayoutApp>
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4 md:px-6">
        {/* Image à gauche avec animation */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 animate-bounce">
          <Image
            src="/images/404.png"
            alt="Illustration 404"
            
            className="object-cover"
            priority
          />
        </div>

        {/* Texte à droite */}
        <div className="space-y-6 text-center md:text-left max-w-md">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">404</h1>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Page non trouvée</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Oups ! La page que vous recherchez semble avoir disparu dans le cyberespace.
            </p>
          </div>

          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </LayoutApp>
  );
}
