import { Link } from "@inertiajs/react" 
import { Facebook, Instagram, Phone, Mail, MapPin, Linkedin, Twitter, Youtube, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import AppLogoIcon from "@/components/app-logo-icon"
export function Footer({ id }: { id: string }) {
  return (
    <footer id={id} className="bg-slate-950 text-slate-200">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              
              
              <AppLogoIcon />TheEnd
              
            </div>
            <p className="text-slate-400 max-w-xs">
              Nous créons des solutions numériques innovantes pour transformer votre vision en réalité.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com/" className="hover:text-slate-100 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-slate-100 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-slate-100 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://linkedin.com" className="hover:text-slate-100 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://youtube.com" className="hover:text-slate-100 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className=" hover:text-slate-100 ">
                  TheEnd
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-slate-10 ">
                TheEndPost
                </Link>
              </li>
              <li>
                <Link href="/" className=" hover:text-slate-100 ">
                  À propos
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-slate-400 mt-0.5" />
                <span className="text-slate-400">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start space-x-3">
                <MessageCircle size={18} className="text-slate-400 mt-0.5" />
                <span className="text-slate-400">+33 6 12 34 56 78 </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-slate-400 mt-0.5" />
                <span className="text-slate-400">contact@devift.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-slate-400 mt-0.5" />
                <span className="text-slate-400">123 Avenue de l'Innovation, 75001 Paris, France</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-slate-400">Abonnez-vous pour recevoir nos dernières actualités et offres.</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="contact@devift.com"
                className="bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
              />
              <Button className="bg-slate-100 text-slate-900 hover:bg-slate-200">S'abonner</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} DEV iFT. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 text-sm hover:text-slate-100 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="text-slate-400 text-sm hover:text-slate-100 transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
