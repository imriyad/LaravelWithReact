import { useForm } from '@inertiajs/react';

export default function CreatePost() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('store'));
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded text-black"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          {errors.title && <p className="text-red-400">{errors.title}</p>}
        </div>

        

        <div>
          <label className="block mb-1">Content</label>
          <textarea
            className="w-full p-2 rounded text-black"
            rows="6"
            value={data.content}
            onChange={(e) => setData('content', e.target.value)}
          />
          {errors.content && <p className="text-red-400">{errors.content}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-500 px-6 py-2 rounded text-white"
          disabled={processing}
        >
          Create
        </button>
      </form>
    </div>
  );
}
