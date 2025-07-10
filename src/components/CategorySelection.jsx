import React from 'react';

const CategorySelection = ({ onSelectCategory, activeCategory }) => {
    const categories = [
        "Exams",
        "Colleges",
        "Admissions",
        "Education News, Policy Updates",
        "Career Advice",
        "Scholarships and Financial Aid",
        "International Education",
        "Student Life",
    ];

    return (
        <div className="px-4 mb-8 border-b-2 py-5 text-gray-900 font-semibold">
            <div className="flex flex-wrap items-center justify-between lg:justify-start w-full gap-y-2 gap-x-4">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={` ${activeCategory ? "" : "active-button border border-gray-300 rounded px-2 py-1"}`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        onClick={() => onSelectCategory(category)}
                        className={`${activeCategory === category ? "active-button" : "border border-gray-300 rounded px-2 py-1"}`}
                        key={category}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategorySelection;