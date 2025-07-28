import { useForm } from '@inertiajs/react';

export default function Index({ myPost }) {
    const { data, setData, put, errors } = useForm({
        title: myPost.title || '',
        content: myPost.content || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('update', myPost.id));
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <h1 className="text-3xl bg-blue-500 p-4 rounded-xl mb-4">Edit Post</h1>

            <a href="/" className="bg-green-500 p-4 px-8 mb-8 inline-block rounded text-white">
                Back to Homepage
            </a>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full p-2 text-black"
                        placeholder="Enter Title"
                    />
                    {errors.title && <p className="bg-red-600 p-2 mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block">Content:</label>
                    <input
                        type="text"
                        name="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="w-full p-2 text-black"
                        placeholder="Enter Content"
                    />
                    {errors.content && <p className="bg-red-600 p-2 mt-1">{errors.content}</p>}
                </div>

                <button type="submit" className="bg-green-500 px-4 py-2 rounded text-white">
                    Update Post
                </button>
            </form>
        </div>
    );
}
