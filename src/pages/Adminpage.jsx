import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBlog, FaUniversity, FaUserShield } from 'react-icons/fa';

const Adminpage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to access this page.');
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-orange-100 to-white py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-orange-200">
        <div className="flex flex-col items-center mb-8">
          <FaUserShield className="text-5xl text-orange-500 mb-2" />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 text-center text-lg">Welcome, Admin! Manage your platform below.</p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <Link
            to="/admin/cmsblog"
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow transition-all duration-200 text-lg justify-center"
          >
            <FaBlog className="text-2xl" />
            Manage Blogs
          </Link>
          <Link
            to="/admin/cmscolleges"
            className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl shadow transition-all duration-200 text-lg justify-center"
          >
            <FaUniversity className="text-2xl" />
            Manage Colleges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
