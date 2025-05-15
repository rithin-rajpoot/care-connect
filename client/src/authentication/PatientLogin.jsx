import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, KeyRound, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginPatientThunk } from "../store/slice/patient/patientThunk";

const PatientLogin = () => {

  const { isAuthenticated } = useSelector(state=>state.patientReducer);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [method, setMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  

  const location = useLocation();

  const handleMethodChange = (e) => {
    setMethod(e.target.checked ? 'phone' : 'email');
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      setIsSubmitting(true);
      // Mock API call for requestOtp
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsVerifyingOtp(true);
      alert('OTP sent successfully');
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtpAndLogin = async () => {
    try {
      setIsSubmitting(true);
      const otpValue = otp.join('');
      // Mock API call for verifyOtp
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Login successful!');
      navigate('/patient/dashboard');
    } catch (error) {
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    if (method === 'phone' && isVerifyingOtp) {
      await verifyOtpAndLogin();
      return;
    }
    
    if (method === 'phone' && !isVerifyingOtp) {
      await handleSendOtp();
      return;
    }
    
      setIsSubmitting(true);
        const response = await dispatch(loginPatientThunk(formData));
        if (response?.payload?.success) {
          navigate("/");
        } 
      setIsSubmitting(false);
  };


  useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Link to="/" className="flex items-center relative md:right-38 sm:right-35">
          <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-700" /> Back to Home
        </Link>
        
        <div className="rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Patient Login</h2>
            <p className="text-sm text-gray-500">Access your account to manage appointments</p>
          </div>
          
          {!isVerifyingOtp ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Login Method</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      defaultChecked
                      className="text-blue-600"
                      onChange={handleMethodChange}
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      className="text-blue-600"
                      onChange={handleMethodChange}
                    />
                    <span>Mobile (OTP)</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {method === 'email' ? 'Email Address' : 'Mobile Number'}
                </label>
                <div className="relative">
                  <input
                    type={method === 'email' ? 'email' : 'tel'}
                    name="identifier"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={method === 'email' ? 'Enter your email' : 'Enter 10-digit mobile number'}
                    value={formData.identifier}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {method === 'email' && (
                <div className="mb-4 relative">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {showPassword ? 
                    <EyeOff size={22} className="text-black absolute bottom-2 right-2" onClick={() => setShowPassword(!showPassword)}/> : 
                    <Eye size={22} className="text-black absolute bottom-2 right-2" onClick={() => setShowPassword(!showPassword)}/>
                  }
                </div>
              )}
              
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></span>
                ) : method === 'email' ? (
                  'Login'
                ) : (
                  'Send OTP'
                )}
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Verify Your Phone Number</h2>
                <p className="text-gray-600">
                  We've sent a 4-digit OTP to <strong>{formData.identifier}</strong>
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Enter OTP
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-blue-500 text-sm hover:underline"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></span>
                ) : 'Verify & Login'}
              </button>
              
              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setIsVerifyingOtp(false)}
              >
                Go Back
              </button>
            </>
          )}
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/patient/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientLogin;