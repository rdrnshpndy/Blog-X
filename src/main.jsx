import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"
import App from './App.jsx'
import Blog from './pages/Blog.jsx'
import Home from './pages/Home.jsx'
import AllBlogs from './pages/AllBlogs.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="blog" >
            <Route index element={<Blog />} />
            <Route path="all-blogs" element={<AllBlogs />} />
          </Route>
        </Route> 
      </Routes>
    </BrowserRouter>
)
