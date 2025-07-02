import React from 'react';
import { useLoaderData } from 'react-router';
import { FaUser } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const SingleBlog = () => {
  const data = useLoaderData();
  const { title, image, category, author, published_date, reading_time, content } = data[0];

  console.log(data);

  return (
    <div className='bg-gray-200 w-full'>
      <div className="py-10 bg-black text-center text-white px-4">
        <h2 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">Single Blog Page</h2>
      </div>

      {/* blog details */}
      <div className="max-w-full mx-10 py-12 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4 md:mr-3">
          <div>
            <img src={image} alt="" className="md:w-3/4 w-full mx-auto px-auto rounded border-2" />
          </div>
          <h2 className="text-3xl mt-8 font-bold mb-4 text-orange-500 cursor-pointer">{title}</h2>
          <p className="mb-3 text-gray-600"><FaUser className="inline-flex items-center mr-2" />{author} | {published_date}</p>
          <p className="mb-3 text-gray-600"><FaClock className="inline-flex items-center mr-2" />{reading_time}</p>
          {/* Render formatted HTML content */}
          <div
            className="text-base mt-8 text-gray-900 mb-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <div>
          <Sidebar />
        </div>

      </div>
    </div>
  );
};

export default SingleBlog;