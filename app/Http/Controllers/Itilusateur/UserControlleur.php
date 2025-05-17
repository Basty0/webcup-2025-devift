<?php

namespace App\Http\Controllers\Itilusateur;

use Inertia\Inertia;
use App\Models\User;

class UserControlleur
{
    public function ViewProfil() {
        $user = auth()->user();
        return Inertia::render('user/profil-user', [
            'user' => $user,
        ]);
    }
}
