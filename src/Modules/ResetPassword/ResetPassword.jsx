import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from URL query parameters
  const email = new URLSearchParams(location.search).get('email');

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    // and contain at least one uppercase letter, one lowercase letter,
    // and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate OTP
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      toast.error(
        'Password must be at least 8 characters long and contain uppercase, lowercase, and number'
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/reset-password`,
        {
          email,
          otp,
          newPassword: password
        }
      );

      // Check if response exists and has data
      if (response && response.data) {
        // Clear form
        setOtp('');
        setPassword('');
        setConfirmPassword('');
        // Show success message and navigate
        toast.success('Password reset successful! Redirecting to login...');
        // Force navigation to login
        window.location.href = '/login';
      } else {
        toast.error('Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to reset password. Please check your OTP and try again.'
      );
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
            <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
            <p className="text-gray-400 mb-6">
              Enter the OTP sent to your email and your new password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-white mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                  placeholder="Enter 6-digit OTP"
                />
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-white mb-2">
                  New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10 focus:outline-none focus:border-black"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-9 text-gray-700 hover:text-black focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
                <p className="text-sm text-gray-400 mt-1">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              <div className="mb-6 relative">
                <label htmlFor="confirmPassword" className="block text-white mb-2">
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10 focus:outline-none focus:border-black"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-9 text-gray-700 hover:text-black focus:outline-none"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-white hover:bg-black hover:text-white cursor-pointer text-black font-semibold rounded-md py-2 px-4 w-full mb-4"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
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