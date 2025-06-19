import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { GiAbacus, GiBrokenSkull, GiBuffaloHead, GiHelicopter, GiSeaDragon } from "react-icons/gi"
import { FaFacebook, FaInstagram, FaXTwitter, FaAlignJustify, FaX } from "react-icons/fa6";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);}

    const navItems = [
        { path: '/', link: 'Home' },
        { path: '/news', link: 'News' },
        { path: '/colleges', link: 'Colleges' },
        { path: '/exams', link: 'Exams' },
        { path: '/admissions', link: 'Admissions' },
        { path: '/blog', link: 'Blog' }
    ];  

  return (
    <header className='bg-black text-white static top-0 left-0 right-0 font-roboto'>
        <nav className='px-4 py-4 max-w-7xl mx-auto flex items-center justify-between'>

            <a href="/" className='text-2xl font-bold text-white'>Project<span className='text-orange-500'>X</span>
            </a>

            <ul className='md:flex gap-10 hidden text-md'>
                {
                    navItems.map(({path, link}) => (
                        <li key={path}>
                            <NavLink className={({isActive, isPending}) => isActive ? 'active' : ''} to={path}>
                                {link}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>

            <div className='text-white lg:flex gap-4 hidden items-center'> 
                <a href="/" className='hover:text-orange-500'><FaFacebook/></a>
                <a href="/" className='hover:text-orange-500'><FaInstagram/></a>
                <a href="/" className='hover:text-orange-500'><FaXTwitter/></a>
                <button className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in'>Log in</button>
            </div>

            <div className='md:hidden items-center flex gap-4'>
                <button onClick={toggleMenu} className='cursor-pointer'>{isMenuOpen ? <FaX className='w-5 h-5'/> : <FaAlignJustify className='w-5 h-5'/>}</button>
            </div> 
   
        </nav>

        <div>
                <ul className={`md:hidden gap-4 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? 'fixed top-0 left-0 w-full transition-all ease-out duration-150m' : 'hidden'}`}>
                    {navItems.map(({path, link}) => <li className='text-black' key={path}>
                        <NavLink to={path}>
                            {link}
                        </NavLink>
                    </li>)}
                </ul>
            </div> 

    </header>
  )
}

export default Navbar