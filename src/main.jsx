import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Blog from './pages/Blog.jsx'
import Home from './pages/Home.jsx'
import AllBlogs from './pages/AllBlogs.jsx'
import SingleBlog from './pages/SingleBlog.jsx'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "blog",
        children: [
          { index: true, element: <Blog /> },
          {
            path: ":id",
            element: <SingleBlog />,
            loader: ({ params }) => fetch(`http://localhost:5001/blogs/${params.id}`)
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
