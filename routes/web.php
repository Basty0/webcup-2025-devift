<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\Itilusateur\UserControlleur;
use App\Http\Controllers\TheEndController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\ReactionController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\NewSearchController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes
Route::get('/recherche', function () {
    return Inertia::render('resulatrecherche/resulats-recherche');
})->name('resulatrecherche');

Route::get('/theend/{theend}', [TheEndController::class, 'show'])->name('theend.show');

// Content detail page route
Route::get('/content/{id}', function ($id) {
    return Inertia::render('content/[id]', ['id' => $id]);
})->name('content.show');

// Route de recherche accessible sans authentification
Route::get('/api/search', [NewSearchController::class, 'search'])->name('api.search');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profil', [UserControlleur::class, 'ViewProfil'])
        ->name('profil.ViewProfil');
       
    // Sample Email Testing
    Route::get('/email/sample', function () {
        return Inertia::render('emails/sample');
    })->name('email.sample');

    Route::post('/email/send-sample', [EmailController::class, 'sendSampleEmail'])
        ->name('email.send-sample');

    Route::get('/exprimer-vous', [TheEndController::class, 'createStep1'])->name('theend.step1');
    Route::post('/exprimer-vous/step1', [TheEndController::class, 'storeStep1'])->name('theend.store.step1');
    Route::get('/exprimer-vous/step2/{theend}', [TheEndController::class, 'createStep2'])->name('theend.step2');
    Route::post('/exprimer-vous/step2/{theend}', [TheEndController::class, 'storeStep2'])->name('theend.store.step2');
    Route::get('/exprimer-vous/step3/{theend}', [TheEndController::class, 'createStep3'])->name('theend.step3');
    Route::post('/exprimer-vous/step3/{theend}', [TheEndController::class, 'storeStep3'])->name('theend.store.step3');
    Route::post('/theend/{theend}', [TheEndController::class, 'update'])->name('theend.update');
    Route::delete('/theend/{theend}', [TheEndController::class, 'destroy'])->name('theend.destroy');
    Route::post('/theend/{theend}/comment', [TheEndController::class, 'comment'])->name('theend.comment');

    // Add reaction route
    Route::get('/reaction/{id}/react', [ReactionController::class, 'react']);
});

// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';