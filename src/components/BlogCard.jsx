import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';

const BlogCards = ({ blogs, selectedCategory, searchTerm, sortBy }) => {
    // Show 4 rows × 3 columns = 12 cards initially
    const CARDS_PER_ROW = 3;
    const ROWS_VISIBLE = 4;
    const INITIAL_VISIBLE = CARDS_PER_ROW * ROWS_VISIBLE;

    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE);
        setShowAll(false);
    }, [selectedCategory]);

    let filteredBlogs = blogs
        .filter(blog => !selectedCategory || blog.category === selectedCategory);

    // Filter by search term in title (case-insensitive)
    if (searchTerm) {
        filteredBlogs = filteredBlogs.filter(blog =>
            blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Sort
    if (sortBy === 'az') {
        filteredBlogs = [...filteredBlogs].sort((a, b) =>
            (a.title || '').localeCompare(b.title || '')
        );
    } else if (sortBy === 'date') {
        filteredBlogs = [...filteredBlogs].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    } else if (sortBy === 'datei') {
        filteredBlogs = [...filteredBlogs].sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );
    } else if (sortBy === 'author') {
        filteredBlogs = [...filteredBlogs].sort((a, b) =>
            (a.author || '').localeCompare(b.author || '')
        );
    }

    const visibleBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, visibleCount);

    return (
        <>
<div className="w-full">
      <div className="grid w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-8">
        {visibleBlogs.length > 0 ? (
          visibleBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id || blog.id}`}
              key={blog._id || blog.id}
              className="p-5 shadow-lg rounded cursor-pointer flex flex-col"
            >
              <div className="w-full h-64 overflow-hidden rounded">
                {blog.image && (
                  <img
                    src={`http://localhost:5001/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-100 h-full object-cover"
                  />
                )}
              </div>
              <h3 className="mt-4 mb-2 font-bold hover:text-orange-500 cursor-pointer line-clamp-2">
                {blog.title}
              </h3>
              <p className="mb-2">
                <FaUser className="inline-flex items-center mr-2" />
                {blog.author}
              </p>
              <p className="text-sm text-gray-500">
                Published: {blog.date ? new Date(blog.date).toLocaleDateString() : ''}
              </p>
            </Link>
          ))
        ) : (
          <div className="min-w-100 overflow-hiden flex justify-center items-center text-gray-400 text-lg font-semibold">
            No blogs found.
          </div>
        )}
      </div>
    </div>
            {!showAll && visibleCount < filteredBlogs.length && (
                <div className="flex justify-center mb-6">
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-white hover:text-orange-500 transiton-all duration-200 ease-in"
                        onClick={() => setShowAll(true)}
                    >
                        View More <FaArrowDown />
                    </button>
                </div>
            )}
        </>
    );
};

export default BlogCards;