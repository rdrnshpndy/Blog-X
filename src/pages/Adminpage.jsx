import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminpage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token in Adminpage:', token);
    if (!token) {
      toast.error('Please log in to access this page.');
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Link to="/admin/cmsblog" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Manage Blogs
        </Link>
        <Link to="/admin/cmscolleges" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Manage Colleges
        </Link>
      </div>
    </div>
  );
};

export default Adminpage;
