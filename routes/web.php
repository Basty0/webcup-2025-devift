<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\Itilusateur\UserControlleur;
use App\Http\Controllers\TheEndController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/recherche', function () {
        return Inertia::render('resulatrecherche/resulats-recherche');
    })->name('resulatrecherche');


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
    Route::get('/theend/{theend}', [TheEndController::class, 'show'])->name('theend.show');
    Route::post('/theend/{theend}', [TheEndController::class, 'update'])->name('theend.update');
    Route::delete('/theend/{theend}', [TheEndController::class, 'destroy'])->name('theend.destroy');

});


// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';