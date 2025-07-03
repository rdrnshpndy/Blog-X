import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
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

        setTimeout(() => navigate("/blog/admin"), 2200);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <ToastContainer />
      <div className="bg-[#121e2b] text-white rounded-md shadow-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6 uppercase">
          Please Login Here!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={emailPlaceholder}
            onFocus={() => setEmailPlaceholder("")}
            onBlur={() => setEmailPlaceholder("Enter your Email")}
            className="p-3 rounded-md border border-gray-400 bg-transparent text-white placeholder-white placeholder-opacity-70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={passwordPlaceholder}
            onFocus={() => setPasswordPlaceholder("")}
            onBlur={() => setPasswordPlaceholder("Enter your password")}
            className="p-3 rounded-md border border-gray-400 bg-transparent text-white placeholder-white placeholder-opacity-70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-md transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
