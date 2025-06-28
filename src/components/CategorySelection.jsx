import React from 'react';

const CategorSelection = ({ onSelectCategory, activeCategory }) => {
    const categories = ["Startups", "Security", "AI", "Apps", "Tech"];

    return (
        <div className="px-4 mb-8 border-b-2 py-5 text-gray-900 font-semibold">
            <div className="flex flex-wrap items-center justify-between lg:justify-start w-full gap-y-2 gap-x-4">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={` ${activeCategory ? "" : "active-button"}`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        onClick={() => onSelectCategory(category)}
                        className={`${activeCategory === category ? "active-button" : ""}`}
                        key={category}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategorSelection;