import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/forgot-password`,
        { email }
      );

      toast.success('OTP sent to your email!');
      // Navigate to reset password page with email as query parameter
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
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

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-36">
          <div className="w-full max-w-md text-white">
            <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
            <p className="text-gray-400 mb-6">
              Enter your email address and we'll send you an OTP to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-white hover:bg-black hover:text-white cursor-pointer text-black font-semibold rounded-md py-2 px-4 w-full mb-4"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>

              <div className="text-center">
                <Link to="/login" className="text-white underline hover:text-gray-300">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 