<?php

namespace App\Http\Controllers\Itilusateur;

use Inertia\Inertia;
use App\Models\User;
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
    public function ViewProfil() {
        $user = auth()->user();
        return Inertia::render('user/profil-user', [
            'user' => $user,
        ]);
    }

   
}
