<?php

namespace App\Http\Controllers\Itilusateur;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Theend;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;

class UserControlleur
{
    // Affichage du profil utilisateur
    public function ViewProfil()
    {
        $user = Auth::user();

        // Récupérer les publications (Theend) de l'utilisateur
        $publishedPosts = Theend::where('user_id', $user->id)
            ->where('is_draft', false)
            ->with(['comments.user', 'reactions'])
            ->orderBy('created_at', 'desc')
            ->get();

        $draftPosts = Theend::where('user_id', $user->id)
            ->where('is_draft', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('user/profil-user', [
            'user' => $user,
            'publishedPosts' => $publishedPosts,
            'draftPosts' => $draftPosts,
        ]);
    }

    // Affichage du profil utilisateur public par slug
    public function viewPublicProfile($slug)
    {
        // Trouver l'utilisateur par son slug
        $user = User::where('slug', $slug)->firstOrFail();

        // Récupérer uniquement les publications publiques
        $publishedPosts = Theend::where('user_id', $user->id)
            ->where('is_draft', false)
            ->with(['comments.user', 'reactions', 'type'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('user/public-profile', [
            'user' => $user,
            'publishedPosts' => $publishedPosts,
            'isOwner' => Auth::check() && Auth::id() === $user->id
        ]);
    }

}