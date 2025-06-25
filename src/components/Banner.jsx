import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const Banner = () => {
  return (

    <div className="bg-black text-white py-40 px-4 text-center">
      <h1 className="text-5xl lg:text-7xl font-bold leading-snug mb-4 font-michroma">Welcome to Project <span className='text-orange-500'>X</span></h1>
      <p className="'text-gray-100 lg:w-3/5 mx-auto mb-5 font-michroma">We provide various information related to colleges, exams, cutoffs and admissions. </p>
    </div>

  )
}

export default Banner
