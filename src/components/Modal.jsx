import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailPlaceholder, setEmailPlaceholder] = useState("enter @gmail.com");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Enter your password");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);

        toast.success('🚀 Login successful! Redirecting...', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        setTimeout(() => {
          onClose();
          navigate("/admin");
        }, 2200);
      } else {
        toast.error(`😕 ${data.message || "Login failed"}`, {
          position: "top-right",
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Server error', {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <ToastContainer />
      <div className="modal-container">
        <div className="bg-gray-900 text-center p-5 h-90 lg:w-[500px] rounded shadow-md border-white border-2 outline-0">
          {/* modal content */}
          <h2 className="text-xl font-semibold mb-4 mt-6 uppercase">Please Login Here!</h2>
          <form className="px-4" onSubmit={handleSubmit}>
            {/* email */}
            <div className="mb-5 relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#687280]">
                <FaUser />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={emailPlaceholder}
                className="w-full pl-12 rounded-md border border-[#e6e6e6] bg-white py-3 px-6 text-base 
                font-medium text-[#687280] outline-none focus:border-[#64a4f1] focus:shadow-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailPlaceholder("")}
                onBlur={() => setEmailPlaceholder("Enter your Email")}
                required
              />
            </div>
            <div className='mb-5 relative'>
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#687280]">
                <FaKey />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder={passwordPlaceholder}
                className="w-full pl-12 rounded-md border border-[#e6e6e6] bg-white py-3 px-6 text-base 
                font-medium text-[#687280] outline-none focus:border-[#64a4f1] focus:shadow-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordPlaceholder("")}
                onBlur={() => setPasswordPlaceholder("Enter your password")}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="hover:shadow-md rounded-md bg-[#64a4f1] hover:bg-orange-600 py-2 px-8 text-base font-semibold text-white outline-none disabled:bg-blue-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className='bg-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-8 rounded inline-flex items-center mt-5'
            disabled={loading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;