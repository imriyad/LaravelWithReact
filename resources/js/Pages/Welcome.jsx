import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { posts, auth } = usePage().props;

  return (
    <div className="bg-gray-950 text-white font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Laravel Blog</h1>

          <div>
            {auth.user ? (
              <>
                <span className="mr-4">Welcome, {auth.user.name}</span>

                {auth.user.roles && auth.user.roles.includes('admin') && (
                  <Link
                    href="/admin/dashboard"
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded mr-2"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  method="post"
                  href="/logout"
                  as="button"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Welcome to the Blog World</h2>
          <p className="text-gray-300 mb-6">
            Read, share, and explore ideas from amazing people.
          </p>
          {!auth.user && (
            <Link
              href="/login"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded text-lg font-medium transition"
            >
              Get Started
            </Link>
          )}
        </section>

        {/* Latest Posts Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Latest Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.data.length > 0 ? (
              posts.data.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col"
                >
                  <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</p>
                  {/* <div className="text-sm text-gray-500 mb-2">
                    Views: {post.views} | Clicked: {post.clicked ?? 0}
                  </div> */}
                  {/* <Link
                    href={`/posts/${post.id}/incrementClicked`}
                    className="text-indigo-400 hover:underline mt-auto"
                  >
                    Read More
                  </Link> */}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No posts available.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center space-x-2">
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
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 text-center py-4">
        © {new Date().getFullYear()} My Laravel Blog. All rights reserved.
      </footer>
    </div>
  );
}
