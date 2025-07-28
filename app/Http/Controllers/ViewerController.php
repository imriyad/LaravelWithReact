<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ViewerController extends Controller
{
     public function dashboard()
    {
        $posts = Post::paginate(10);

        return Inertia::render('Viewer/Dashboard', [
            'posts' => $posts,
            'auth' => auth()->user(),
        ]);
    }
}
