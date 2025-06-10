import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { loginUser } from './../../Apis/Auth/Login/Login_Api';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      console.log("Submitting login form...");
      const result = await dispatch(loginUser({ email: data.username, password: data.password })).unwrap();
      
      console.log("Login response:", result); // Debug log
      
      // Store token in localStorage
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
      }

      if (result.data?.role === "ADMIN") {
        toast.success('Logged in successfully!', { duration: 5000 });
        navigate('/home');
      } else {
        toast.error("You are not authorized to access the admin area.");
      }
    } catch (err) {
      console.error("Login error in component:", err);
      toast.error(err.message || 'Login failed');
    }
  };

  const clearErrorToast = () => {
    toast.dismiss();
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col lg:flex-row h-screen bg-[#050608]">
        <div className="w-full lg:w-1/2 h-screen">
          <img
            src={logo}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-36 bg-gradient-to-r from-[#050608] to-[#050608]">
          <div className="w-full max-w-md text-white">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 text-base"
                  autoComplete="off"
                  onChange={clearErrorToast}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-white mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10 text-base"
                  onChange={clearErrorToast}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute cursor-pointer right-3 top-9 text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer bg-white hover:bg-black hover:text-white text-black font-semibold rounded-md py-2 px-4 w-full"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
