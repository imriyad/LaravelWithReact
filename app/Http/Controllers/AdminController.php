<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
{
    $posts = Post::with('user')->latest()->paginate(10); 

    return Inertia::render('Admin/Dashboard', [
        'posts' => $posts,
    ]);
}
}
