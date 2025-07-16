import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchingsorting from '../components/searchingsorting';

const CMSColleges = () => {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [courses, setCourses] = useState('');
  const [photo, setPhoto] = useState('');
  const [url, setUrl] = useState('');
  const [nirfRank, setNirfRank] = useState('');
  const [type, setType] = useState('');
  const [ownership, setOwnership] = useState('');
  const [branch, setBranch] = useState('');
  const [colleges, setColleges] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [otherType, setOtherType] = useState('');
  const [address, setAddress] = useState('');
  const [nearestAirport, setNearestAirport] = useState('');
  const [nearestRailwayStation, setNearestRailwayStation] = useState('');
  const [overview, setOverview] = useState('');
    const [overviewPara1, setOverviewPara1] = useState('');
    const [overviewPara2, setOverviewPara2] = useState('');
    const [overviewPara3, setOverviewPara3] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [officialWebsite, setOfficialWebsite] = useState('');
    const [googleMapsIframe, setGoogleMapsIframe] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to access this page.');
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/colleges', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch colleges');
      }

      const data = await res.json();
      console.log('Fetched colleges:', data);
      setColleges(data);
    } catch (err) {
      console.error('Failed to fetch colleges:', err);
      toast.error('Failed to fetch colleges. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !state.trim() || !city.trim() || !url.trim() || !type.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const collegeData = {
      name: name.trim(),
      state: state.trim(),
      city: city.trim(),
      courses: courses.trim().split(',').map(course => course.trim()),
      photo: photo.trim(),
      url: url.trim(),
      nirfRank: parseInt(String(nirfRank).trim()),
      type: type === 'Other' ? otherType.trim() : type.trim(),
      ownership: ownership.trim(),
      branch: (Array.isArray(branch) ? branch.join(',') : branch).trim().split(',').map(course => course.trim()),
      address: address.trim(),
      nearestAirport: nearestAirport.trim(),
      nearestRailwayStation: nearestRailwayStation.trim(),
      overview: overview.trim(),
        overviewPara1: overviewPara1.trim(),
        overviewPara2: overviewPara2.trim(),
        overviewPara3: overviewPara3.trim(),
        contactEmail: contactEmail.trim(),
        contactNumber: contactNumber.trim(),
        officialWebsite: officialWebsite.trim(),
        googleMapsIframe: googleMapsIframe.trim()
    };

    const token = localStorage.getItem('token');
    const method = editingId ? 'PUT' : 'POST';

    try {
      const url = editingId
        ? `http://localhost:5001/api/colleges/${editingId}`
        : 'http://localhost:5001/api/colleges';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(collegeData),
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (response.ok) {
        toast.success(editingId ? 'College updated successfully!' : 'College created successfully!');
        resetForm();
        fetchColleges();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to save college.');
      }
    } catch (err) {
      console.error('Error saving college:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this college?')) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5001/api/colleges/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (res.ok) {
        setColleges(colleges.filter((college) => college._id !== id));
        toast.success('College deleted successfully!');
      } else {
        toast.error('Failed to delete college.');
      }
    } catch (err) {
      console.error('Error deleting college:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleEdit = (college) => {
    setEditingId(college._id);
    setName(college.name || '');
    setState(college.state || '');
    setCity(college.city || '');
    setCourses(college.courses ? college.courses.join(',') : '');
    setPhoto(college.photo || '');
    setUrl(college.url || '');
    setNirfRank(college.nirfRank || '');
    setType(college.type || '');
    setOwnership(college.ownership || '');
    setBranch(college.branch || '');
    setAddress(college.address || '');
    setNearestAirport(college.nearestAirport || '');
    setNearestRailwayStation(college.nearestRailwayStation || '');
    setOverview(college.overview || '');
      setOverviewPara1(college.overviewPara1 || '');
      setOverviewPara2(college.overviewPara2 || '');
      setOverviewPara3(college.overviewPara3 || '');
        setContactEmail(college.contactEmail || '');
        setContactNumber(college.contactNumber || '');
        setOfficialWebsite(college.officialWebsite || '');
        setGoogleMapsIframe(college.googleMapsIframe || '');
    setIsCreateVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOtherType(college.type === 'Other' ? college.type : '');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setState('');
    setCity('');
    setCourses('');
    setPhoto('');
    setUrl('');
    setNirfRank('');
    setType('');
    setOwnership('');
    setBranch('');
    setAddress('');
    setNearestAirport('');
    setNearestRailwayStation('');
    setOverview('');
      setOverviewPara1('');
      setOverviewPara2('');
      setOverviewPara3('');
        setContactEmail('');
        setContactNumber('');
        setOfficialWebsite('');
        setGoogleMapsIframe('');
    setOtherType('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(getFilteredSortedPosts().map((blog) => blog._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected post(s)?`)) return;
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`http://localhost:5001/api/colleges/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      toast.success('Selected posts deleted!');
      setSelectedIds([]);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to delete selected posts.');
    }
  };

  const getFilteredSortedPosts = () => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.tags && post.tags.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (sortBy === 'az') {
      filtered = [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'datei') {
      filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return filtered;
  };

  return (
    <div className="bg-gray-300 min-h-screen w-full p-5">
      <ToastContainer />

      <button
        onClick={() => setIsCreateVisible(!isCreateVisible)}
        className={`text-white font-bold py-2 px-4 rounded mb-4 ${isCreateVisible ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'}`}
      >
        {isCreateVisible ? 'Hide Section' : 'Add College'}
      </button>

      {isCreateVisible && (
        <div className="bg-white w-full mx-auto mb-12 rounded-xl shadow-lg border border-gray-200 p-5 md:p-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-orange-500 tracking-tight">
            {editingId ? 'Edit College' : 'Add College'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="College Name"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="College name"
              />
              <input
                type="text"
                placeholder="State"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={state}
                onChange={(e) => setState(e.target.value)}
                aria-label="State"
              />
              <input
                type="text"
                placeholder="City"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="City"
              />
                           
              <input
                type="text"
                placeholder="Photo URL"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                aria-label="Photo URL"
              />
              <input
                type="text"
                placeholder="College URL"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                aria-label="College URL"
              />
              <input
                type="number"
                placeholder="NIRF Rank"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={nirfRank}
                onChange={(e) => setNirfRank(e.target.value)}
                aria-label="NIRF Rank"
              />
              <select
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={type}
                onChange={(e) => setType(e.target.value)}
                aria-label="Type"
                required
              >
                <option value="">Select Type</option>
                <option value="IIT">IIT</option>
                <option value="NIT">NIT</option>
                <option value="IIIT">IIIT</option>
                <option value="BITS">BITS</option>
                <option value="Other">Other</option>
              </select>
              {type === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter College Type"
                  className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={otherType}
                  onChange={(e) => setOtherType(e.target.value)}
                  aria-label="Other College Type"
                  required
                />
              )}
              <select
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                aria-label="Ownership"
                required
              >
                <option value="">Select Ownership</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="PPP">PPP</option>
              </select>
              <input
                type="text"
                placeholder="Courses (comma-separated)"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={courses}
                onChange={(e) => setCourses(e.target.value)}
                aria-label="Courses"
              />
              <input
                type="text"
                placeholder="Branch"
                className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                aria-label="Branch"
              />
            </div>
            <hr className="my-4" />
              <div className="info-page">
                <h3 className="text-xl font-bold mb-4">Info Page</h3>
                 

              <div className="mb-4">
                <h4 className='pb-4'>Location and Campus Facilities</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                 
                  <input
                    type="text"
                    placeholder="Address"
                    className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    aria-label="Address"
                  />
                 
                                      <input
                                          type="text"
                                          placeholder="Contact Email"
                                          className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                          value={contactEmail}
                                          onChange={(e) => setContactEmail(e.target.value)}
                                          aria-label="Contact Email"
                                      />
                                      <input
                                          type="text"
                                          placeholder="Contact Number"
                                          className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                          value={contactNumber}
                                          onChange={(e) => setContactNumber(e.target.value)}
                                          aria-label="Contact Number"
                                      />
                                      <input
                                          type="text"
                                          placeholder="Official Website"
                                          className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                          value={officialWebsite}
                                          onChange={(e) => setOfficialWebsite(e.target.value)}
                                          aria-label="Official Website"
                                      />
                                      <input
                                          type="text"
                                          placeholder="Google Maps Iframe"
                                          className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                          value={googleMapsIframe}
                                          onChange={(e) => setGoogleMapsIframe(e.target.value)}
                                          aria-label="Google Maps Iframe"
                                      />
                  
                  <input
                    type="text"
                    placeholder="Nearest Airport"
                    className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={nearestAirport}
                    onChange={(e) => setNearestAirport(e.target.value)}
                    aria-label="Nearest Airport"
                  />
                 
                  <input
                    type="text"
                    placeholder="Nearest Railway Station"
                    className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={nearestRailwayStation}
                    onChange={(e) => setNearestRailwayStation(e.target.value)}
                    aria-label="Nearest Railway Station"
                  />
                   </div>
              </div>
              <div className="mb-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="overview" className="text-lg font-semibold">Overview:</label>
                  <textarea
                    id="overview"
                    placeholder="College Overview"
                    className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    aria-label="College Overview"
                    style={{ minHeight: '150px' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold">Fee Structure</h4>
                {/* Add fee structure input fields here */}
              </div>
              
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-8 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all duration-300"
                aria-label={editingId ? 'Update post' : 'Create post'}
              >
                {editingId ? 'Update Post' : 'Create Post'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 px-8 rounded-lg font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                  aria-label="Cancel edit"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">All Colleges</h2>
        </div>
        <div className="flex flex-wrap md:items-center md:justify-between gap-4 mb-6">
          <div className="w-full md:w-auto flex md:flex-row gap-2 md:gap-4 items-stretch md:items-center justify-end">
            <Searchingsorting onSearch={setSearchTerm} onSort={setSortBy} />
          </div>
          <div>
            <button
              className={`bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              <div style={{ display: 'inline-block' }}>Delete&nbsp;Selected</div>
            </button>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <colgroup>
                <col />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2 rounded-tl-lg">
                    <input type="checkbox" onChange={handleSelectAll} aria-label="Select all colleges" />
                  </th>
                  <th className="pl-2 py-2">Photo</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">State</th>
                  <th className="px-2 py-2">City</th>
                  <th className="px-2 py-2">Courses</th>
                  <th className="px-2 py-2">URL</th>
                  <th className="px-2 py-2">NIRF Rank</th>
                  <th className="px-2 py-2">Type</th>
                  <th className="px-2 py-2">Ownership</th>
                  <th className="px-2 py-2">Branch</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.length > 0 ? (
                  colleges.map((college) => (
                    <tr
                      key={college._id}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow transition-all"
                      style={{ height: '64px', maxHeight: '64px' }}
                    >
                      <td className="pl-2 py-2 align-middle">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(college._id)}
                          onChange={() => handleSelectRow(college._id)}
                          aria-label={`Select college ${college.name}`}
                        />
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <img src={college.photo} alt="College Photo" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm font-semibold text-gray-900" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.name}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.state || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.city || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.courses || 'None'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.url}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.nirfRank}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.type}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.ownership}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.branch}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="flex flex-row gap-2 items-center justify-center h-full">
                          <button
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded hover:from-red-600 hover:to-red-700 text-xs"
                            onClick={() => handleDelete(college._id)}
                            aria-label={`Delete college ${college.name}`}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded hover:from-yellow-500 hover:to-yellow-600 text-xs"
                            onClick={() => handleEdit(college)}
                            aria-label={`Edit college ${college.name}`}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-gray-400 py-8 font-semibold">
                      No colleges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSColleges;
