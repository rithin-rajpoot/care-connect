import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { loginHospitalThunk } from '../../store/slice/hospital/hospitalThunk';
import Footer from '../../components/Footer.jsx';
import {Loader} from 'lucide-react'
import Header from '../../components/Header.jsx';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.adminEmail) {
      newErrors.adminEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Please enter a valid email address';
    }
    if (!formData.adminPassword) {
      newErrors.adminPassword = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Optionally clear error as user types
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const response = await dispatch(loginHospitalThunk(formData));
    if (response?.payload?.success) {
      navigate('/admin-dashboard'); 
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
          <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Hospital Admin Login</h1>
            <p className="text-sm text-gray-500 mt-1">Access your hospital dashboard</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5" noValidate>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  type="email"
                  name="adminEmail"
                  className={`w-full pl-10 pr-4 py-2 border ${errors.adminEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter admin email"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.adminEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.adminEmail}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="adminPassword"
                  type="password"
                  className={`w-full pl-10 pr-4 py-2 border ${errors.adminPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your password"
                  value={formData.adminPassword}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                <KeyRound size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.adminPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.adminPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<Loader className="w-5 h-5 animate-spin text-blue-500" />) : 'Login'}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Don't have a hospital account?{' '}
              <Link to="/hospital-register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HospitalLogin;
