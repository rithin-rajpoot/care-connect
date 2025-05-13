import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, KeyRound } from 'lucide-react';

const PatientLogin = () => {
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [method, setMethod] = useState('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!identifier) {
      newErrors.identifier = 'This field is required';
    }
    
    if (method === 'email' && !password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (!identifier || identifier.length < 10) {
      setErrors({ identifier: 'Please enter a valid phone number' });
      return;
    }
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (method === 'phone' && isVerifyingOtp) {
      await verifyOtpAndLogin();
      return;
    }
    
    if (method === 'phone' && !isVerifyingOtp) {
      await handleSendOtp();
      return;
    }
    
    try {
      setIsSubmitting(true);
      // Mock API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Login successful!');
      
      // Get the redirect path from the location state or default to dashboard
      const from = location.state?.from?.pathname || '/patient/dashboard';
      navigate(from);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="flex items-center text-gray-600 mb-6">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Patient Login</h1>
            <p className="text-gray-600 mt-2">Access your account to manage appointments</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {!isVerifyingOtp ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Login Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="email"
                        checked={method === 'email'}
                        onChange={handleMethodChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="phone"
                        checked={method === 'phone'}
                        onChange={handleMethodChange}
                        className="mr-2"
                      />
                      Mobile (OTP)
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                    {method === 'email' ? 'Email Address' : 'Mobile Number'}
                  </label>
                  <div className="relative">
                    <input
                      id="identifier"
                      type={method === 'email' ? 'email' : 'tel'}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={method === 'email' ? 'Enter your email' : 'Enter 10-digit mobile number'}
                      value={identifier}
                      onChange={handleIdentifierChange}
                    />
                    {method === 'email' ? (
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    ) : (
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                  {errors.identifier && (
                    <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
                  )}
                </div>
                
                {method === 'email' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
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
                    We've sent a 4-digit OTP to <strong>{identifier}</strong>
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
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></span>
                  ) : 'Verify & Login'}
                </button>
                
                <button
                  type="button"
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setIsVerifyingOtp(false)}
                >
                  Go Back
                </button>
              </>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/patient/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;