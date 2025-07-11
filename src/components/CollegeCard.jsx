import React from 'react';

const typeColors = {
  IIT: 'bg-teal-100 text-teal-800 border border-teal-300',
  NIT: 'bg-blue-100 text-blue-800 border border-blue-300',
  IIIT: 'bg-purple-100 text-purple-800 border border-purple-300',
  BITS: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
};

const CollegeCard = ({ college }) => {
  // Example handlers for Admissions and Placement
  const handleAdmissionsClick = (e) => {
    e.stopPropagation();
    window.open(college.admissionsUrl || '#', '_blank', 'noopener,noreferrer');
  };

  const handlePlacementClick = (e) => {
    e.stopPropagation();
    window.open(college.placementUrl || '#', '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={college.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="bg-white rounded-xl shadow-md p-0 flex flex-col gap-3 hover:scale-[1.03] hover:shadow-lg transition-transform duration-200 animate-fade-in overflow-hidden h-full border border-gray-100">
        {/* College Image */}
        <img
          src={college.photo}
          alt={college.name + ' photo'}
          className="w-full h-40 object-cover object-center rounded-t-xl"
        />
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[college.type] || 'bg-gray-200 text-gray-700 border border-gray-300'}`}>{college.type}</span>
            <span className="ml-auto text-sm text-gray-500">{college.state}, {college.city}</span>
          </div>
          <h2 className="text-xl font-bold mb-1 text-gray-900">{college.name}</h2>
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-teal-700 font-semibold text-xs border border-teal-200 shadow-sm">NIRF Rank: {college.nirfRank}</span>
          </div>
          <div className="flex-grow"></div>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-4 py-2 rounded transition text-xs font-semibold text-center w-full shadow-sm"
              onClick={handleAdmissionsClick}
            >
              Admissions
            </button>
            <button
              type="button"
              className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-4 py-2 rounded transition text-xs font-semibold text-center w-full shadow-sm"
              onClick={handlePlacementClick}
            >
              Placement
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CollegeCard;
