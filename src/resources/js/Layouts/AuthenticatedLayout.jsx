import { router } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
  function handleLogout(e) {
    e.preventDefault();
    router.post('/logout');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">My App</div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Hello, {user?.name}</span>
          <form onSubmit={handleLogout}>
            <button
              type="submit"
              className="text-red-600 font-semibold hover:text-red-800"
            >
              Logout
            </button>
          </form>
        </div>
      </nav>

      {/* Page Header */}
      <header className="bg-white shadow px-6 py-4">
        {header}
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
