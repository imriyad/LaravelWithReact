<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EditorController extends Controller
{
    public function dashboard()
    {
        $posts = Post::paginate(10);

        return Inertia::render('Editor/Dashboard', [
            'posts' => $posts,
            'auth' => Auth::user(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Editor/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = Auth::id();

        Post::create($validated);

        return redirect()->route('editor.dashboard')->with('success', 'Post created!');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if (!$user || !($user->id === $post->user_id || $user->hasRole('admin') || $user->hasRole('editor'))) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Editor/Edit', [
            'myPost' => $post
        ]);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if (!$user || !($user->id === $post->user_id || $user->hasRole('admin') || $user->hasRole('editor'))) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validated);

        return redirect()->route('editor.dashboard')->with('success', 'Post updated!');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if (!$user || !($user->id === $post->user_id || $user->hasRole('admin') || $user->hasRole('editor'))) {
            abort(403, 'Unauthorized action.');
        }

        $post->delete();

        return redirect()->route('editor.dashboard')->with('success', 'Post deleted!');
    }

    public function togglePublish($id)
    {
        $post = Post::findOrFail($id);
        $post->is_published = !$post->is_published;
        $post->save();

        return redirect()->route('editor.dashboard')->with('success', 'Post status updated!');
    }
}
