import CommentForm from '@/components/comments/CommentForm';
import CommentList from '@/components/comments/CommentList';
import ShareModal from '@/components/share/ShareModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import TheendLayout, { getTheendStyles } from '@/layouts/theend-layout';
import { SharedData } from '@/types';
import { Theend } from '@/types/theend';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Angry,
    ArrowLeftIcon,
    ArrowRight,
    Award,
    Bookmark,
    Eye,
    Flame,
    Frown,
    Heart,
    MessageCircle,
    Music,
    Pause,
    Play,
    Share2,
    SmilePlus,
    ThumbsUp,
    Volume2,
    VolumeX,
    Zap,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type ReactionType = 'joy' | 'cry' | 'fire' | 'heart' | 'nauseated' | 'clap' | 'angry' | 'surprised';

// Configuration des icônes de réaction
const reactionIcons: Record<ReactionType, React.ReactElement> = {
    heart: <Heart className="h-8 w-8" />,
    fire: <Flame className="h-8 w-8" />,
    joy: <SmilePlus className="h-8 w-8" />,
    cry: <Frown className="h-8 w-8" />,
    nauseated: <Zap className="h-8 w-8" />,
    clap: <Award className="h-8 w-8" />,
    angry: <Angry className="h-8 w-8" />,
    surprised: <ThumbsUp className="h-8 w-8" />,
};

const reactionColors: Record<ReactionType, string> = {
    heart: 'bg-pink-500 hover:bg-pink-600',
    fire: 'bg-orange-500 hover:bg-orange-600',
    joy: 'bg-yellow-500 hover:bg-yellow-600',
    cry: 'bg-blue-500 hover:bg-blue-600',
    nauseated: 'bg-green-500 hover:bg-green-600',
    clap: 'bg-purple-500 hover:bg-purple-600',
    angry: 'bg-red-500 hover:bg-red-600',
    surprised: 'bg-indigo-500 hover:bg-indigo-600',
};

const reactionLabels: Record<ReactionType, string> = {
    heart: 'Amour',
    fire: 'Feu',
    joy: 'Joie',
    cry: 'Tristesse',
    nauseated: 'Dégoût',
    clap: 'Applaudissement',
    angry: 'Colère',
    surprised: 'Surprise',
};

interface ShowProps {
    theend: Theend & {
        user: {
            id: number;
            name: string;
            avatar_url: string | null;
            email?: string;
            bio?: string | null;
            photo?: string | null;
            slug: string;
        };
        type: {
            id: number;
            label: string;
        };
        comments: Array<{
            id: number;
            content: string;
            user: {
                id: number;
                name: string;
                avatar_url: string | null;
                bio?: string | null;
                photo?: string | null;
            };
            created_at: string;
        }>;
        reactions: Array<{
            id: number;
            type: string;
            user_id: number;
        }>;
        created_at: string;
        views_count: number;
    };
}

// Classes CSS pour les éléments par ton
const toneStyles = {
    dramatique: {
        cardClass: 'border-slate-800 bg-black/60 backdrop-blur-sm shadow-xl shadow-red-950/30',
        headingClass: 'text-red-200 uppercase tracking-wider font-semibold',
        textClass: 'text-slate-200 font-serif',
        badgeClass: 'bg-gradient-to-r from-red-900 to-red-800 text-white shadow-sm',
    },
    ironique: {
        cardClass: 'border-2 border-dashed border-fuchsia-400 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md',
        headingClass: 'text-fuchsia-800 font-bold',
        textClass: 'text-slate-900',
        badgeClass: 'bg-gradient-to-r from-fuchsia-600 to-amber-500 text-white rounded-full font-medium',
    },
    cringe: {
        cardClass: 'border-4 border-dotted border-lime-500 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg shadow-fuchsia-500/20',
        headingClass: 'text-violet-900 font-extrabold',
        textClass: 'text-slate-900 font-comic',
        badgeClass: 'bg-gradient-to-r from-lime-600 to-fuchsia-600 text-white font-bold rounded-full',
    },
    classe: {
        cardClass: 'border-t-2 border-amber-600 bg-black/50 backdrop-blur-sm rounded-none',
        headingClass: 'text-amber-100 font-medium tracking-wider uppercase',
        textClass: 'text-gray-100',
        badgeClass: 'bg-black border border-amber-600 text-amber-400 rounded-none uppercase tracking-wide',
    },
    touchant: {
        cardClass: 'border border-rose-300 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-rose-200/50',
        headingClass: 'text-rose-700 font-semibold',
        textClass: 'text-slate-800',
        badgeClass: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium',
    },
    absurde: {
        cardClass: 'border-4 border-dashed border-yellow-500 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg rotate-1',
        headingClass: 'text-purple-800 font-black rotate-1',
        textClass: 'text-violet-950',
        badgeClass: 'bg-gradient-to-r from-yellow-500 to-purple-600 text-white font-bold rounded-xl transform rotate-1',
    },
    passif_agressif: {
        cardClass: 'border-l-4 border-red-500 bg-white/90 backdrop-blur-sm rounded-sm shadow-none',
        headingClass: 'text-slate-800 font-medium uppercase tracking-widest',
        textClass: 'text-slate-900 font-mono',
        badgeClass: 'bg-slate-200 text-red-700 border border-slate-300 rounded-none uppercase tracking-wide',
    },
    honnête: {
        cardClass: 'border border-slate-300 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm',
        headingClass: 'text-slate-900 font-medium',
        textClass: 'text-slate-800',
        badgeClass: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md',
    },
    default: {
        cardClass: 'border bg-white/90 backdrop-blur-sm shadow-sm',
        headingClass: 'text-slate-900 font-medium',
        textClass: 'text-slate-800',
        badgeClass: 'bg-secondary text-secondary-foreground',
    },
};

// Simplify animations for brevity
const toneAnimations = {
    default: {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    duration: 0.5,
                    ease: 'easeOut',
                },
            },
        },
        item: {
            hidden: { y: 20, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                },
            },
        },
        hover: {
            scale: 1.02,
            y: -5,
            transition: { duration: 0.2 },
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 },
        },
    },
    dramatic: {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.15,
                    duration: 0.6,
                },
            },
        },
        item: {
            hidden: { y: 30, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                },
            },
        },
        hover: {
            scale: 1.03,
            boxShadow: '0 10px 30px rgba(139, 0, 0, 0.2)',
            transition: { duration: 0.3 },
        },
        tap: {
            scale: 0.97,
            transition: { duration: 0.1 },
        },
    },
};

export default function Show({ theend }: ShowProps) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;
    const [isReactionModalOpen, setIsReactionModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(theend.reactions.some((r) => r.type === 'save' && r.user_id === theend.user.id));
    const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(
        (theend.reactions.find((r) => r.user_id === theend.user.id)?.type as ReactionType) || null,
    );
    const [reactionCounts, setReactionCounts] = useState<Record<ReactionType, number>>(
        Object.keys(reactionIcons).reduce(
            (acc, type) => ({
                ...acc,
                [type]: theend.reactions.filter((r) => r.type === type).length,
            }),
            {} as Record<ReactionType, number>,
        ),
    );

    // Scroll to comments if URL query parameter is present
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shouldShowComments = urlParams.get('showComments') === 'true';

        if (shouldShowComments) {
            setTimeout(() => {
                const commentsSection = document.getElementById('comments-section');
                if (commentsSection) {
                    commentsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }, []);

    // Ajout des états pour le lecteur audio
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Obtenir le style et l'animation en fonction du ton
    const tone = theend.tone?.toLowerCase() || 'default';
    const style = toneStyles[tone as keyof typeof toneStyles] || toneStyles.default;
    const animation = toneAnimations[tone === 'dramatique' ? 'dramatic' : 'default'];

    // Récupérer les styles personnalisés pour les boutons
    const theendStyles = getTheendStyles(tone);

    // Gestion du lecteur audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;

        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;

        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleSelectReaction = async (type: ReactionType) => {
        const previousReaction = currentReaction;
        setCurrentReaction(type);
        setIsReactionModalOpen(false);

        // Update counts optimistically
        setReactionCounts((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
            ...(previousReaction ? { [previousReaction]: prev[previousReaction] - 1 } : {}),
        }));

        try {
            await axios.get(`/reaction/${theend.id}/react`, {
                params: { type },
            });
        } catch (error) {
            console.error('Error processing reaction:', error);
            // Revert on error
            setCurrentReaction(previousReaction);
            setReactionCounts((prev) => ({
                ...prev,
                [type]: prev[type] - 1,
                ...(previousReaction ? { [previousReaction]: prev[previousReaction] + 1 } : {}),
            }));
        }
    };

    return (
        <TheendLayout theend={theend}>
            {/* Lecteur audio en arrière-plan */}
            {theend.sound_url && <audio ref={audioRef} src={theend.sound_url} preload="metadata" />}
            <Link
                href={route('dashboard')}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/40"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Accueil</span>
            </Link>
            <motion.div
                className="mx-auto max-w-4xl p-4 md:p-6"
                variants={animation.container}
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
            >
                {/* En-tête */}
                <motion.div className="mb-8" variants={animation.item}>
                    <motion.div whileHover={animation.hover} whileTap={animation.tap} className={`${style.cardClass} overflow-hidden`}>
                        <CardHeader className="p-10">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-start gap-4">
                                    <Link href={route('user.profile', theend.user.slug)} className="group flex flex-col items-center">
                                        <Avatar className="group-hover:border-primary/50 h-16 w-16 cursor-pointer border-2 border-white/20 transition-all">
                                            <AvatarImage src={theend.user.photo || theend.user.avatar_url || undefined} alt={theend.user.name} />
                                            <AvatarFallback>{theend.user.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div className="flex flex-col">
                                        <Link
                                            href={route('user.profile', theend.user.slug)}
                                            className={`text-lg font-semibold ${style.headingClass} hover:underline`}
                                        >
                                            {theend.user.name}
                                        </Link>
                                        {theend.user.bio && (
                                            <p className={`text-muted-foreground mt-1 line-clamp-2 max-w-md text-sm`}>{theend.user.bio}</p>
                                        )}
                                        <div className="text-muted-foreground mt-1 flex items-center space-x-2 text-sm">
                                            <span>{new Date(theend.created_at).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <div className="flex items-center space-x-1">
                                                <Eye className="h-4 w-4" />
                                                <span>{theend.views_count} vues</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Badge className={style.badgeClass}>{theend.type.label}</Badge>
                            </div>
                        </CardHeader>
                    </motion.div>
                </motion.div>

                {/* Contenu principal */}
                <motion.div className="mb-8 space-y-6" variants={animation.item}>
                    <motion.div whileHover={animation.hover} whileTap={animation.tap} className="overflow-hidden">
                        <Card className="border-none bg-transparent">
                            <CardContent className="border-none bg-transparent p-0">
                                <div className="flex flex-col">
                                    <h1 className={`mb-4 text-3xl font-bold ${style.headingClass}`}>{theend.title}</h1>
                                </div>
                                <motion.p
                                    className={`text-lg leading-relaxed whitespace-pre-wrap ${style.textClass}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    {theend.content}
                                </motion.p>

                                {/* Médias */}
                                {(theend.image_url || theend.sound_url) && (
                                    <div className="mt-6 space-y-4">
                                        {theend.image_url && (
                                            <motion.div
                                                className="relative overflow-hidden rounded-lg shadow-md"
                                                whileHover={{ scale: 1.01 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img
                                                    src={theend.image_url}
                                                    alt="Image"
                                                    className="w-full rounded-lg object-cover shadow-md"
                                                    style={{
                                                        maxHeight: '70vh',
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                    }}
                                                    loading="lazy"
                                                />
                                            </motion.div>
                                        )}
                                        {theend.sound_url && (
                                            <motion.div
                                                className={`overflow-hidden rounded-lg border border-white/20 bg-black/40 p-4 shadow-md backdrop-blur-md ${style.cardClass}`}
                                                whileHover={animation.hover}
                                                whileTap={animation.tap}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <motion.button
                                                        onClick={togglePlay}
                                                        className={`flex h-12 w-12 items-center justify-center rounded-full p-0 ${theendStyles.button.primary} shadow-lg`}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-1 h-5 w-5" />}
                                                    </motion.button>

                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className={`text-xs font-medium ${style.textClass}`}>
                                                                {formatTime(currentTime)}
                                                            </span>
                                                            <Music className={`h-4 w-4 ${style.textClass}`} />
                                                            <span className={`text-xs font-medium ${style.textClass}`}>{formatTime(duration)}</span>
                                                        </div>
                                                        <div className="relative">
                                                            <motion.div
                                                                className="h-2 w-full overflow-hidden rounded-full bg-white/20"
                                                                whileHover={{ height: '10px' }}
                                                            >
                                                                <motion.div
                                                                    className="h-full bg-white/70 transition-all duration-150"
                                                                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                                                                    animate={{
                                                                        width: `${(currentTime / (duration || 1)) * 100}%`,
                                                                    }}
                                                                ></motion.div>
                                                            </motion.div>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max={duration || 100}
                                                                value={currentTime}
                                                                onChange={handleProgress}
                                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                            />
                                                        </div>
                                                    </div>

                                                    <motion.button
                                                        onClick={toggleMute}
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full p-0 hover:bg-white/10 ${style.textClass}`}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
                {/* Actions section - fixed version */}
                <motion.div
                    className="mt-6 mb-8 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between"
                    variants={animation.item}
                >
                    <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
                        {/* React button */}
                        {isAuthenticated ? (
                            <div className="group relative">
                                <motion.button
                                    onClick={() => setIsReactionModalOpen(true)}
                                    className={`flex w-full items-center justify-center rounded-full px-2 py-2 sm:px-3 sm:py-2 ${currentReaction ? reactionColors[currentReaction] : 'bg-gray-800 hover:bg-gray-700'}`}
                                    whileHover={animation.hover}
                                    whileTap={animation.tap}
                                >
                                    {currentReaction ? (
                                        <>
                                            {React.cloneElement(reactionIcons[currentReaction], {
                                                className: 'h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-white',
                                            } as React.SVGProps<SVGSVGElement>)}
                                            <span className="text-xs text-white sm:text-sm">{theend.reactions.length}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                                            <span className="hidden text-xs text-white sm:inline sm:text-sm">Réagir</span>
                                            <span className="text-xs text-white sm:text-sm">{theend.reactions.length}</span>
                                        </>
                                    )}
                                </motion.button>

                                {/* Popup on hover */}
                                <div className="absolute bottom-full left-0 z-10 mb-2 hidden group-hover:block">
                                    <div className="rounded-lg bg-black/90 p-3 shadow-lg">
                                        <div className="space-y-2">
                                            {Object.entries(reactionCounts)
                                                .filter(([, count]) => count > 0)
                                                .map(([type, count]) => (
                                                    <div key={type} className="flex items-center space-x-2">
                                                        <div className={`rounded-full p-1.5 ${reactionColors[type as ReactionType]}`}>
                                                            {React.cloneElement(reactionIcons[type as ReactionType], {
                                                                className: 'h-3 w-3 text-white',
                                                                role: 'img',
                                                            } as React.SVGProps<SVGSVGElement>)}
                                                        </div>
                                                        <span className="text-xs text-white">{count}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Button disabled className="cursor-not-allowed bg-gray-400 hover:bg-gray-400" title="Connectez-vous pour réagir">
                                <Heart className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                                <span className="text-xs text-white sm:text-sm">{theend.reactions.length}</span>
                            </Button>
                        )}

                        {/* Comment button */}
                        <motion.button
                            onClick={() => {
                                const commentsSection = document.getElementById('comments-section');
                                if (commentsSection) {
                                    commentsSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className={`flex items-center justify-center rounded-full px-2 py-2 sm:px-3 sm:py-2 ${theendStyles.button.primary}`}
                            whileHover={animation.hover}
                            whileTap={animation.tap}
                        >
                            <MessageCircle className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                            <span className="text-xs sm:text-sm">{theend.comments.length}</span>
                            <span className="xs:inline ml-1 hidden text-xs sm:text-sm">Commentaires</span>
                        </motion.button>

                        {/* Share button */}
                        <motion.button
                            onClick={() => setIsShareModalOpen(true)}
                            className={`flex items-center justify-center rounded-full px-2 py-2 sm:px-3 sm:py-2 ${theendStyles.button.secondary}`}
                            whileHover={animation.hover}
                            whileTap={animation.tap}
                        >
                            <Share2 className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                            <span className="xs:inline hidden text-xs sm:text-sm">Partager</span>
                        </motion.button>
                    </div>

                    {isAuthenticated ? (
                        <motion.button
                            onClick={() => setIsSaved(!isSaved)}
                            className={`mt-2 flex items-center justify-center rounded-full px-2 py-2 sm:mt-0 sm:px-3 sm:py-2 ${isSaved ? theendStyles.button.primary : theendStyles.button.secondary}`}
                            whileHover={animation.hover}
                            whileTap={animation.tap}
                        >
                            <Bookmark
                                className={isSaved ? 'mr-1 h-4 w-4 fill-current sm:mr-2 sm:h-5 sm:w-5' : 'mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5'}
                            />
                            <span className="text-xs sm:text-sm">{isSaved ? 'Sauvegardé' : 'Sauvegarder'}</span>
                        </motion.button>
                    ) : (
                        <Button
                            disabled
                            className="mt-2 cursor-not-allowed bg-gray-400 hover:bg-gray-400 sm:mt-0"
                            title="Connectez-vous pour sauvegarder"
                        >
                            <Bookmark className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                            <span className="text-xs sm:text-sm">Sauvegarder</span>
                        </Button>
                    )}
                </motion.div>
                {/* Commentaires */}
                <motion.div
                    id="comments-section"
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className={`${style.cardClass} overflow-hidden py-2 md:py-3`}
                        variants={animation.item}
                        whileHover={animation.hover}
                        whileTap={animation.tap}
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <h3 className={`text-xl font-semibold ${style.headingClass}`}>Commentaires</h3>
                                <span className="text-muted-foreground text-sm">{theend.comments.length} commentaire(s)</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isAuthenticated ? (
                                <CommentForm
                                    theendSlug={theend.slug}
                                    comments={theend.comments}
                                    cardClass={style.cardClass}
                                    headingClass={style.headingClass}
                                    textClass={style.textClass}
                                    currentUserId={auth.user?.id}
                                />
                            ) : (
                                <>
                                    <motion.div
                                        className="bg-muted/50 mb-4 rounded-lg p-4 text-center"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href={route('login')}
                                            className="text-muted-foreground hover:text-primary group inline-flex cursor-pointer items-center gap-2 transition-colors duration-200"
                                        >
                                            <span>Connectez-vous pour ajouter un commentaire</span>
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5, repeatType: 'loop' }}
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                    <CommentList
                                        comments={theend.comments}
                                        cardClass={style.cardClass}
                                        headingClass={style.headingClass}
                                        textClass={style.textClass}
                                        currentUserId={auth.user?.id}
                                    />
                                </>
                            )}
                        </CardContent>
                    </motion.div>
                </motion.div>

                {/* Reaction Modal */}
                {isAuthenticated && (
                    <Dialog open={isReactionModalOpen} onOpenChange={setIsReactionModalOpen}>
                        <DialogContent className="max-w-md overflow-hidden border-none bg-gray-900/95 p-0 text-white backdrop-blur-xl">
                            <motion.div
                                className="px-6 py-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DialogTitle className="mb-6 text-center text-2xl font-bold text-white">
                                    {currentReaction ? 'Changer de réaction' : 'Choisir une réaction'}
                                </DialogTitle>

                                <div className="grid grid-cols-4 gap-4">
                                    {(Object.keys(reactionIcons) as ReactionType[]).map((type) => (
                                        <motion.button
                                            key={type}
                                            className={`flex flex-col items-center rounded-xl p-3 text-white transition-colors ${
                                                currentReaction === type ? 'ring-2 ring-white' : ''
                                            } ${reactionColors[type]}`}
                                            onClick={() => handleSelectReaction(type)}
                                            whileHover={animation.hover}
                                            whileTap={animation.tap}
                                        >
                                            <motion.div
                                                animate={{ y: currentReaction === type ? [0, -5, 0] : 0 }}
                                                transition={{
                                                    repeat: currentReaction === type ? Infinity : 0,
                                                    duration: 1.5,
                                                    repeatType: 'reverse',
                                                }}
                                            >
                                                {reactionIcons[type]}
                                            </motion.div>
                                            <span className="mt-2 text-xs font-medium">{reactionLabels[type]}</span>
                                            <span className="mt-1 text-xs opacity-75">{reactionCounts[type]}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </DialogContent>
                    </Dialog>
                )}

                {/* Share Modal */}
                <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} slug={theend.slug} />
            </motion.div>
        </TheendLayout>
    );
}
