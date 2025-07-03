import './App.css'
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Adminpage from './pages/Adminpage';

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
