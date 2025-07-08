import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import CategorySelection from './CategorySelection';
import Sidebar from './Sidebar';
import Searchingsorting from './searchingsorting'; // Assuming this is a component for search and sorting functionality

const BlogPage = () => {

    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        async function fetchBlogs() {

            let url = `http://localhost:5001/blogs`;

            if (selectedCategory) {
                url += `?category=${selectedCategory}`;
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
            <div className='px-6'>
                <CategorySelection onSelectCategory={handleCategoryChange} activeCategory={activeCategory} selectedCategory={selectedCategory} />
            </div>

            {/* blog card section */}
            <div className="flex flex-col lg:flex-row gap-8 mx-6">

                <div>

                    <div>
                        <Searchingsorting
                            onSearch={setSearchTerm}
                            onSort={setSortBy}
                        />
                    </div>
                    

                    <div>
                        <BlogCard
                            blogs={blogs}
                            selectedCategory={selectedCategory}
                            searchTerm={searchTerm}
                            sortBy={sortBy}
                        />
                    </div>
                    
                </div>

                <div>
                    <Sidebar />
                </div>

            </div>

        </div>
    );
};

export default BlogPage;