import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Search, X } from 'lucide-react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface TheEnd {
    id: number;
    slug: string;
    title: string;
    content: string;
    tone: string;
    user: {
        name: string;
        avatar_url: string | null;
    };
    image_url: string | null;
    created_at: string;
}

interface SearchBarProps {
    placeholder?: string;
    className?: string;
}

export default function SearchBar({ placeholder = 'Rechercher des publications...', className = '' }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<TheEnd[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const suggestionRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { get } = useForm();

    // Fonction pour chercher des suggestions
    const searchSuggestions = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`/api/theend/search?q=${encodeURIComponent(searchQuery)}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Effet pour débouncer les recherches
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query) {
                searchSuggestions(query);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    // Gestion des clics en dehors pour fermer les suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionRef.current &&
                !suggestionRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Gestion de la touche Entrée
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (suggestions.length > 0 && showSuggestions) {
                // Si une suggestion est sélectionnée, aller à cette suggestion
                get(route('theend.show', suggestions[0].slug));
            } else {
                // Sinon, aller à la page de résultats de recherche
                get(route('resulatrecherche', { q: query }));
            }
        }
    };

    // Tronquer le texte
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    // Naviguer vers un TheEnd
    const navigateToTheEnd = (slug: string) => {
        get(route('theend.show', slug));
    };

    // Effacer la recherche
    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className={`relative flex items-center rounded-full border ${isFocused ? 'border-primary ring-primary/20 ring-2' : 'border-input'}`}>
                <Search className="text-muted-foreground absolute left-3 h-5 w-5" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        setShowSuggestions(!!query);
                    }}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    className="h-10 rounded-full border-none pr-10 pl-10 shadow-sm"
                />
                {query && (
                    <Button type="button" variant="ghost" size="icon" onClick={clearSearch} className="absolute right-1 h-8 w-8 rounded-full p-0">
                        {isLoading ? (
                            <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                        ) : (
                            <X className="text-muted-foreground h-4 w-4" />
                        )}
                    </Button>
                )}
            </div>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <Card ref={suggestionRef} className="bg-card absolute top-12 z-50 w-full overflow-hidden rounded-lg border shadow-lg">
                    <div className="max-h-[400px] overflow-y-auto p-1">
                        <div className="space-y-1 p-2">
                            {suggestions.map((theend) => (
                                <div
                                    key={theend.id}
                                    className="hover:bg-accent flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors"
                                    onClick={() => navigateToTheEnd(theend.slug)}
                                >
                                    {theend.image_url ? (
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                                            <img src={theend.image_url} alt={theend.title} className="h-full w-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-md">
                                            <Search className="text-muted-foreground h-6 w-6" />
                                        </div>
                                    )}

                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-foreground line-clamp-1 font-medium">
                                                {truncateText(theend.title || theend.content, 50)}
                                            </p>
                                            <span className="text-muted-foreground text-xs">{formatDate(theend.created_at)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={theend.user.avatar_url || undefined} />
                                                <AvatarFallback>{theend.user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-muted-foreground text-xs">{theend.user.name}</span>
                                            {theend.tone && (
                                                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                                                    {theend.tone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
