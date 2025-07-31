<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Mail\PostCreatedMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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
    return Inertia::render('Posts/Create'); // shows the form

    
}
public function moderate($id)
{
    $post = Post::with(['comments.user'])->findOrFail($id);

    // Authorization check - make sure current user is moderator
    if (!auth()->user()->hasRole('moderator')) {
        abort(403, 'Unauthorized');
    }

    return Inertia::render('Posts/ModerateComments', [
        'post' => $post,
        'comments' => $post->comments,
    ]);
}


public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    $post = Post::create([
        'title' => $validated['title'],
        'content' => $validated['content'],
        'user_id' => auth()->id(),
    ]);

    // Send post creation email to the user
    Mail::to(auth()->user()->email)->send(new PostCreatedMail($post));

    // Role-based redirect
    $role = auth()->user()->getRoleNames()->first(); // Spatie

    switch ($role) {
        case 'admin':
            return redirect()->route('admin.dashboard')->with('success', 'Post added & email sent.');
        case 'editor':
            return redirect()->route('editor.dashboard')->with('success', 'Post added & email sent.');
        case 'author':
            return redirect()->route('author.dashboard')->with('success', 'Post added & email sent.');
        default:
            return redirect()->route('dashboard')->with('success', 'Post added & email sent.');
    }
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
    $post = Post::with(['comments.user', 'user'])->findOrFail($id);
    $post->increment('views');

    return Inertia::render('Posts/Show', [
        'post' => $post,
    ]);
}

public function incrementClicked($id)
{
    $post = Post::findOrFail($id);
    $post->increment('clicked');

    return redirect()->route('posts.show', $id);
}

public function storeComment(Request $request, $id)
{
    $request->validate([
        'content' => 'required|string|max:1000',
    ]);

    Comment::create([
        'post_id' => $id,
        'user_id' => auth()->id(),
        'content' => $request->input('content'),
    ]);

    return back()->with('success', 'Comment added.');
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

        return Inertia::render('Posts/SearchResults', [
            'posts' => $posts,
            'query' => $query,
        ]);
    }

    public function moderatorIndex()
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Moderator/Posts/Index', [
            'posts' => $posts,
        ]);
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
