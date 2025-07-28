import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Add({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Post" />

            <div className="max-w-xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block">Content</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.content && <div className="text-red-500">{errors.content}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {processing ? 'Saving...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
