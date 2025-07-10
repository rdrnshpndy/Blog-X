import React, { useState, useEffect, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchingsorting from '../components/searchingsorting';

const CATEGORY_OPTIONS = [
        "Exams",
        "Colleges",
        "Admissions",
        "Education News, Policy Updates",
        "Career Advice",
        "Scholarships and Financial Aid",
        "International Education",
        "Student Life",
];

const Adminpage = () => {
  // This is a test comment
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const categoryRef = useRef(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    }
    if (categoryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoryDropdownOpen]);

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
      console.log('Fetched posts:', data);
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
    formData.append('content', content.trim());
    if (image) formData.append('image', image);


    const token = localStorage.getItem('token');
    const method = editingId ? 'PUT' : 'POST';

    try {
      const url = editingId
        ? `http://localhost:5001/api/posts/${editingId}`
        : 'http://localhost:5001/api/posts';

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
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

  // Multi-select handlers
  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(getFilteredSortedPosts().map((blog) => blog._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected post(s)?`)) return;
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`http://localhost:5001/api/posts/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      toast.success('Selected posts deleted!');
      setSelectedIds([]);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to delete selected posts.');
    }
  };

  // Filter and sort posts for display
  const getFilteredSortedPosts = () => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.tags && post.tags.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (sortBy === 'az') {
      filtered = [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'datei') {
      filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return filtered;
  };

  return (
    <div className="bg-gray-300 min-h-screen w-full p-5">
      <ToastContainer />

      {/* Create Blog Section */}
      <div className="bg-white w-full mx-auto mb-12 rounded-xl shadow-lg border border-gray-200 p-5 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-orange-500 tracking-tight">
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
            {/* Custom Category Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                type="button"
                className="w-full border border-blue-200 p-3 rounded bg-white text-gray-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setCategoryDropdownOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={categoryDropdownOpen}
              >
                <span>{category ? category : "No Category"}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {categoryDropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-blue-200 rounded shadow-lg max-h-60 overflow-auto">
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-orange-500 hover:text-white ${category === '' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                    onClick={() => {
                      setCategory('');
                      setCategoryDropdownOpen(false);
                    }}
                    role="option"
                    aria-selected={category === ''}
                  >
                    No Category
                  </li>
                  {CATEGORY_OPTIONS.map(opt => (
                    <li
                      key={opt}
                      className={`px-4 py-2 border border-blue-200 rounded cursor-pointer hover:bg-orange-500 hover:text-white ${category === opt ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                      onClick={() => {
                        setCategory(opt);
                        setCategoryDropdownOpen(false);
                      }}
                      role="option"
                      aria-selected={category === opt}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              aria-label="Tags (comma separated)"
            />
          </div>
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
      <div className="w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">All Blog Posts</h2>
        </div>
        <div className="flex flex-wrap md:items-center md:justify-between gap-4 mb-6">
          
          <div className="w-full md:w-auto flex md:flex-row gap-2 md:gap-4 items-stretch md:items-center justify-end" >
            <Searchingsorting
              onSearch={setSearchTerm}
              onSort={setSortBy}
            />
          </div>
          
          <div>
           <button
            className={`bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={selectedIds.length === 0}
            onClick={handleDeleteSelected}
          >
           <div style={{display: 'inline-block'}}>Delete&nbsp;Selected</div>
          </button>
          </div>
          
        </div>

        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <colgroup>
                <col style={{ width: '40px' }} />{/* Checkbox */}
                <col style={{ width: '80px' }} />{/* Image */}
                <col style={{ width: '22%' }} />{/* Title */}
                <col style={{ width: '14%' }} />{/* Author */}
                <col style={{ width: '13%' }} />{/* Category */}
                <col style={{ width: '13%' }} />{/* Tags */}
                <col style={{ width: '8%' }} />{/* Status */}
                <col style={{ width: '10%' }} />{/* Date */}
                <col style={{ width: '100px' }} />{/* Actions */}
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2 rounded-tl-lg">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      aria-label="Select all blogs"
                    />
                  </th>
                  <th className="px-2 py-2">Image</th>
                  <th className="px-2 py-2">Title</th>
                  <th className="px-2 py-2">Author</th>
                  <th className="px-2 py-2">Category</th>
                  <th className="px-2 py-2">Tags</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredSortedPosts().length > 0 ? (
                  getFilteredSortedPosts().map((blog) => (
                    <tr
                      key={blog._id}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow transition-all"
                      style={{ height: '64px', maxHeight: '64px' }} // 2 lines at 32px/line
                    >
                      <td className="px-2 py-2 align-middle">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(blog._id)}
                          onChange={() => handleSelectRow(blog._id)}
                          aria-label={`Select blog ${blog.title}`}
                        />
                      </td>
                      <td className="px-2 py-2 align-middle">
                        {blog.image ? (
                          <img
                            src={`http://localhost:5001/uploads/${blog.image}`}
                            alt={blog.title}
                            className="w-12 h-12 object-cover rounded-lg border"
                            style={{ minWidth: '48px', minHeight: '48px', maxHeight: '48px', maxWidth: '48px' }}
                            onError={(e) => (e.target.src = '/fallback-image.jpg')}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm font-semibold text-gray-900" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {blog.author || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {blog.category || 'Uncategorized'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {blog.tags}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          blog.status === 'Published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <span className="text-xs text-gray-500">
                          {blog.date ? new Date(blog.date).toLocaleDateString() : ''}
                        </span>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="flex flex-row gap-2 items-center justify-center h-full">
                          <button
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded hover:from-red-600 hover:to-red-700 text-xs"
                            onClick={() => handleDelete(blog._id)}
                            aria-label={`Delete post ${blog.title}`}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded hover:from-yellow-500 hover:to-yellow-600 text-xs"
                            onClick={() => handleEdit(blog)}
                            aria-label={`Edit post ${blog.title}`}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-gray-400 py-8 font-semibold">
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;