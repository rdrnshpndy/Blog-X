import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const Sidebar = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/blogs')
            .then((res) => res.json())
            .then((data) => {
                setRecentBlogs(data.slice(0, 25));
                setPopularBlogs(data.slice(0, 25));
            });
    }, []);

    return (
        <div className="w-max max-w-full md:max-w-xs" >
            <div>
                <h3 className="text-2xl font-semibold border-b-2 pb-2">Latest Blogs</h3>
                {popularBlogs.slice(0, 7).map((blog) => (
                    <div key={blog.id} className="mt-5 text-sm md:pl-2 border-gray-500 border-b-1 pb-2">
                        <Link
                            to={`/blog/${blog.id}`}
                            className="hover:text-orange-500 cursor-pointer line-clamp-2">
                            <h4>{blog.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>

            <div className='mt-10 pb-4'>
                <h3 className="text-2xl font-semibold border-b-2 py-2">Popular Blogs</h3>
                {recentBlogs.slice(7, 14).map((blog) => (
                    <div key={blog.id} className="mt-5 text-sm pl-2 border-gray-500 border-b-1 pb-2">
                        <Link
                            to={`/blog/${blog.id}`}
                            className="hover:text-orange-500 cursor-pointer line-clamp-2"
                        >
                            <h4>{blog.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;