<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentsController extends Controller
{
    public function store(Request $req)
{
    $validate = $req->validate([
        'post_id' => 'required|exists:posts,id',
        'author_name' => 'required|string|max:255',
        'comment_text' => 'required|string',
    ]);

    Comment::create($validate);

    return back()->with('success', 'Your Comment has been added!');
}
    public function approve($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->is_approved = true;
        $comment->save();

        return redirect()->back()->with('success', 'Comment approved successfully.');
    }

    public function edit($id)
    {
        $comment = Comment::findOrFail($id);
        return Inertia::render('Comments/Edit', [
            'comment' => $comment,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'comment_text' => 'required|string',
            'author_name' => 'required|string|max:255',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->comment_text = $request->comment_text;
        $comment->author_name = $request->author_name;
        $comment->save();

        return redirect()->route('moderator.dashboard')->with('success', 'Comment updated successfully.');
    }

    public function seeComments($id)
    {
        $post = Post::with('comments')->findOrFail($id);

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    public function destroy($id)
{
    $comment = Comment::findOrFail($id);

    // Authorization: only moderators allowed (already enforced by middleware)
    $comment->delete();

    return redirect()->back()->with('success', 'Comment deleted successfully.');
}



}
