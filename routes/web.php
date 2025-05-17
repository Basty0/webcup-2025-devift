<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\Itilusateur\UserControlleur;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profil', [UserControlleur::class, 'ViewProfil'])
        ->name('profil.ViewProfil');

    // Sample Email Testing
    Route::get('/email/sample', function () {
        return Inertia::render('emails/sample');
    })->name('email.sample');

    Route::post('/email/send-sample', [EmailController::class, 'sendSampleEmail'])
        ->name('email.send-sample');
});


// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
