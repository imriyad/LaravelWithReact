import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ViewerDashboard() {
    const { posts, auth } = usePage().props;

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl mb-6">Viewer Dashboard</h1>
            <p className="mb-6">Hi, {auth.name}</p>

            <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                    <tr className="bg-gray-700 text-left text-sm font-medium text-white">
                        <th className="py-3 px-6">ID</th>
                        <th className="py-3 px-6">Title</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.data.length > 0 ? (
                        posts.data.map(post => (
                            <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700">
                                <td className="py-3 px-6">{post.id}</td>
                                <td className="py-3 px-6">{post.title}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center py-6 text-gray-400">
                                No posts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-6">
                {/* Simple Pagination Links */}
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
