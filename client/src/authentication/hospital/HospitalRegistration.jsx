import React, { useState ,useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Mail, Phone, MapPin, User, KeyRound, CheckCircle, Loader, Eye, EyeOff , Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import Footer from '../../components/Footer.jsx';
import Navbar from '../../components/Navbar.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {registerHospitalThunk} from '../../store/slice/hospital/hospitalThunk.js'

const hospitalTypes = [
  'General Hospital',
  'Super Specialty',
  'Multi Specialty',
  'Clinic',
  'Diagnostic Center',
  'Nursing Home',
  'Primary Health Center',
  'Community Health Center',
  'Other',
];

const initialForm = {
  hospitalName: '',
  registrationId: '',
  hospitalType: '',
  hospitalEmail: '',
  hospitalPhno: '',
  logoUrl:'',
  hospitalAddress: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
};

const initialErrors = {
  hospitalName: '',
  registrationId: '',
  hospitalType: '',
  hospitalEmail: '',
  hospitalPhno: '',
  hospitalAddress: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
  general: '',
};

const HospitalRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const [image,setImage] = useState(null);

  const handleImageButton = ()=>{
     imageInputRef.current.click();
  }
  const validateStep1 = () => {
    const newErrors = {};
    let isValid = true;

    // Hospital Name validation
    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = "Hospital name is required";
      isValid = false;
    }

    // Registration ID validation
    if (!formData.registrationId.trim()) {
      newErrors.registrationId = "Registration ID is required";
      isValid = false;
    }

    // Hospital Type validation
    if (!formData.hospitalType) {
      newErrors.hospitalType = "Please select a hospital type";
      isValid = false;
    }

    // Email validation
    if (!formData.hospitalEmail.trim()) {
      newErrors.hospitalEmail = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.hospitalEmail)) {
      newErrors.hospitalEmail = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    if (!formData.hospitalPhno.trim()) {
      newErrors.hospitalPhno = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.hospitalPhno.replace(/\s/g, ""))) {
      newErrors.hospitalPhno = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Address validation
    if (!formData.hospitalAddress.trim()) {
      newErrors.hospitalAddress = "Hospital address is required";
      isValid = false;
    }

    setErrors({ ...initialErrors, ...newErrors });
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = {};
    let isValid = true;

    // Admin Name validation
    if (!formData.adminName.trim()) {
      newErrors.adminName = "Admin name is required";
      isValid = false;
    }

    // Admin Email validation
    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = "Admin email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = "Please enter a valid email address";
      isValid = false;
    }

    // Admin Password validation
    if (!formData.adminPassword) {
      newErrors.adminPassword = "Password is required";
      isValid = false;
    } else if (formData.adminPassword.length < 6) {
      newErrors.adminPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors({ ...initialErrors, ...newErrors });
    return isValid;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

 
  const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {return;}
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () =>{
          const base64Image = reader.result;
          setImage(base64Image);
          //  console.log(base64Image)
          setFormData(prevFormData => ({
             ...prevFormData,
             logoUrl: base64Image
          }));
        }
      };

  const handleHospitalRegistration = async (e) => {
    e.preventDefault();
    
    // Validate current step before submission
    if (step === 3) {
      try {
        setIsSubmitting(true);
        const response = await dispatch(registerHospitalThunk(formData));
        
        if (response?.payload?.success) {
          toast.success("Hospital registered successfully!");
          navigate("/admin-dashboard"); // redirect
        } else {
          setErrors({
            ...errors,
            general: response?.payload?.errMessage || "Registration failed. Please try again."
          });
          toast.error(response?.payload?.errMessage || "Registration failed");
        }
      } catch (error) {
        setErrors({
          ...errors,
          general: "An error occurred during registration. Please try again."
        });
        toast.error("Registration failed");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Step labels for accessibility and responsive display
  const stepLabels = [
    'Hospital Details',
    'Admin Setup',
    'Confirmation'
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-6 px-2">
      <div className="w-fit min-w-[40vw] max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <Link to="/" className="flex items-center text-gray-500 hover:text-blue-400 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Hospital Registration</h1>
          <p className="text-gray-600 mt-2">Register your hospital to onboard your facility</p>
        </div>

        {/* Display general errors */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Stepper */}
        <ol className="flex items-center justify-between w-full mb-10 px-2 sm:px-4">
          {[1, 2, 3].map((s, idx) => (
            <li key={s} className="flex-1 flex flex-col items-center relative">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${step === s
                    ? 'bg-blue-500 border-blue-500 text-white scale-110 shadow-lg'
                    : step > s
                    ? 'bg-blue-100 border-blue-400 text-blue-500'
                    : 'bg-gray-200 border-gray-300 text-gray-400'
                  }`}
              >
                {step > s ? <CheckCircle size={22} className="text-blue-500" /> : s}
              </div>
              <span className={`mt-2 text-xs sm:text-sm font-medium ${step === s ? 'text-blue-500' : 'text-gray-500'}`}>
                {stepLabels[idx]}
              </span>
              {s < 3 && (
                <span className={`absolute top-5 left-1/2 w-full h-0.5 -z-10
                  ${step > s ? 'bg-blue-400' : 'bg-gray-200'}
                `} style={{ right: '-50%', left: '50%' }} />
              )}
            </li>
          ))}
        </ol>

        {/* Form */}
        <form onSubmit={handleHospitalRegistration}>
          {step === 1 && (
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold  mb-1">
                  Hospital Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="hospitalName"
                    type="text"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                      ${errors.hospitalName ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                    placeholder="Enter hospital name"
                    value={formData.hospitalName}
                    onChange={handleChange}
                  />
                  <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
                {errors.hospitalName && (
                  <p className="text-sm text-red-600 mt-1">{errors.hospitalName}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="registrationId" className="block text-sm font-semibold mb-1">
                  Registration ID (Government Issued)
                </label>
                <div className="relative">
                  <input
                    id="registrationId"
                    name="registrationId"
                    type="text"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                      ${errors.registrationId ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                    placeholder="Enter registration ID"
                    value={formData.registrationId}
                    onChange={handleChange}
                  />
                  <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
                {errors.registrationId && (
                  <p className="text-sm text-red-600 mt-1">{errors.registrationId}</p>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-semibold mb-1">
                  Hospital Type
                </label>
                <select
                  id="type"
                  name="hospitalType"
                  className={`w-full h-fit py-2 px-3 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                    ${errors.hospitalType ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                  value={formData.hospitalType}
                  onChange={handleChange}
                >
                  <option value="">Select hospital type</option>
                  {hospitalTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.hospitalType && (
                  <p className="text-sm text-red-600 mt-1">{errors.hospitalType}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold  mb-1">
                    Contact Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="hospitalEmail"
                      type="email"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                        ${errors.hospitalEmail ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                      placeholder="Enter contact email"
                      value={formData.hospitalEmail}
                      onChange={handleChange}
                    />
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                  </div>
                  {errors.hospitalEmail && (
                    <p className="text-sm text-red-600 mt-1">{errors.hospitalEmail}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold  mb-1">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="hospitalPhno"
                      type="tel"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                        ${errors.hospitalPhno ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                      placeholder="Enter contact phone"
                      value={formData.hospitalPhno}
                      onChange={handleChange}
                    />
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                  </div>
                  {errors.hospitalPhno && (
                    <p className="text-sm text-red-600 mt-1">{errors.hospitalPhno}</p>
                  )}
                </div>
              </div>
              
          <div className="flex justify-center md:justify-start items-center gap-2 flex-wrap">
           
          <div className="relative">
            <img
              src={image || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
              alt="Profile"
              className="object-cover w-16 h-16 rounded-full border-4 border-gray-700"
            />
                <input ref={imageInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageUpload} // <- optional handler
                  // disabled={isUpdatingProfile} // <- disable input when updating profile
                />
          </div>
               <button className="flex gap-2 items-center bg-blue-500 p-2 text-white rounded-md cursor-pointer" onClick={handleImageButton}> Upload Logo <Camera className="text-white size-5" /></button>
        </div>
               
              <div className="mb-8">
                <label htmlFor="address" className="block text-sm font-semibold mb-1">
                  Hospital Address
                </label>
                <div className="relative">
                  <textarea
                    id="address"
                    name="hospitalAddress"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition min-h-[80px]
                      ${errors.hospitalAddress ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                    placeholder="Enter complete hospital address"
                    value={formData.hospitalAddress}
                    onChange={handleChange}
                  />
                  <MapPin size={18} className="absolute left-3 top-6 text-blue-300" />
                </div>
                {errors.hospitalAddress && (
                  <p className="text-sm text-red-600 mt-1">{errors.hospitalAddress}</p>
                )}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow transition-colors text-lg"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <label htmlFor="adminName" className="block text-sm font-semibold mb-1">
                  Admin Name
                </label>
                <div className="relative">
                  <input
                    id="adminName"
                    name="adminName"
                    type="text"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                      ${errors.adminName ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                    placeholder="Enter admin's full name"
                    value={formData.adminName}
                    onChange={handleChange}
                  />
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
                {errors.adminName && (
                  <p className="text-sm text-red-600 mt-1">{errors.adminName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="adminEmail" className="block text-sm font-semibold mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                      ${errors.adminEmail ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                    placeholder="Enter admin's email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
                {errors.adminEmail && (
                  <p className="text-sm text-red-600 mt-1">{errors.adminEmail}</p>
                )}
              </div>
              <div className="mb-8">
                <label htmlFor="adminPassword" className="block text-sm font-semibold  mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    id="adminPassword"
                    name="adminPassword"
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 transition
                      ${errors.adminPassword ? "border-red-300" : "border-gray-300 focus:border-blue-400"}`}
                    placeholder="Create admin password"
                    value={formData.adminPassword}
                    onChange={handleChange}
                  />
                  <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
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
                {errors.adminPassword && (
                  <p className="text-sm text-red-600 mt-1">{errors.adminPassword}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-white border border-blue-500 text-blue-500 font-bold py-2.5 rounded-lg shadow hover:bg-blue-50 transition-colors text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow transition-colors text-lg"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-blue-500">Complete Registration</h2>
                <p className="text-gray-600 mb-6">
                  Your hospital details have been collected. Please review and submit to complete the registration process.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-left mb-6">
                  <p className="text-sm text-blue-500 mb-2">
                    By registering, you acknowledge that:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-500 space-y-1">
                    <li>All information provided is accurate and true</li>
                    <li>Your hospital registration will be verified by our team</li>
                    <li>You agree to our terms of service and privacy policy</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-white border border-blue-500 text-blue-500 font-bold py-2.5 rounded-lg shadow hover:bg-blue-50 transition-colors text-lg"
                >
                  Back
                </button>
                {/* Main button to submit form */}
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow transition-colors text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader size={20} className="mx-auto animate-spin" />
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already registered?{' '}
            <Link to="/hospital-login" className="text-blue-500 hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HospitalRegistration;