import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Blog from './pages/Blog.jsx'
import Home from './pages/Home.jsx'
import SingleBlog from './pages/SingleBlog.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import Adminpage from './pages/Adminpage.jsx';
import Colleges from './pages/Colleges.jsx';

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
      },
      {
        path: "colleges",
        element: <Colleges />
      },
      {
        path: "admin",
        element: <PrivateRoute> 
          <Adminpage />
        </PrivateRoute>     },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
