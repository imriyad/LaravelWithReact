import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SearchResults() {
    const { posts, query } = usePage().props;

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl">Search Results</h1>
                <span className="text-sm text-gray-400">Showing results for: <strong>{query}</strong></span>
            </div>

            {/* Results Table */}
            <table className="min-w-full bg-gray-800 rounded">
                <thead>
                    <tr className="bg-gray-700 text-left text-sm font-semibold">
                        <th className="py-3 px-6">ID</th>
                        <th className="py-3 px-6">Title</th>
                        <th className="py-3 px-6">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.data.length > 0 ? (
                        posts.data.map((post) => (
                            <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700">
                                <td className="py-3 px-6">{post.id}</td>
                                <td className="py-3 px-6">{post.title}</td>
                                <td className="py-3 px-6">{post.score}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="py-6 text-center text-gray-400">No results found.</td>
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
