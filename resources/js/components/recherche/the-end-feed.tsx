import { useEffect, useState } from 'react';
import TheEndPost from './the-end-post';

// Type pour les publications
interface TheEndPostProps {
    id: string;
    username: string;
    userAvatar: string;
    videoUrl: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    date: Date;
    title: string;
}

interface TheEndFeedProps {
    searchTerm?: string;
}

export default function TheEndFeed({ searchTerm = '' }: TheEndFeedProps) {
    // Données simulées pour les publications
    const [allPosts] = useState<TheEndPostProps[]>([
        {
            id: '1',
            username: 'travel_lover',
            userAvatar: '/placeholder.svg?height=40&width=40',
            videoUrl: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            description: 'Ma première publication TheEnd #fun #découverte',
            likes: 1245,
            comments: 89,
            shares: 32,
            date: new Date(2023, 11, 15),
            title: 'Coucher de soleil à Paris',
        },
        {
            id: '2',
            username: 'explore_france',
            userAvatar: '/placeholder.svg?height=40&width=40',
            videoUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            description: 'Regardez cette vue incroyable! #voyage #nature',
            likes: 3782,
            comments: 156,
            shares: 78,
            date: new Date(2023, 9, 8),
            title: 'Découverte des plages de Normandie',
        },
        {
            id: '3',
            username: 'chef_patissier',
            userAvatar: '/placeholder.svg?height=40&width=40',
            videoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            description: 'Nouvelle recette à essayer #cuisine #facile',
            likes: 982,
            comments: 45,
            shares: 12,
            date: new Date(2023, 10, 22),
            title: 'Recette de tarte aux pommes traditionnelle',
        },
        {
            id: '4',
            username: 'street_artist',
            userAvatar: '/placeholder.svg?height=40&width=40',
            videoUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            description: 'Mon nouveau projet créatif #art #création',
            likes: 2451,
            comments: 102,
            shares: 54,
            date: new Date(2023, 8, 19),
            title: 'Nouvelle fresque murale',
        },
        {
            id: '5',
            username: 'music_lover',
            userAvatar: '/placeholder.svg?height=40&width=40',
            videoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            description: 'Moment de détente #relax #weekend',
            likes: 1876,
            comments: 67,
            shares: 23,
            date: new Date(2023, 7, 12),
            title: 'Concert en plein air',
        },
        {
            id: '6',
            username: 'runner42',
            userAvatar: '/placeholder.svg?height=40&width=40',
            videoUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            description: 'Nouvelle collection #mode #tendance',
            likes: 3214,
            comments: 143,
            shares: 87,
            date: new Date(2023, 3, 3),
            title: 'Marathon de Paris',
        },
    ]);

    // Filter posts based on search term
    const [filteredPosts, setFilteredPosts] = useState<TheEndPostProps[]>(allPosts);

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === '') {
            setFilteredPosts(allPosts);
            return;
        }

        const lowercaseSearch = searchTerm.toLowerCase();
        const filtered = allPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(lowercaseSearch) ||
                post.description.toLowerCase().includes(lowercaseSearch) ||
                post.username.toLowerCase().includes(lowercaseSearch),
        );

        setFilteredPosts(filtered);
    }, [searchTerm, allPosts]);

    // Fonction pour formater le nombre de likes
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground text-lg">Aucun résultat trouvé pour "{searchTerm}"</p>
                    <p className="text-muted-foreground mt-2 text-sm">Essayez avec des termes différents</p>
                </div>
            ) : (
                filteredPosts.map((post, index) => (
                    <TheEndPost
                        key={post.id}
                        username={post.username}
                        userAvatar={post.userAvatar}
                        videoUrl={post.videoUrl}
                        description={post.description}
                        likes={formatNumber(post.likes)}
                        comments={formatNumber(post.comments)}
                        shares={formatNumber(post.shares)}
                        index={index}
                        title={post.title}
                    />
                ))
            )}
        </div>
    );
}
