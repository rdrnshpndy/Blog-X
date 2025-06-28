import React, { useState } from 'react';
import { FaSortAlphaDown, FaSearch, FaChevronDown, FaCheck } from 'react-icons/fa';

const sortOptions = [
  { value: 'az', label: 'A-Z' },
  { value: 'date', label: 'Date Published' },
  { value: 'author', label: 'Author' },
];

const Searchingsorting = ({ onSearch, onSort }) => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSort, setActiveSort] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  const handleSort = (value) => {
    if (activeSort === value) {
      setActiveSort('');
      onSort && onSort('');
    } else {
      setActiveSort(value);
      onSort && onSort(value);
    }
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 w-full gap-2">
      {/* Search Bar - responsive */}
      <div className="relative flex-1 max-w-md w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title..."
          className="w-full px-4 py-2 rounded border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-black transition-all duration-150 bg-white"
          style={{ minWidth: 0, borderWidth: 1 }}
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      {/* Sort Button - responsive */}
      <div className="relative sm:ml-2 w-full sm:w-auto">
        <button
          className="flex items-center gap-1 px-3 py-2 bg-orange-500 text-white rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in w-full sm:w-auto justify-center"
          onClick={() => setShowDropdown((v) => !v)}
        >
          <FaSortAlphaDown />
          <span className="ml-1">Sort</span>
          <FaChevronDown className="ml-1" />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-10">
            {sortOptions.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center justify-between px-4 py-2 hover:bg-orange-100 cursor-pointer"
                onClick={() => handleSort(opt.value)}
              >
                <span>{opt.label}</span>
                {activeSort === opt.value && (
                  <FaCheck className="text-orange-500 ml-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchingsorting;