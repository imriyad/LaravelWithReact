<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ViewerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Shared auth-protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/posts/add', function () {
        return Inertia::render('Posts/Add');
    })->name('posts.add');

    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    Route::put('/posts/{id}', [PostController::class, 'update'])->name('update');

});

// // Admin dashboard route
// Route::get('/admin/dashboard', function () {
//     return Inertia::render('Admin/Dashboard');
// })->middleware(['auth', 'verified'])->name('admin.dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/viewer/dashboard', [ViewerController::class, 'dashboard'])->name('viewer.dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('User/Dashboard'); // or your dashboard component
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('posts', PostController::class);
});


// Logout route
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Auth routes (Breeze/Jetstream)
require __DIR__.'/auth.php';
