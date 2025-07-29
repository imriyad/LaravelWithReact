import React from 'react';
import { usePage, router } from '@inertiajs/react';

export default function ModerateComments() {
    const { post, comments } = usePage().props;

    function handleDelete(commentId) {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(`/comments/${commentId}`, {
                onSuccess: () => {
                    alert('Comment deleted successfully');
                },
                onError: () => {
                    alert('Failed to delete comment');
                }
            });
        }
    }

    return (
        <div className="p-6 text-white bg-gray-900 min-h-screen max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="mb-8">{post.content}</p>

            <h2 className="text-2xl font-semibold mb-4">Comments</h2>

            {comments.length === 0 && (
                <p>No comments yet.</p>
            )}

            <ul>
                {comments.map(comment => (
                    <li key={comment.id} className="flex justify-between items-center mb-3 bg-gray-800 p-3 rounded">
                        <div>
                            <strong>{comment.user?.name || 'Anonymous'}</strong>
                            <p>{comment.comment_text}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(comment.id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
