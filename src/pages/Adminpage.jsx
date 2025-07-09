import React, { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminpage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Published');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to access this page.');
      window.location.href = '/login';
    }
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Clean up previewImage URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      toast.error('Failed to fetch posts. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!title.trim() || !author.trim() || !category.trim() || !content.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('author', author.trim());
    formData.append('category', category.trim());
    formData.append('tags', tags.trim());
    formData.append('status', status);
    formData.append('content', content.trim());
    if (image) formData.append('image', image);

    const token = localStorage.getItem('token');

    try {
      const url = editingId
        ? `http://localhost:5001/api/posts/${editingId}`
        : 'http://localhost:5001/api/posts';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (response.ok) {
        toast.success(editingId ? 'Post updated successfully!' : 'Post created successfully!');
        resetForm();
        fetchPosts();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to save post.');
      }
    } catch (err) {
      console.error('Error saving post:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5001/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        toast.success('Post deleted successfully!');
      } else {
        toast.error('Failed to delete post.');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setTitle(post.title || '');
    setAuthor(post.author || '');
    setCategory(post.category || '');
    setTags(post.tags || '');
    setStatus(post.status || 'Published');
    setContent(post.content || '');
    setImage(null);
    setPreviewImage(post.image ? `http://localhost:5001/uploads/${post.image}` : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setAuthor('');
    setCategory('');
    setTags('');
    setStatus('Published');
    setContent('');
    setImage(null);
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-orange-100 min-h-screen p-6">
      <ToastContainer />

      {/* Create Blog Section */}
      <div
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto mb-12 border border-blue-100"
        style={{ position: 'relative', top: 0, left: 0, width: '100%', maxWidth: 700, zIndex: 2 }}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
          {editingId ? 'Edit Blog Post' : 'Create Blog Post'}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Title"
              className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Blog title"
            />
            <input
              type="text"
              placeholder="Author Name"
              className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              aria-label="Author name"
            />
            <select
              className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              aria-label="Category"
            >
              <option value="" disabled>Select category</option>
              <option value="AI">AI</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
              <option value="Sports">Sports</option>
            </select>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              aria-label="Tags (comma separated)"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <select
              className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-1/3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Post status"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <div className="flex-1">
              <label className="cursor-pointer block">
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-orange-400 hover:from-orange-500 hover:to-blue-600 text-white py-3 px-5 rounded transition-all duration-300 shadow hover:scale-105">
                  <FiUpload size={20} />
                  <span>{image ? image.name : 'Choose Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    aria-label="Upload image"
                  />
                </div>
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Image preview"
                  className="w-full h-40 object-cover rounded border border-blue-200 mt-2"
                />
              )}
            </div>
          </div>
          <textarea
            placeholder="Content"
            className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="7"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            aria-label="Blog content"
          ></textarea>
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-8 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all duration-300"
              aria-label={editingId ? 'Update post' : 'Create post'}
            >
              {editingId ? 'Update Post' : 'Create Post'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 px-8 rounded-lg font-semibold shadow hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                aria-label="Cancel edit"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* All Blog Posts Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent">
          All Blog Posts
        </h2>
        <div className="w-full">
          <div className="grid w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-8 min-h-[300px]">
            {posts.length > 0 ? (
              posts.map((blog) => (
                <div
                  key={blog._id}
                  className="p-5 shadow-lg rounded bg-white flex flex-col cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  {blog.image ? (
                    <img
                      src={`http://localhost:5001/uploads/${blog.image}`}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded"
                      onError={(e) => (e.target.src = '/fallback-image.jpg')} // Fallback image
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <h3 className="mt-4 mb-2 font-bold hover:text-orange-500 cursor-pointer line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-700">
                    <span className="font-semibold">Author:</span> {blog.author || 'Unknown'}
                  </p>
                  <p className="mb-2 text-sm text-gray-700">
                    <span className="font-semibold">Category:</span> {blog.category || 'Uncategorized'}
                  </p>
                  {blog.tags && (
                    <p className="text-xs text-orange-500 mb-1">Tags: {blog.tags}</p>
                  )}
                  {blog.summary && (
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{blog.summary}</p>
                  )}
                  <p className="text-xs text-gray-400 mb-3 line-clamp-3">
                    {blog.content ? blog.content.slice(0, 120) + '...' : 'No content available'}
                  </p>
                  <div className="mt-auto flex gap-2">
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded hover:from-red-600 hover:to-red-700 transition-all duration-300"
                      onClick={() => handleDelete(blog._id)}
                      aria-label={`Delete post ${blog.title}`}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                      onClick={() => handleEdit(blog)}
                      aria-label={`Edit post ${blog.title}`}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center text-gray-400 text-lg font-semibold">
                No blogs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;