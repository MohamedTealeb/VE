
import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

export default function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/login`, data);
      // navigate logic here if needed
    } catch (error) {
      console.error('Error submitting login:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#050608]">
      {/* الصورة في الأعلى على الهواتف، وفي الجانب الأيسر على الشاشات الكبيرة */}
      <div className="w-full lg:w-1/2 h-screen">
        <img
          src={logo}
          alt="Background Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* حاوية الفورم */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-36">
        <div className="w-full max-w-md text-white">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-4">
              <label htmlFor="username" className="block text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                autoComplete="off"
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10 focus:outline-none focus:border-black"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute cursor-pointer right-3 top-9 text-gray-700 hover:text-black focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-white hover:bg-black hover:text-white cursor-pointer text-black font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-white underline hover:text-gray-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
