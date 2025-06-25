import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import CategorSelection from './CategorySelection';

const BlogPage = () => {

    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            let url = `http://localhost:5000/blogs?page=${currentPage}&limit=${pageSize}`;

            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }   
            
            const response = await fetch(url);
            const data = await response.json();
            setBlogs(data);
        }



        fetchBlogs();
    }, [currentPage, pageSize, selectedCategory]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setActiveCategory(category);
        setCurrentPage(1); // Reset to first page when category changes
    }
    console.log(blogs);

    return (
        <div>
            {/* category section */}
            <div>
                <CategorSelection onSelectCategory={handleCategoryChange} activeCategory={activeCategory} selectedCategory={selectedCategory} />
            </div>

            {/* blog card section */}
            <div>
                <BlogCard blogs= {blogs} currentPage={currentPage} selectedCategory={selectedCategory} pageSize={pageSize} />
            </div>

        </div>
    );
};

export default BlogPage;