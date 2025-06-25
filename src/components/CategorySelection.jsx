import React from 'react';

const CategorSelection = ({ onSelectCategory, activeCategory }) => {
    const categories = ["Startups", "Security", "AI", "Apps", "Tech"];

    return (
        <div className="px-4 mb-8 lg:space-x-16 flex flex-wrap items-center border-b-2 py-5 text-gray-900 font-semibold">
            <button onClick={() => onSelectCategory(null)} className={`lg:ml-12 ${activeCategory ? "" : "active-button"}`}>All</button>
            {categories.map((category) => (
                <button
                    onClick={() => onSelectCategory(category)}
                    className={`mr-4 ${activeCategory === category ? "active-button" : ""}`} // Adjusted to mr-4 for better spacing
                    key={category}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorSelection;