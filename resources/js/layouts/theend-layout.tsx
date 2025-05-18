import { Theend } from '@/types/theend';
import React from 'react';

interface TheendLayoutProps {
    children: React.ReactNode;
    theend?: Theend;
}

// Définition des classes CSS pour chaque ton
const toneStyles = {
    dramatique: {
        background: 'bg-gradient-to-br from-slate-950 via-red-950 to-slate-950',
        text: 'text-slate-100 font-serif',
        heading: 'uppercase tracking-wider text-red-200',
        card: 'border-slate-800 bg-black/60 backdrop-blur-md shadow-xl shadow-red-950/30 rounded-xl',
        button: {
            primary:
                'bg-gradient-to-r from-red-900 to-red-800 text-white border border-red-700 shadow-lg hover:from-red-800 hover:to-red-700 transition-all duration-300',
            secondary: 'bg-black/60 hover:bg-black/80 text-red-400 border border-red-900/50 transition-all duration-300',
            outline: 'border border-red-800 text-red-200 hover:bg-red-950/40 hover:border-red-700 transition-all duration-300',
            ghost: 'text-red-300 hover:text-red-200 hover:bg-red-950/30 transition-all duration-300',
        },
        animation: 'animate-fadeIn',
    },
    ironique: {
        background: 'bg-gradient-to-r from-amber-200 via-rose-100 to-violet-200',
        text: 'text-slate-800 font-sans',
        heading: 'font-bold text-fuchsia-600',
        card: 'border-2 border-dashed border-fuchsia-400 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg shadow-fuchsia-200/30',
        button: {
            primary:
                'bg-gradient-to-r from-fuchsia-500 to-amber-400 text-white rounded-full hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 font-medium',
            secondary: 'bg-white/70 text-fuchsia-600 rounded-full border-2 border-amber-300 hover:bg-amber-100 transition-all duration-300',
            outline: 'border-2 border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-50 rounded-full hover:shadow transition-all duration-300',
            ghost: 'text-fuchsia-600 hover:text-amber-500 hover:bg-white/50 rounded-full transition-all duration-300',
        },
        animation: 'animate-bounce',
    },
    cringe: {
        background: 'bg-gradient-to-r from-lime-300 via-fuchsia-500 to-cyan-400',
        text: 'text-slate-900 font-sans',
        heading: 'font-extrabold text-shadow text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-lime-500',
        card: 'border-4 border-dotted border-lime-400 bg-white/50 backdrop-blur-md rounded-xl shadow-lg shadow-fuchsia-500/20',
        button: {
            primary:
                'bg-gradient-to-r from-lime-500 to-fuchsia-500 text-white font-bold text-lg px-6 rounded-lg border-b-4 border-lime-700 hover:translate-y-[-2px] hover:shadow-xl transition-all',
            secondary: 'bg-white/50 hover:bg-white/70 text-fuchsia-600 font-bold rounded-lg border-2 border-lime-300 transition-all',
            outline: 'border-3 border-lime-500 text-fuchsia-700 font-bold hover:bg-white/30 rounded-lg transition-all',
            ghost: 'text-fuchsia-700 font-bold hover:text-lime-600 hover:bg-white/40 rounded-lg transition-all',
        },
        animation: 'animate-pulse',
    },
    classe: {
        background: 'bg-gradient-to-r from-indigo-600 to-blue-500',
        text: 'text-slate-800 font-sans',
        heading: 'font-semibold text-slate-900 tracking-wide',
        card: 'border border-white/20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg',
        button: {
            primary: 'bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium',
            secondary:
                'bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-100 rounded-lg shadow-sm hover:shadow transition-all duration-300',
            outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300',
            ghost: 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-300',
        },
        animation: 'animate-fadeIn',
    },
    touchant: {
        background: 'bg-gradient-to-br from-rose-200 via-pink-100 to-indigo-200',
        text: 'text-slate-700 font-sans',
        heading: 'font-semibold text-rose-600',
        card: 'border border-rose-200 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg shadow-rose-200/50',
        button: {
            primary:
                'bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-xl hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 font-medium',
            secondary: 'bg-white/70 text-rose-600 rounded-xl border border-rose-300 hover:bg-rose-50 transition-all duration-300',
            outline: 'border-2 border-rose-400 text-rose-600 hover:bg-rose-50 rounded-xl hover:shadow transition-all duration-300',
            ghost: 'text-rose-500 hover:text-rose-600 hover:bg-white/50 rounded-xl transition-all duration-300',
        },
        animation: 'animate-fadeIn',
    },
    absurde: {
        background: 'bg-gradient-to-r from-purple-400 via-yellow-300 to-emerald-400',
        text: 'text-violet-950 font-sans',
        heading: 'font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600',
        card: 'border-4 border-dashed border-yellow-400 bg-white/50 backdrop-blur-md rounded-xl shadow-2xl shadow-purple-500/20 rotate-0',
        button: {
            primary:
                'bg-gradient-to-r from-yellow-400 to-purple-500 text-white rounded-xl transform hover:rotate-0 border-2 border-dotted border-emerald-400 hover:shadow-xl transition-all font-extrabold',
            secondary:
                'bg-emerald-300 hover:bg-purple-300 text-violet-900 rounded-xl border-2 border-purple-400 hover:rotate-0 transform transition-all duration-300',
            outline:
                'border-3 border-yellow-500 text-purple-700 hover:bg-emerald-100 border-dotted rounded-xl hover:rotate-0 transform transition-all duration-300',
            ghost: 'text-purple-700 hover:text-emerald-700 hover:bg-yellow-200/30 rounded-xl hover:rotate-0 transform transition-all',
        },
        animation: 'animate-bounce',
    },
    passif_agressif: {
        background: 'bg-gradient-to-br from-slate-300 via-zinc-100 to-slate-200',
        text: 'text-slate-800 font-sans',
        heading: 'font-medium text-slate-700 uppercase tracking-widest',
        card: 'border-l-4 border-red-400 bg-white/90 backdrop-blur-md rounded-sm shadow-md',
        button: {
            primary:
                'bg-slate-200 hover:bg-red-100 text-slate-700 border border-slate-300 rounded-md hover:text-red-600 uppercase tracking-wide transition-all font-medium',
            secondary: 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 rounded-md hover:text-slate-900 transition-colors',
            outline: 'border border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors',
            ghost: 'text-slate-500 hover:text-red-600 hover:bg-white rounded-md uppercase transition-colors',
        },
        animation: 'animate-fadeIn',
    },
    honnête: {
        background: 'bg-gradient-to-b from-slate-50 to-blue-50',
        text: 'text-slate-800 font-sans',
        heading: 'font-medium text-slate-900',
        card: 'border border-slate-200 bg-white/90 backdrop-blur-md rounded-lg shadow-md',
        button: {
            primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:shadow-md transition-all duration-300',
            secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-md transition-colors',
            outline: 'border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-md transition-colors',
            ghost: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors',
        },
        animation: 'animate-fadeIn',
    },
};

// Styles par défaut si le ton n'est pas reconnu
const defaultStyle = {
    background: 'bg-gradient-to-b from-slate-100 to-white',
    text: 'text-slate-900',
    heading: 'font-medium text-slate-800',
    card: 'border bg-white/80 backdrop-blur-sm shadow-sm',
    button: {
        primary: 'bg-primary hover:bg-primary/90 text-primary-foreground transition-colors',
        secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-colors',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors',
        ghost: 'hover:bg-accent hover:text-accent-foreground transition-colors',
    },
    animation: 'animate-fadeIn',
};

// Stocker les styles CSS dans une variable globale pour y accéder depuis d'autres composants
export const getTheendStyles = (tone: string) => {
    const normalizedTone = tone?.toLowerCase() || 'default';
    return toneStyles[normalizedTone as keyof typeof toneStyles] || defaultStyle;
};

export default function TheendLayout({ children, theend }: TheendLayoutProps) {
    // Obtenir le style correspondant au ton du theend ou utiliser le style par défaut
    const tone = theend?.tone?.toLowerCase() || 'default';
    const style = toneStyles[tone as keyof typeof toneStyles] || defaultStyle;

    return (
        <div className={`min-h-screen ${style.background}`}>
            {/* iconne pour aller en homme */}

            <div className={`${style.text}`}>{children}</div>
        </div>
    );
}
