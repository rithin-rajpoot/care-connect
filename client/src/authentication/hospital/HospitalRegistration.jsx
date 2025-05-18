import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Mail, Phone, MapPin, User, KeyRound, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import Footer from '../../components/Footer.jsx';
import Navbar from '../../components/Navbar.jsx';
import {useSelector,useDispatch} from 'react-redux';
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
  hospitalAddress: '',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
};

const HospitalRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHospitalRegistration = async (e)=>{
     e.preventDefault();
     const response = await dispatch(registerHospitalThunk(formData))
     if (response?.payload?.success) {
          navigate("/"); // to-do: redirect to hospital dashboard
        }

  }
  

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
      <div className="w-fit min-w-[40vw]  max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <Link to="/" className="flex items-center text-gray-500 hover:text-blue-400 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Hospital Registration</h1>
          <p className="text-gray-600 mt-2">Register your hospital to onboard your facility</p>
        </div>

        {/* Stepper */}
        <ol className="flex items-center justify-between w-full mb-10 px-2 sm:px-4">
          {[1, 2, 3].map((s, idx) => (
            <li key={s} className="flex-1 flex flex-col items-center relative">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${step === s
                    ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg'
                    : step > s
                    ? 'bg-blue-100 border-blue-400 text-blue-600'
                    : 'bg-gray-200 border-gray-300 text-gray-400'
                  }`}
              >
                {step > s ? <CheckCircle size={22} className="text-blue-500" /> : s}
              </div>
              <span className={`mt-2 text-xs sm:text-sm font-medium ${step === s ? 'text-blue-700' : 'text-gray-500'}`}>
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
                <label htmlFor="name" className="block text-sm font-semibold text-blue-700 mb-1">Hospital Name</label>
                <div className="relative">
                  <input
                    id="name"
                    name="hospitalName"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    placeholder="Enter hospital name"
                    value={formData.hospitalName}
                    onChange={handleChange}
                  />
                  <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="registrationId" className="block text-sm font-semibold text-blue-700 mb-1">
                  Registration ID (Government Issued)
                </label>
                <div className="relative">
                  <input
                    id="registrationId"
                    name="registrationId"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    placeholder="Enter registration ID"
                    value={formData.registrationId}
                    onChange={handleChange}
                  />
                  <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
              </div>
  
              {/*to-do: drop-down issue solve */}
              <div className="mb-4 ">
                <label htmlFor="type" className="block text-sm font-semibold text-blue-700 mb-1">Hospital Type</label>
                <select
                  id="type"
                  name="hospitalType"
                  className="w-full h-fit   py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  value={formData.hospitalType}
                  onChange={handleChange}
                >
                  <option value="">Select hospital type</option>
                  {hospitalTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-blue-700 mb-1">Contact Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      name="hospitalEmail"
                      type="email"
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                      placeholder="Enter contact email"
                      value={formData.hospitalEmail}
                      onChange={handleChange}
                    />
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-blue-700 mb-1">Contact Phone</label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="hospitalPhno"
                      type="tel"
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                      placeholder="Enter contact phone"
                      value={formData.hospitalPhno}
                      onChange={handleChange}
                    />
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="address" className="block text-sm font-semibold text-blue-700 mb-1">Hospital Address</label>
                <div className="relative">
                  <textarea
                    id="address"
                    name="hospitalAddress"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition min-h-[80px]"
                    placeholder="Enter complete hospital address"
                    value={formData.hospitalAddress}
                    onChange={handleChange}
                  />
                  <MapPin size={18} className="absolute left-3 top-6 text-blue-300" />
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow transition-colors text-lg"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <label htmlFor="adminName" className="block text-sm font-semibold text-blue-700 mb-1">Admin Name</label>
                <div className="relative">
                  <input
                    id="adminName"
                    name="adminName"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    placeholder="Enter admin's full name"
                    value={formData.adminName}
                    onChange={handleChange}
                  />
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="adminEmail" className="block text-sm font-semibold text-blue-700 mb-1">Admin Email</label>
                <div className="relative">
                  <input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    placeholder="Enter admin's email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="adminPassword" className="block text-sm font-semibold text-blue-700 mb-1">Admin Password</label>
                <div className="relative">
                  <input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    placeholder="Create admin password"
                    value={formData.adminPassword}
                    onChange={handleChange}
                  />
                  <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-white border border-blue-600 text-blue-700 font-bold py-2.5 rounded-lg shadow hover:bg-blue-50 transition-colors text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow transition-colors text-lg"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-blue-700">Complete Registration</h2>
                <p className="text-gray-600 mb-6">
                  Your hospital details have been collected. Please review and submit to complete the registration process.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-left mb-6">
                  <p className="text-sm text-blue-700 mb-2">
                    By registering, you acknowledge that:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
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
                  className="flex-1 bg-white border border-blue-600 text-blue-700 font-bold py-2.5 rounded-lg shadow hover:bg-blue-50 transition-colors text-lg"
                >
                  Back
                </button>
                {/* Main button to submit form */}
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow transition-colors text-lg"
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
            <Link to="/hospital-login" className="text-blue-600 hover:underline font-semibold">
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
