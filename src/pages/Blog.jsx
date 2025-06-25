import React from 'react'
import BlogPage from '../components/unoperated1'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router'
import AllBlogs from './AllBlogs'


const Blog = () => {
  return (
    <>
      <div className='relative px-4 py-33 mx-auto overflow-hidden'>
            {/* Blurred starry background */}
            <div className="absolute inset-0 w-full h-full bg-[url('/images/starry-bg.png')] bg-cover bg-center filter blur-md" />
            <div className='relative z-10 text-white text-center'>
              <h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5 font-michroma'>Welcome to our Blog</h1>
              <p className='text-gray-100 lg:w-3/5 mx-auto mb-5 font-michroma'>Stay updated with the latest news and insights related to colleges, exams and more</p>
              <a href="#ablogs">
                <button className='bg-orange-500 px-6 py-2 font-medium mt-8 rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in inline-flex items-center justify-center gap-2'>
                  View all blogs <FaArrowRight/>
                </button>
              </a>
            </div>
      </div>
      
      <BlogPage />

      <AllBlogs />
    </>
  )
}

export default Blog