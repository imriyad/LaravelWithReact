import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ViewerDashboard() {
    const { posts, auth } = usePage().props;

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {/* Header: Hi + Logout */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl">Moderator Dashboard</h1>
                <div className="flex items-center gap-4">
 <span>Hi, {auth?.name || auth?.user?.name}</span>                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm"
                    >
                        Logout
                    </Link>
                </div>
            </div>

            {/* Posts Table */}
            <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                    <tr className="bg-gray-700 text-left text-sm font-medium text-white">
                        <th className="py-3 px-6">ID</th>
                        <th className="py-3 px-6">Title</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.data.length > 0 ? (
                        posts.data.map(post => (
                            <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700">
                                <td className="py-3 px-6">{post.id}</td>
                                <td className="py-3 px-6">{post.title}</td>
                                <td className="py-3 px-6 text-center">
                                    <Link
                                        href={`/posts/${post.id}/moderate`}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
                                    >
                                        Moderate Comments
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-6 text-gray-400">
                                No posts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex flex-wrap gap-2">
                {posts.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3 py-2 rounded text-sm ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
