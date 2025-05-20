import React, { useState } from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../Apis/Auth/Register/Register_Api';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    const numbersOnly = value.replace(/\D/g, '');
    
    // Limit to 11 digits
    if (numbersOnly.length <= 11) {
      setPhoneNumber(numbersOnly);
    }

    // Validate Egyptian number format
    if (numbersOnly.length > 0) {
      const isValid = /^01[0125][0-9]{8}$/.test(numbersOnly);
      e.target.setCustomValidity(
        isValid ? '' : 'Please enter a valid Egyptian number (e.g., 01234567890)'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    // Validate phone number
    if (!/^01[0125][0-9]{8}$/.test(phoneNumber)) {
      toast.error("Please enter a valid Egyptian phone number");
      setLoading(false);
      return;
    }

    try {
      await dispatch(registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: phoneNumber,
        password: data.password
      })).unwrap();
      
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
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
            <h1 className="text-2xl font-semibold mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                  autoComplete="off"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-white">
                  Phone Number (Egypt)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  placeholder="01234567890"
                  maxLength={11}
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 focus:outline-none focus:border-black"
                  autoComplete="off"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Enter 11-digit Egyptian number (e.g., 01234567890)
                </p>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-white">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10 focus:outline-none focus:border-black"
                  autoComplete="off"
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
              </div>

              <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block text-white">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full border border-black text-black rounded-md bg-white py-2 px-3 pr-10 focus:outline-none focus:border-black"
                  autoComplete="off"
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
                className="bg-white hover:bg-black hover:text-white cursor-pointer text-black font-semibold rounded-md py-2 px-4 w-full"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-white underline hover:text-gray-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
