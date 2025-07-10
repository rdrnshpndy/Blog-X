import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { FaUser } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

// Helper to get comments from localStorage by blog id
function getStoredComments(blogId) {
  const stored = localStorage.getItem(`comments_${blogId}`);
  return stored ? JSON.parse(stored) : [];
}

const SingleBlog = () => {
  const data = useLoaderData();
  // data is now a single blog object
  const { _id: id, title, image, category, author, date, content } = data;

  // Use blog id to store/retrieve comments
  const [comments, setComments] = useState(() => getStoredComments(id));
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    setComments(getStoredComments(id));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 5);
    const newComments = [
      ...comments,
      { name: "Anonymous", text: commentInput, date: dateStr, time }
    ];
    setComments(newComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(newComments));
    setCommentInput("");
  };

  return (
    <div className='bg-gray-200 w-full'>
      <div className="py-10 bg-black text-center text-white px-4">
        <h2 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">Single Blog Page</h2>
      </div>

      {/* blog details */}
      <div className="max-w-full mx-10 py-12 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4 md:mr-3">
          <div>
            {image && (
            <div style={{ backgroundColor: 'black' }}>
              <img
                src={`http://localhost:5001/uploads/${image}`}
                alt={title}
                className="w-full h-[500px] object-contain rounded border-2"
              />
            </div>
            )}
          </div>
          <h2 className="text-3xl mt-8 font-bold mb-4 text-orange-500 cursor-pointer">{title}</h2>
          <p className="mb-3 text-gray-600"><FaUser className="inline-flex items-center mr-2" />{author} | {date ? new Date(date).toLocaleDateString() : ''}</p>
          {/* <p className="mb-3 text-gray-600"><FaClock className="inline-flex items-center mr-2" />{reading_time}</p> */}
          {/* Render formatted HTML content */}
          <div
            className="text-base mt-8 text-gray-900 mb-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* --- Comment Section Start --- */}
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments</h3>
            {/* Comment input section */}
            <div className="mb-8">
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
                <textarea
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  rows={3}
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="self-end bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Post Comment
                </button>
              </form>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-300 my-6"></div>
            {/* Comment list section */}
            <div className="max-h-48 overflow-y-auto">
              {comments.length === 0 && (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
              {[...comments].reverse().map((c, idx) => (
                <div key={idx} className="mb-4 border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-orange-500">{c.name}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {c.date} {c.time}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
          {/* --- Comment Section End --- */}
        </div>

        <div>
          <Sidebar />
        </div>

      </div>
    </div>
  );
};

export default SingleBlog;