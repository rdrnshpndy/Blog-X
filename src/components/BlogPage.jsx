import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import CategorSelection from './CategorySelection';

const BlogPage = () => {

    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {

            let url = `http://localhost:5000/blogs`;

            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }   
            
            const response = await fetch(url);
            const data = await response.json();
            setBlogs(data);
        }



        fetchBlogs();
    }, [selectedCategory]);


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setActiveCategory(category);// Reset to first page when category changes
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
                <BlogCard blogs= {blogs} selectedCategory={selectedCategory} />
            </div>

            <div className="flex justify-center mt-8">
                
            </div>

        </div>
    );
};

export default BlogPage;