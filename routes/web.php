<?php

use App\Http\Controllers\PsychologicalModuleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('home');

// Psychological Module Routes - Available to all users (authenticated and guests)
Route::controller(PsychologicalModuleController::class)->group(function () {
    Route::get('/psychological-module', 'index')->name('psychological-module.index');
    Route::get('/stress-assessment', 'create')->name('psychological-module.create');
    Route::post('/stress-assessment', 'store')->name('psychological-module.store');
    Route::get('/breathing-exercises', 'show')->name('psychological-module.breathing-exercises');
    Route::get('/relaxation-techniques', 'show')->name('psychological-module.relaxation-techniques');
    Route::get('/mental-health-resources', 'show')->name('psychological-module.resources');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
