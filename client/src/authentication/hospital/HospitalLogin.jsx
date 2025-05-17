import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { loginHospitalThunk } from '../../store/slice/hospital/hospitalThunk';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await dispatch(loginHospitalThunk(formData));
    if (response?.payload?.success) {
      navigate('/'); // to-do : navigate to hospital/admin dashboard
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
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

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  type="email"
                  name="adminEmail"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin email"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                />
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="adminPassword"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={formData.adminPassword}
                  onChange={handleInputChange}
                />
                <KeyRound size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="loader-sm mx-auto" /> : 'Login'}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Don't have a hospital account?{' '}
              <Link to="/hospital-register" className="text-blue-600 hover:underline">
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
