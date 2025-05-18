// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Image } from '@/components/ui/image';
// import PageLayout from '@/layouts/page-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head } from '@inertiajs/react';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { Calendar, Clock, Heart, MessageCircle, Share2 } from 'lucide-react';
// import { useEffect, useState } from 'react';

// // Type for the content items
// interface ContentItem {
//     id: string;
//     title: string;
//     authorName: string;
//     authorAvatar: string;
//     date: Date;
//     imageUrl?: string;
//     description: string;
//     type: 'post' | 'audio' | 'video';
//     likes: number;
//     comments: number;
//     shares: number;
// }

// // Mock data for content items
// const mockContentItems: ContentItem[] = [
//     {
//         id: '1',
//         title: 'Coucher de soleil à Paris',
//         authorName: 'travel_lover',
//         authorAvatar: '/placeholder.svg?height=40&width=40',
//         date: new Date(2023, 11, 15),
//         imageUrl: 'https://images.unsplash.com/photo-1431274172761-fca41d930114',
//         description:
//             "Magnifique coucher de soleil capturé depuis la Tour Eiffel. Les couleurs étaient incroyables, avec des tons orangés et rouges se reflétant sur la Seine. J'ai eu la chance d'assister à ce spectacle après une journée de balade dans la capitale. #Paris #Sunset #Travel",
//         type: 'post',
//         likes: 1245,
//         comments: 89,
//         shares: 32,
//     },
//     {
//         id: '2',
//         title: 'Recette de tarte aux pommes traditionnelle',
//         authorName: 'chef_patissier',
//         authorAvatar: '/placeholder.svg?height=40&width=40',
//         date: new Date(2023, 10, 22),
//         imageUrl: 'https://images.unsplash.com/photo-1562007908-17c67e878c88',
//         description:
//             "Une recette simple mais délicieuse pour préparer la tarte aux pommes parfaite. J'utilise des pommes Golden pour leur douceur et leur texture qui se tient bien à la cuisson. Le secret est dans la pâte brisée maison et la touche de cannelle. #Recette #Patisserie #Dessert",
//         type: 'post',
//         likes: 982,
//         comments: 45,
//         shares: 12,
//     },
//     {
//         id: '3',
//         title: 'Découverte des plages de Normandie',
//         authorName: 'explore_france',
//         authorAvatar: '/placeholder.svg?height=40&width=40',
//         date: new Date(2023, 9, 8),
//         imageUrl: 'https://images.unsplash.com/photo-1583124855234-9faedd84d27d',
//         description:
//             "Weekend d'évasion sur les plages historiques de Normandie. Ces plages chargées d'histoire offrent des paysages à couper le souffle. Entre falaises et sable fin, elles racontent l'histoire du Débarquement tout en offrant un cadre naturel préservé. #Normandie #Histoire #Plage",
//         type: 'post',
//         likes: 3782,
//         comments: 156,
//         shares: 78,
//     },
//     {
//         id: '4',
//         title: 'Marathon de Paris',
//         authorName: 'runner42',
//         authorAvatar: '/placeholder.svg?height=40&width=40',
//         date: new Date(2023, 3, 3),
//         imageUrl: 'https://images.unsplash.com/photo-1539966903171-89770f33f468',
//         description:
//             "Préparation intense pour le marathon de Paris cette année. Mon programme d'entraînement est bien lancé, avec une progression régulière des distances. Je partage ici mes conseils pour bien se préparer mentalement et physiquement à ce défi. #Marathon #Paris #Running",
//         type: 'audio',
//         likes: 3214,
//         comments: 143,
//         shares: 87,
//     },
//     {
//         id: '5',
//         title: 'Nouvelle fresque murale',
//         authorName: 'street_artist',
//         authorAvatar: '/placeholder.svg?height=40&width=40',
//         date: new Date(2023, 8, 19),
//         imageUrl: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8',
//         description:
//             "Création d'une fresque géante au cœur de la ville. Ce projet collaboratif implique plusieurs artistes locaux et aborde des thèmes environnementaux. Le processus a duré trois semaines et a transformé complètement ce mur abandonné. #StreetArt #Art #Fresque",
//         type: 'video',
//         likes: 2451,
//         comments: 102,
//         shares: 54,
//     },
//     {
//         id: '6',
//         title: 'Concert en plein air',
//         authorName: 'music_lover',
//         authorAvatar: '/placeholder.svg?height=40&width=40',
//         date: new Date(2023, 7, 12),
//         imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
//         description:
//             "Une expérience musicale inoubliable sous les étoiles. Ce festival réunissait des artistes de divers horizons dans un cadre naturel exceptionnel. L'acoustique était parfaite et l'ambiance magique. Je vous partage mes moments préférés. #Concert #Musique #Festival",
//         type: 'audio',
//         likes: 1876,
//         comments: 67,
//         shares: 23,
//     },
// ];

// export default function ContentDetail() {
//     const { id } = useParams<{ id: string }>();
//     const [content, setContent] = useState<ContentItem | null>(null);
//     const [liked, setLiked] = useState(false);

//     useEffect(() => {
//         // In a real app, you would fetch this data from an API
//         const foundContent = mockContentItems.find((item) => item.id === id);
//         if (foundContent) {
//             setContent(foundContent);
//         }
//     }, [id]);

//     if (!content) {
//         return (
//             <PageLayout>
//                 <Head title="Contenu non trouvé" />
//                 <div className="container mx-auto px-4 py-12 text-center">
//                     <h1 className="mb-4 text-2xl font-bold">Contenu non trouvé</h1>
//                     <p className="text-muted-foreground">Le contenu que vous recherchez n'existe pas ou a été supprimé.</p>
//                 </div>
//             </PageLayout>
//         );
//     }

//     const breadcrumbs: BreadcrumbItem[] = [
//         {
//             title: 'TheEnd',
//             href: '/',
//         },
//         {
//             title: content.title,
//             href: `/content/${content.id}`,
//         },
//     ];

//     // Format numbers for display
//     const formatNumber = (num: number): string => {
//         if (num >= 1000000) {
//             return (num / 1000000).toFixed(1) + 'M';
//         } else if (num >= 1000) {
//             return (num / 1000).toFixed(1) + 'K';
//         } else {
//             return num.toString();
//         }
//     };

//     return (
//         <PageLayout breadcrumbs={breadcrumbs}>
//             <Head title={content.title} />
//             <main className="container mx-auto px-4 py-8">
//                 <div className="mx-auto max-w-4xl">
//                     {/* Header with title and author info */}
//                     <div className="mb-6">
//                         <h1 className="mb-4 text-3xl font-bold">{content.title}</h1>
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <Avatar className="h-10 w-10 border">
//                                     <AvatarImage src={content.authorAvatar} alt={content.authorName} />
//                                     <AvatarFallback>{content.authorName[0].toUpperCase()}</AvatarFallback>
//                                 </Avatar>
//                                 <div>
//                                     <div className="font-medium">@{content.authorName}</div>
//                                     <div className="text-muted-foreground flex items-center gap-3 text-sm">
//                                         <span className="flex items-center gap-1">
//                                             <Calendar className="h-3 w-3" />
//                                             {format(content.date, 'd MMMM yyyy', { locale: fr })}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Clock className="h-3 w-3" />
//                                             {format(content.date, 'HH:mm', { locale: fr })}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-muted-foreground text-sm">
//                                 {content.type === 'post' ? 'Publication' : content.type === 'audio' ? 'Audio' : 'Vidéo'}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main content */}
//                     <div className="mb-8">
//                         {content.imageUrl && (
//                             <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
//                                 <Image src={content.imageUrl} alt={content.title} fill className="object-cover" priority />
//                             </div>
//                         )}
//                         <div className="space-y-4 text-lg">
//                             {content.description.split(/\n/).map((paragraph, i) => (
//                                 <p key={i}>{paragraph}</p>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Engagement actions */}
//                     <div className="flex items-center gap-6 border-t py-4">
//                         <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => setLiked(!liked)}>
//                             <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
//                             <span>{formatNumber(liked ? content.likes + 1 : content.likes)}</span>
//                         </Button>

//                         <Button variant="ghost" size="sm" className="flex items-center gap-2">
//                             <MessageCircle className="h-5 w-5" />
//                             <span>{formatNumber(content.comments)}</span>
//                         </Button>

//                         <Button variant="ghost" size="sm" className="flex items-center gap-2">
//                             <Share2 className="h-5 w-5" />
//                             <span>{formatNumber(content.shares)}</span>
//                         </Button>
//                     </div>
//                 </div>
//             </main>
//         </PageLayout>
//     );
// }
