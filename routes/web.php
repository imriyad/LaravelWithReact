<?php

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Http\Controllers\PostController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\ViewerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    $posts = Post::orderBy('created_at', 'desc')->paginate(9);

    return Inertia::render('Welcome', [
        'posts' => $posts,
        'auth' => [
            'user' => Auth::user(),
        ],
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

   Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');

   Route::get('/posts/search', [PostController::class, 'search'])->name('posts.search');

Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    Route::get('/details/{id}', [PostController::class, 'detailsData'])->name('details');
    
    Route::post('/comments', [CommentsController::class, 'store'])->name('comments.store');

    Route::put('/posts/{id}', [PostController::class, 'update'])->name('update');

});

Route::middleware(['auth'])->group(function () {
    Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
    Route::post('/posts/{id}/comments', [PostController::class, 'storeComment'])->name('posts.comment');
    Route::get('/posts/{id}/clicked', [PostController::class, 'incrementClicked'])->name('posts.clicked');
});

    Route::delete('/comments/{id}', [CommentsController::class, 'destroy'])->middleware('role:moderator');




    Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('posts', PostController::class);
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

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/editor/dashboard', [EditorController::class, 'dashboard'])->name('editor.dashboard');
// });


Route::middleware(['auth', 'verified'])->prefix('editor')->name('editor.')->group(function () {
    Route::get('/dashboard', [EditorController::class, 'dashboard'])->name('dashboard');
    Route::get('/create', [EditorController::class, 'create'])->name('create');
    Route::post('/store', [EditorController::class, 'store'])->name('store');
    Route::get('/edit/{id}', [EditorController::class, 'edit'])->name('edit');
    Route::put('/update/{id}', [EditorController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [EditorController::class, 'destroy'])->name('destroy');
    Route::patch('/toggle-publish/{id}', [EditorController::class, 'togglePublish'])->name('toggle');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/comments', [CommentsController::class, 'store'])->name('comments.store');
    Route::get('/comments/edit/{id}', [CommentsController::class, 'edit'])->name('comments.edit');
    Route::put('/comments/update/{id}', [CommentsController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{id}', [CommentsController::class, 'destroy'])->name('comments.destroy');
    Route::patch('/comments/approve/{id}', [CommentsController::class, 'approve'])->name('comments.approve');
    Route::get('/posts/{id}/comments', [CommentsController::class, 'seeComments'])->name('posts.comments');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/posts/{id}/moderate', [PostController::class, 'moderate'])->name('posts.moderate');
    Route::delete('/comments/{id}', [App\Http\Controllers\CommentsController::class, 'destroy'])->name('comments.destroy');
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/moderator/dashboard', [ModeratorController::class, 'dashboard'])->name('moderator.dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('User/Dashboard'); // or your dashboard component
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('posts', PostController::class);
});

Route::get('/posts/{id}/clicked', [PostController::class, 'incrementClicked'])->name('posts.incrementClicked');


// Logout route
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Auth routes (Breeze/Jetstream)
require __DIR__.'/auth.php';
