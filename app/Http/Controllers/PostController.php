<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    // List all posts with pagination
    public function index()
    {
        // Get posts paginated, latest first, with user relationship eager loaded
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate(10);

        // Return to Inertia page, passing paginated posts
        return Inertia::render('EditIndex', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return view('create.index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();

        Post::create($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Post created!');
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if (!$user) {
            abort(403, 'You must be logged in.');
        }

        if ($user->id === $post->user_id || $user->hasRole('admin') || $user->hasRole('editor')) {
            return Inertia::render('Edit/Index', [
                'myPost' => $post,
            ]);
        }

        abort(403, 'Unauthorized action.');
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if (!$user) {
            abort(403, 'You must be logged in.');
        }

        if ($user->id === $post->user_id || $user->hasRole('admin') || $user->hasRole('editor')) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
            ]);

            $post->update($validated);

            return redirect()->route('admin.dashboard')->with('success', 'Post updated!');
        }

        abort(403, 'Unauthorized action.');
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();

        if (!$user) {
            abort(403, 'You must be logged in.');
        }

        if ($user->id === $post->user_id || $user->hasRole('admin') || $user->hasRole('editor')) {
            $post->delete();

            return redirect()->route('admin.dashboard')->with('success', 'Post deleted!');
        }

        abort(403, 'Unauthorized action.');
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        $post->increment('views');

        return view('details.index', ['post' => $post]);
    }

    public function incrementClicked($id)
    {
        $post = Post::findOrFail($id);
        $post->increment('clicked');

        return redirect()->route('details', $id);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $words = explode(' ', $query);

        $posts = Post::query()
            ->where(function ($q) use ($words) {
                foreach ($words as $word) {
                    $q->orWhere('title', 'like', "%{$word}%")
                      ->orWhere('content', 'like', "%{$word}%");
                }
            })
            ->select('*')
            ->selectRaw('COALESCE(views,0) + COALESCE(clicked,0) as score')
            ->orderByDesc('score')
            ->paginate(10)
            ->appends(['query' => $query]);

        return view('posts.search_results', compact('posts', 'query'));
    }

    public function moderatorIndex()
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate(10);
        return view('moderator.posts.index', compact('posts'));
    }

    public function approve($id)
    {
        $post = Post::findOrFail($id);
        $post->status = 'approved';
        $post->is_published = true;
        $post->save();

        return redirect()->back()->with('success', 'Post approved and published.');
    }
}
