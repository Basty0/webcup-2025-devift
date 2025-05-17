import TheEndFeed from '@/components/recherche/the-end-feed';
import { Input } from '@/components/ui/input';
import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Resultat() {
    const { url } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Get query parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            setSearchQuery(query);
        }
    }, [url]);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mx-auto mb-8 max-w-3xl">
                <div className="relative">
                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5" />
                    </div>
                    <Input
                        type="search"
                        className="pl-10"
                        placeholder="Rechercher une TheEnd..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {searchQuery && (
                    <div className="mt-4">
                        <h2 className="text-xl font-medium">Résultats pour "{searchQuery}"</h2>
                    </div>
                )}
            </div>

            <TheEndFeed searchTerm={searchQuery} />
        </main>
    );
}
