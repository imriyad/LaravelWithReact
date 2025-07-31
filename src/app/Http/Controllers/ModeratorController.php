<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ModeratorController extends Controller
{
     public function dashboard()
    {
        $posts = Post::paginate(10);

        return Inertia::render('Moderator/Dashboard', [
            'posts' => $posts,
            'auth' => auth()->user(),
        ]);
    }
}
