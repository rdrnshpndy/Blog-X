import React, { useState, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';
import CollegeCard from '../components/CollegeCard';
import mockColleges from '../data/mockColleges';

const Colleges = () => {
   const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    types: [],
    state: '',
    city: '',
    nirfMin: '',
    nirfMax: '',
    ownership: '', // 'government' or 'private'
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredColleges = useMemo(() => {
    return mockColleges.filter((college) => {
      const matchesSearch = college.name.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        filters.types.length === 0 || filters.types.includes(college.type);
      const matchesState =
        !filters.state || college.state === filters.state;
      const matchesCity =
        !filters.city || college.city === filters.city;
      const matchesNirf =
        (!filters.nirfMin || college.nirfRank >= parseInt(filters.nirfMin)) &&
        (!filters.nirfMax || college.nirfRank <= parseInt(filters.nirfMax));
      // Ownership filter
      let matchesOwnership = true;
      if (filters.ownership === 'government') {
        matchesOwnership = ['IIT', 'NIT', 'IIIT'].includes(college.type);
      } else if (filters.ownership === 'private') {
        matchesOwnership = college.type === 'BITS';
      }
      return (
        matchesSearch && matchesType && matchesState && matchesCity && matchesNirf && matchesOwnership
      );
    });
  }, [search, filters]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col md:flex-row">
      {/* Sidebar: Search Bar + Filters (hidden on mobile) */}
      <div className="hidden md:flex flex-col w-64 bg-gray-50 p-6 shadow-lg min-h-screen border-r border-gray-200">
        <h1 className="text-2xl font-bold mb-8 text-center text-teal-700">College Finder</h1>
        <input
          type="text"
          placeholder="Search colleges by name..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition mb-6 text-gray-900"
        />
        <FilterPanel filters={filters} onChange={handleFilterChange} colleges={mockColleges} />
      </div>
      {/* Main Content */}
      <div className="flex-1 max-w-5xl mx-auto py-10 px-4">
        {/* Show title and search/filters on mobile */}
        <h1 className="text-3xl font-bold mb-8 text-center md:hidden text-teal-700">College Finder</h1>
        <div className="flex flex-col gap-4 mb-6 md:hidden">
          <input
            type="text"
            placeholder="Search colleges by name..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-gray-900"
          />
          <FilterPanel filters={filters} onChange={handleFilterChange} colleges={mockColleges} />
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredColleges.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 animate-fade-in">
              No colleges found
            </div>
          ) : (
            filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Colleges