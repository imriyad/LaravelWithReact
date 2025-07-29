import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        <div className="p-6 text-white bg-gray-900 min-h-screen">
            <h1 className="text-2xl mb-6">Create New Post</h1>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="w-full px-4 py-2 text-black rounded"
                    />
                    {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
                </div>

                <div>
                    <label className="block mb-1">Content</label>
                    <textarea
                        value={data.content}
                        onChange={e => setData('content', e.target.value)}
                        className="w-full px-4 py-2 text-black rounded"
                    />
                    {errors.content && <p className="text-red-400 text-sm">{errors.content}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                    disabled={processing}
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}
