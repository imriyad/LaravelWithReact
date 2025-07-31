import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function EditIndex() {
    const { posts, auth } = usePage().props;

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">

            {/* Top Right: Hi Name + Logout */}
            <div className="flex justify-end items-center mb-6 space-x-4">
                <span className="text-white text-lg">Hi, {auth.user.name}</span>
                <Link
                    method="post"
                    href="/logout"
                    as="button"
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                >
                    Logout
                </Link>
            </div>

            {/* Header + Create + Search */}
            <div className="flex flex-col items-center justify-center mb-8">
                <h1 className="text-3xl mb-4">Welcome Here !!</h1>

                {/* Search bar */}
                <form method="GET" action="/posts/search" className="mb-6 w-full max-w-md flex">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search posts..."
                        className="flex-grow px-4 py-2 rounded-l text-black"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                        Search
                    </button>
                </form>


                <Link href="/posts/create" className="bg-green-500 p-4 px-8 rounded">
                    Create New Post
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-sm font-medium text-white">
                            <th className="py-3 px-6">ID</th>
                            <th className="py-3 px-6">Title</th>
                            <th className="py-3 px-6">Content</th>
                            {/* <th className="py-3 px-6">Views</th>
                            <th className="py-3 px-6">Clicked</th> */}
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.length > 0 ? (
                            posts.data.map((post) => (
                                <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700">
                                    <td className="py-3 px-6">{post.id}</td>
                                    <td className="py-3 px-6">{post.title}</td>
                                    <td className="py-3 px-6">{post.content}</td>
                                    {/* <td className="py-3 px-6">{post.views}</td>
                                    <td className="py-3 px-6">{post.clicked ?? 0}</td> */}
                                    <td className="py-3 px-6 text-center space-x-2">
                                        <Link
                                            href={`/posts/${post.id}/edit`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            method="DELETE"
                                            href={`/posts/${post.id}`}
                                            as="button"
                                            className="bg-red-500 hover:bg-red-700 text-black py-1 px-3 rounded"
                                            onClick={() => confirm("Are you sure you want to delete this post?")}
                                        >
                                            Delete
                                        </Link>

                                        {/* <Link
                                            href={`/posts/${post.id}/increment-clicked`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
                                        >
                                            See the Post and Add a Comment
                                        </Link> */}

                                        <Link
                                            href={`/posts/${post.id}/comments`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
                                        >
                                            See All Comments
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-2">
                    {posts.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-2 rounded text-sm ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
