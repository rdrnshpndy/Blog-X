import React, { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminpage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      toast.error('Failed to fetch posts');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', category);
    if (image) formData.append('image', image);

    const token = localStorage.getItem('token');

    try {
      const url = editingId
        ? `http://localhost:5000/api/posts/${editingId}`
        : 'http://localhost:5000/api/posts';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        toast.success(editingId ? 'Post updated!' : 'Post created!');
        resetForm();
        fetchPosts();
      } else {
        toast.error('Failed to save post.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setPosts(posts.filter(post => post._id !== id));
        toast.success('Post deleted');
      } else {
        toast.error('Failed to delete post.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error.');
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setTitle(post.title);
    setCategory(post.author);
    setContent(post.content);
    setImage(null);
    setPreviewImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setContent('');
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
      <ToastContainer />

      <div className="bg-white p-8 rounded shadow-xl max-w-3xl mx-auto mb-10 border border-blue-100">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {editingId ? 'Edit Blog Post' : 'Create Blog Post'}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <textarea
            placeholder="Content"
            className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <div className="flex flex-col gap-2">
            <label className="cursor-pointer">
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-5 rounded transition-all duration-300 shadow hover:scale-105">
                <FiUpload size={20} />
                <span>{image ? image.name : "Choose Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded border border-blue-200"
              />
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              {editingId ? 'Update Post' : 'Create Post'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 px-6 rounded hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
          All Blog Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <div
              key={post._id}
              className="bg-white border border-blue-100 rounded-lg shadow hover:shadow-xl transition duration-300 p-5 flex flex-col"
            >
              <h3 className="font-bold text-lg mb-2 text-blue-700">{post.title}</h3>
              <p className="text-gray-600 mb-1">Category: {post.author}</p>
              {post.content && (
                <p className="text-sm text-gray-500 mb-3">{post.content.slice(0, 80)}...</p>
              )}

              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded mb-3 border border-blue-100"
                />
              )}

              <div className="mt-auto flex gap-2">
                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
