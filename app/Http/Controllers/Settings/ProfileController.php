<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'bio' => 'nullable|string',
        'photo' => 'nullable|image|max:2048',
        'photo_cover' => 'nullable|image|max:4096',
    ]);

    $user = auth()->user();

    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');
        $photoName = uniqid('photo_') . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('uploads/photos'), $photoName);
        $user->photo = '/uploads/photos/' . $photoName;
    }

    if ($request->hasFile('photo_cover')) {
        $cover = $request->file('photo_cover');
        $coverName = uniqid('cover_') . '.' . $cover->getClientOriginalExtension();
        $cover->move(public_path('uploads/covers'), $coverName);
        $user->photo_cover = '/uploads/covers/' . $coverName;
    }

    $user->name = $request->name;
    $user->email = $request->email;
    $user->bio = $request->bio;
    $user->save();

    return redirect('/profil');
}


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
