import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Phone, Mail, User, Calendar, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { registerPatientThunk } from '../../store/slice/patient/patientThunk';

const PatientRegistration = () => {
  const [registrationMethod, setRegistrationMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.patientReducer);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    DOB: "",
    gender: "",
    address: "",
  });

  const handleMethodChange = (method) => {
    setRegistrationMethod(method);
    setErrors({});
    setIsVerifyingOtp(false);
    setOtp(['', '', '', '']);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;
    
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

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    // Method-specific validations
    if (registrationMethod === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    // Optional field validations
    if (formData.DOB && new Date(formData.DOB) > new Date()) {
      newErrors.DOB = "Date of birth cannot be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setErrors({ otp: "Please enter complete 4-digit OTP" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    // Validate required fields before sending OTP
    const requiredFields = ['fullName', 'username', 'phone'];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      // Mock API call for requestOtp
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsVerifyingOtp(true);
      alert('OTP sent successfully');
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    if (!validateOtp()) return;

    try {
      setIsSubmitting(true);
      const otpValue = otp.join("");
      // Mock API call for verifyOtp and register
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // After OTP verification, proceed with registration
      const registrationData = {
        ...formData,
        verified: true,
        otp: otpValue
      };
      
      const response = await dispatch(registerPatientThunk(registrationData));
      if (response?.payload?.success) {
        navigate("/");
      } else {
        setErrors({ 
          general: response?.payload?.message || "Registration failed. Please try again." 
        });
      }
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      setErrors({ otp: "Invalid OTP. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailRegistration = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await dispatch(registerPatientThunk(formData));
      if (response?.payload?.success) {
        navigate("/");
      } else {
        setErrors({ 
          general: response?.payload?.message || "Registration failed. Please try again." 
        });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePatientRegistration = async (e) => {
    e.preventDefault();
    
    if (registrationMethod === "phone" && isVerifyingOtp) {
      await verifyOtpAndRegister();
      return;
    }

    if (registrationMethod === "phone" && !isVerifyingOtp) {
      await handleSendOtp(e);
      return;
    }

    if (registrationMethod === "email") {
      await handleEmailRegistration();
      return;
    }
  };

  const handleGoBack = () => {
    setIsVerifyingOtp(false);
    setOtp(['', '', '', '']);
    setErrors({});
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center mb-6 text-gray-700 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Patient Registration</h2>
              <p className="text-sm text-gray-500 mt-2">Create your account to book appointments</p>
            </div>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handlePatientRegistration}>
              {!isVerifyingOtp ? (
                <>
                  {/* Full Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        name="fullName"
                        value={formData.fullName}
                        className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          errors.fullName ? "border-red-300" : "border-gray-300"
                        }`}
                        onChange={handleInputChange}
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    {errors.fullName && (
                      <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Username */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., alice_22"
                        name="username"
                        value={formData.username}
                        className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          errors.username ? "border-red-300" : "border-gray-300"
                        }`}
                        onChange={handleInputChange}
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-600 mt-1">{errors.username}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        name="phone"
                        value={formData.phone}
                        className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          errors.phone ? "border-red-300" : "border-gray-300"
                        }`}
                        onChange={handleInputChange}
                      />
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Registration Method */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Registration Method
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="registrationMethod"
                          value="email"
                          checked={registrationMethod === "email"}
                          onChange={(e) => handleMethodChange(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="registrationMethod"
                          value="phone"
                          checked={registrationMethod === "phone"}
                          onChange={(e) => handleMethodChange(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Phone className="w-4 h-4" />
                        <span>Mobile (OTP)</span>
                      </label>
                    </div>
                  </div>

                  {registrationMethod === "email" ? (
                    <>
                      {/* Email */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                              errors.email ? "border-red-300" : "border-gray-300"
                            }`}
                            onChange={handleInputChange}
                          />
                          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            className={`w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                              errors.password ? "border-red-300" : "border-gray-300"
                            }`}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="mb-6 text-center p-4 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-700">
                        You'll receive an OTP on your mobile number for verification
                      </p>
                    </div>
                  )}

                  {/* Date of Birth & Gender */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="DOB"
                          value={formData.DOB}
                          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            errors.DOB ? "border-red-300" : "border-gray-300"
                          }`}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.DOB && (
                        <p className="text-sm text-red-600 mt-1">{errors.DOB}</p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <textarea
                        rows="3"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        onChange={handleInputChange}
                      />
                      <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                      <Phone className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                      Verify Your Phone Number
                    </h2>
                    <p className="text-gray-600">
                      We've sent a 4-digit OTP to{" "}
                      <strong>{formData.phone}</strong>
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                      Enter OTP
                    </label>
                    <div className="flex justify-center gap-3 mb-2">
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
                          className={`w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            errors.otp ? "border-red-300" : "border-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-sm text-red-600 text-center">{errors.otp}</p>
                    )}

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        className="text-blue-500 text-sm hover:underline disabled:opacity-50"
                        onClick={handleSendOtp}
                        disabled={isSubmitting}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      "Verify & Register"
                    )}
                  </button>

                  <button
                    type="button"
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    onClick={handleGoBack}
                    disabled={isSubmitting}
                  >
                    Go Back
                  </button>
                </>
              )}

              {!isVerifyingOtp && (
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      {registrationMethod === "phone" ? "Sending OTP..." : "Creating Account..."}
                    </div>
                  ) : registrationMethod === "phone" ? (
                    "Send OTP"
                  ) : (
                    "Create Account"
                  )}
                </button>
              )}
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/patient-login" className="text-blue-500 hover:underline font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientRegistration;