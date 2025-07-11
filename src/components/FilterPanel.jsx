import React, { useMemo, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const TYPES = ['IIT', 'NIT', 'IIIT', 'BITS'];
const OWNERSHIP = [
  { label: 'Government', value: 'government' },
  { label: 'Private', value: 'private' },
];

const CollapsibleSection = ({ title, count, children, isOpen, onToggle, onClear }) => (
  <div className="border-b border-gray-200 pb-2 mb-2">
    <div className="flex items-center justify-between cursor-pointer select-none" onClick={onToggle}>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-800">{title}{count > 0 && <span className="ml-1 text-xs text-teal-600 font-bold">({count})</span>}</span>
        <button
          type="button"
          className="ml-2 text-xs text-teal-500 hover:underline focus:outline-none"
          onClick={e => { e.stopPropagation(); onClear(); }}
          style={{ display: count > 0 ? 'inline' : 'none' }}
        >
          Clear
        </button>
      </div>
      <ChevronRightIcon
        className={`w-5 h-5 text-teal-500 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        aria-hidden="true"
      />
    </div>
    {isOpen && <div className="mt-2">{children}</div>}
  </div>
);

const FilterPanel = ({ filters, onChange, colleges }) => {
  // Local state for staged filter changes
  const [localFilters, setLocalFilters] = useState({ ...filters, state: filters.state ? [filters.state] : [], city: filters.city ? [filters.city] : [] });
  const [openSections, setOpenSections] = useState({ type: true, ownership: false, state: false, city: false, nirf: false });

  // Unique states and cities
  const states = useMemo(() => Array.from(new Set(colleges.map(c => c.state))).sort(), [colleges]);
  const cities = useMemo(() => {
    if (!localFilters.state.length) return Array.from(new Set(colleges.map(c => c.city))).sort();
    return Array.from(new Set(colleges.filter(c => localFilters.state.includes(c.state)).map(c => c.city))).sort();
  }, [colleges, localFilters.state]);

  // Handlers for multi-select
  const handleMultiSelect = (key, value) => {
    setLocalFilters(prev => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  // NIRF
  const handleNirf = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear handlers
  const clearSection = (key) => {
    if (key === 'nirf') setLocalFilters(prev => ({ ...prev, nirfMin: '', nirfMax: '' }));
    else setLocalFilters(prev => ({ ...prev, [key]: [] }));
  };
  const clearAll = () => {
    setLocalFilters({ types: [], state: [], city: [], nirfMin: '', nirfMax: '', ownership: [] });
  };

  // Apply
  const handleApply = () => {
    // Convert state/city/ownership arrays to single value for parent for backward compatibility
    onChange({
      ...localFilters,
      state: localFilters.state[0] || '',
      city: localFilters.city[0] || '',
      ownership: localFilters.ownership,
    });
  };

  // Section toggles
  const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="w-full flex flex-col gap-2 animate-fade-in bg-white text-gray-900">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg text-teal-700">Filters</span>
        <button className="text-xs text-teal-500 hover:underline focus:outline-none" onClick={clearAll}>Clear All</button>
      </div>
      {/* Type */}
      <CollapsibleSection
        title="Type"
        count={localFilters.types.length}
        isOpen={openSections.type}
        onToggle={() => toggleSection('type')}
        onClear={() => clearSection('types')}
      >
        <div className="max-h-32 overflow-y-auto pr-2 flex flex-col gap-1">
          {TYPES.map(type => (
            <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.types.includes(type)}
                onChange={() => handleMultiSelect('types', type)}
                className="accent-teal-600"
              />
              {type}
            </label>
          ))}
        </div>
      </CollapsibleSection>
      {/* Ownership */}
      <CollapsibleSection
        title="Ownership"
        count={localFilters.ownership ? localFilters.ownership.length : 0}
        isOpen={openSections.ownership}
        onToggle={() => toggleSection('ownership')}
        onClear={() => clearSection('ownership')}
      >
        <div className="max-h-32 overflow-y-auto pr-2 flex flex-col gap-1">
          {OWNERSHIP.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.ownership && localFilters.ownership.includes(opt.value)}
                onChange={() => handleMultiSelect('ownership', opt.value)}
                className="accent-teal-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </CollapsibleSection>
      {/* State */}
      <CollapsibleSection
        title="State"
        count={localFilters.state.length}
        isOpen={openSections.state}
        onToggle={() => toggleSection('state')}
        onClear={() => clearSection('state')}
      >
        <div className="max-h-32 overflow-y-auto pr-2 flex flex-col gap-1">
          {states.map(state => (
            <label key={state} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.state.includes(state)}
                onChange={() => handleMultiSelect('state', state)}
                className="accent-teal-600"
              />
              {state}
            </label>
          ))}
        </div>
      </CollapsibleSection>
      {/* City */}
      <CollapsibleSection
        title="City"
        count={localFilters.city.length}
        isOpen={openSections.city}
        onToggle={() => toggleSection('city')}
        onClear={() => clearSection('city')}
      >
        <div className="max-h-32 overflow-y-auto pr-2 flex flex-col gap-1">
          {cities.map(city => (
            <label key={city} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.city.includes(city)}
                onChange={() => handleMultiSelect('city', city)}
                className="accent-teal-600"
              />
              {city}
            </label>
          ))}
        </div>
      </CollapsibleSection>
      {/* NIRF Rank */}
      <CollapsibleSection
        title="NIRF Rank"
        count={localFilters.nirfMin || localFilters.nirfMax ? 1 : 0}
        isOpen={openSections.nirf}
        onToggle={() => toggleSection('nirf')}
        onClear={() => clearSection('nirf')}
      >
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            placeholder="Min Rank"
            value={localFilters.nirfMin}
            onChange={e => handleNirf('nirfMin', e.target.value)}
            className="w-20 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
          <span className="text-xs">to</span>
          <input
            type="number"
            min="1"
            placeholder="Max Rank"
            value={localFilters.nirfMax}
            onChange={e => handleNirf('nirfMax', e.target.value)}
            className="w-20 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>
      </CollapsibleSection>
      {/* Apply Button */}
      <button
        className="mt-4 w-full py-2 rounded bg-teal-600 text-white font-bold hover:bg-teal-700 transition"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterPanel; 