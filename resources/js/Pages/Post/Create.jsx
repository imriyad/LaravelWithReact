// resources/js/Pages/Post/Create.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.post('/posts', { title, content }, {
      onError: (errors) => {
        setErrors(errors);
      },
      onSuccess: () => {
        // Optional: clear form or redirect
        setTitle('');
        setContent('');
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={5}
          ></textarea>
          {errors.content && <p className="text-red-600 mt-1">{errors.content}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
