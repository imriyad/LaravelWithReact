import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Show({ post, auth }) {
  const { data, setData, post: postComment, processing, reset } = useForm({
    post_id: post.id,
    author_name: auth.user?.name || '',
    comment_text: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(route('comments.store'), {
      onSuccess: () => reset('comment_text'),
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.content}</p>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment.id} className="p-3 bg-white shadow rounded mb-2">
            <strong>{comment.author_name}</strong>
            <p>{comment.comment_text}</p>
          </div>
        ))}
      </div>

      {auth.user && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-6">
          <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
          <textarea
            className="w-full border p-2 rounded mb-2"
            value={data.comment_text}
            onChange={(e) => setData('comment_text', e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={processing}
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
}
