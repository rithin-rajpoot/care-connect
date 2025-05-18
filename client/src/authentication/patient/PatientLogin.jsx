import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Mail, Phone, KeyRound, Eye, EyeOff } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { loginPatientThunk } from "../../store/slice/patient/patientThunk";

const PatientLogin = () => {
  const { isAuthenticated } = useSelector((state) => state.patientReducer);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [method, setMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
    setErrors({});
    setIsVerifyingOtp(false);
    setOtp(["", "", "", ""]);
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
    if (e.key === "Backspace") {
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

    if (method === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = "Mobile number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit mobile number";
      }
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

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      // Mock API call for requestOtp
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsVerifyingOtp(true);
      alert("OTP sent successfully");
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtpAndLogin = async () => {
    if (!validateOtp()) return;

    try {
      setIsSubmitting(true);
      const otpValue = otp.join("");
      // Mock API call for verifyOtp
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login successful!");
      navigate("/patient/dashboard");
    } catch (error) {
      alert("Invalid OTP. Please try again.");
      setErrors({ otp: "Invalid OTP. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await dispatch(loginPatientThunk({
        email: formData.email,
        password: formData.password
      }));
      
      if (response?.payload?.success) {
        navigate("/patient-dashboard");
      } else {
        // console.log(response?.payload)
        setErrors({ 
          general: response?.payload || "Login failed. Please check your credentials." 
        });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    
    if (method === "phone" && isVerifyingOtp) {
      await verifyOtpAndLogin();
      return;
    }

    if (method === "phone" && !isVerifyingOtp) {
      await handleSendOtp();
      return;
    }

    if (method === "email") {
      await handleEmailLogin();
      return;
    }
  };

  const handleGoBack = () => {
    setIsVerifyingOtp(false);
    setOtp(["", "", "", ""]);
    setErrors({});
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/patient-dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center mb-6 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Patient Login
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Access your account to manage appointments
              </p>
            </div>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handlePatientLogin}>
              {!isVerifyingOtp ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Login Method
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="loginMethod"
                          value="email"
                          checked={method === "email"}
                          onChange={(e) => handleMethodChange(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="loginMethod"
                          value="phone"
                          checked={method === "phone"}
                          onChange={(e) => handleMethodChange(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Phone className="w-4 h-4" />
                        <span>Mobile (OTP)</span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {method === "email" ? "Email Address" : "Mobile Number"}
                    </label>
                    <div className="relative">
                      <input
                        type={method === "email" ? "email" : "tel"}
                        name={method === "email" ? "email" : "phone"}
                        value={method === "email" ? formData.email : formData.phone}
                        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          errors[method === "email" ? "email" : "phone"]
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder={
                          method === "email"
                            ? "Enter your email"
                            : "Enter 10-digit mobile number"
                        }
                        onChange={handleInputChange}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {method === "email" ? (
                          <Mail className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Phone className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {errors[method === "email" ? "email" : "phone"] && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[method === "email" ? "email" : "phone"]}
                      </p>
                    )}
                  </div>

                  {method === "email" && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
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
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            errors.password ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Enter your password"
                          value={formData.password}
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
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : method === "email" ? (
                      "Login"
                    ) : (
                      "Send OTP"
                    )}
                  </button>
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
                      "Verify & Login"
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
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/patient-register"
                className="text-blue-500 hover:underline font-medium"
              >
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

export default PatientLogin;