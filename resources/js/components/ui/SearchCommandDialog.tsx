import * as React from "react";
import { Input } from "./input";
import { Link } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Image } from "../ui/image";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Loader2 } from "lucide-react";

// Interface pour les suggestions
interface SuggestionItem {
  id: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  date: Date;
  preview: string;
  imageUrl?: string;
  type: "post" | "audio" | "video";
}

export default function SearchCommandDialog({ open, onOpenChange, anchorRef }: { open: boolean; onOpenChange: (open: boolean) => void; anchorRef?: React.RefObject<HTMLDivElement> }) {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Fonction pour récupérer les suggestions
  const fetchSuggestions = React.useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // URL directe pour faciliter le débogage
      const url = `/api/search?q=${encodeURIComponent(searchTerm)}`;
      console.log("Fetching suggestions from:", url);
      
      const response = await axios.get(url);
      console.log("API response:", response.data);
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid response format:", response.data);
        setSuggestions([]);
        setError("Format de réponse invalide");
        return;
      }
      
      // Transformer les données API en format SuggestionItem
      const items = response.data.map((item: {
        id?: string | number;
        slug?: string;
        title?: string;
        content?: string;
        user?: { name?: string; avatar_url?: string };
        created_at?: string;
        image_url?: string;
        type?: string;
        [key: string]: unknown;
      }) => ({
        id: String(item.id || item.slug || ''),
        title: item.title || (item.content?.substring(0, 50) + '...') || 'Sans titre',
        authorName: item.user?.name || "Utilisateur",
        authorAvatar: item.user?.avatar_url || "/placeholder.svg",
        date: new Date(item.created_at || Date.now()),
        preview: item.content?.substring(0, 100) || "",
        imageUrl: item.image_url,
        type: (item.type || "post") as "post" | "audio" | "video"
      }));
      
      setSuggestions(items);
    } catch (error: Error | unknown) {
      console.error("Erreur lors de la recherche:", error);
      setError(error instanceof Error ? error.message : "Erreur lors de la recherche");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce pour la recherche
  React.useEffect(() => {
    if (!open) return;
    
    const timer = setTimeout(() => {
      if (query.trim().length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, open, fetchSuggestions]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onOpenChange, anchorRef]);

  // Position dropdown below search bar
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  React.useEffect(() => {
    if (open) {
      if (anchorRef?.current && dropdownRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setStyle({
          position: 'absolute',
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
          minWidth: '300px',
          maxWidth: '95vw',
          zIndex: 1000,
        });
      } else {
        // Si pas d'anchorRef, utiliser une largeur par défaut
        setStyle({
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          minWidth: '300px',
          maxWidth: '95vw',
          zIndex: 1000,
        });
      }
    }
  }, [open, anchorRef]);

  // Focus input when opened
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Handle key press for Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Go to search results page with query parameter
      router.visit(`/recherche?q=${encodeURIComponent(query)}`);
      onOpenChange(false);
    }
  };

  if (!open) return null;

  // Function to get content type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "audio":
        return "🎵";
      case "video":
        return "🎬";
      default:
        return "📝";
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      style={style} 
      className="bg-background mt-2 border shadow-lg rounded-xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
    >
      <div className="p-4 border-b">
        <Input
          ref={inputRef}
          autoFocus
          placeholder="Rechercher un TheEnd..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full"
        />
      </div>
      
      <div className="max-h-80 overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Recherche de TheEnd en cours...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 text-center">
            <p className="font-medium">Erreur de recherche</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-muted-foreground p-4 text-center">
            {query.length > 2 ? "Aucun TheEnd trouvé" : "Commencez à taper pour rechercher un TheEnd"}
          </div>
        ) : (
          <>
            <div className="text-xs text-muted-foreground px-4 pt-2 pb-1">
              <span className="font-medium">{suggestions.length} TheEnd trouvés</span> • Appuyez sur Entrée pour voir tous les résultats
            </div>
            
            {suggestions.map((item) => (
              <Link 
                key={item.id} 
                href={`/content/${item.id}`}
                className="flex gap-3 w-full p-3 hover:bg-accent rounded-lg transition group cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-medium">
                      {getTypeIcon(item.type)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={item.authorAvatar} alt={item.authorName} />
                        <AvatarFallback>{item.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <span>@{item.authorName}</span>
                    </div>
                    <span>•</span>
                    <span>{format(item.date, "d MMM yyyy", { locale: fr })}</span>
                  </div>
                  
                  <p className="text-xs line-clamp-1 mt-1 text-muted-foreground">
                    {item.preview}
                  </p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
} 