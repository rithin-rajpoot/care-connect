import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft, User, Mail, Phone, Clock, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import {registerDoctorThunk} from '../../store/slice/hospital/doctor/doctorThunk.js'

import { useDispatch,useSelector } from "react-redux";

const specializations = [
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Neurology",
  "Pediatrics",
  "Gynecology",
  "Psychiatry",
  "Ophthalmology",
  "General Medicine",
  "Surgery",
  "Dentistry",
  "ENT",
];

const opDaysOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    opDays: [],
    opHours: { start: "09:00", end: "17:00" },
    avgConsultationTime: 30,
    consultationFee: 500,
    opValidityDays: 30,
    email: "",
    phone: "",
    password: "",
  });

  const {hospitalDetails} = useSelector(state => state.hospitalReducer);
  const dispatch = useDispatch()
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOpDaysChange = (day) => {
    const updatedDays = formData.opDays.includes(day)
      ? formData.opDays.filter((d) => d !== day)
      : [...formData.opDays, day];
    setFormData({ ...formData, opDays: updatedDays });
    // Clear error for operating days when selection changes
    if (errors.opDays) {
      setErrors((prev) => ({ ...prev, opDays: "" }));
    }
  };

  const handleOpHoursChange = (field, value) => {
    setFormData({
      ...formData,
      opHours: { ...formData.opHours, [field]: value },
    });
    // Clear error for operating hours when changed
    if (errors.opHours) {
      setErrors((prev) => ({ ...prev, opHours: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Specialization validation
    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Operating Days validation
    if (formData.opDays.length === 0) {
      newErrors.opDays = "Please select at least one operating day";
    }

    // Operating Hours validation
    if (formData.opHours.start >= formData.opHours.end) {
      newErrors.opHours = "End time must be later than start time";
    }

    // Consultation Time validation
    if (formData.avgConsultationTime < 15 || formData.avgConsultationTime > 120) {
      newErrors.avgConsultationTime = "Consultation time must be between 15-120 minutes";
    }

    // Consultation Fee validation
    if (formData.consultationFee < 100) {
      newErrors.consultationFee = "Consultation fee must be at least ₹100";
    }

    // OP Validity validation
    if (formData.opValidityDays < 1 || formData.opValidityDays > 365) {
      newErrors.opValidityDays = "OP validity must be between 1-365 days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      console.log("HospitalDetails:",hospitalDetails)
      formData.hospitalId = hospitalDetails?._id;
      const response = await dispatch(registerDoctorThunk(formData));
      if(response?.payload?.success)
      {
         navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log(error)
      setErrors({ general: "Failed to add doctor. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex items-center mb-6 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
              <p className="text-sm text-gray-500 mt-2">Register a new doctor for your hospital</p>
            </div>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.fullName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Dr. John Smith"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className={`w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-48 overflow-y-auto z-10 bg-white cursor-pointer ${
                    errors.specialization ? "border-red-300" : "border-gray-300"
                  }`}
                  style={{ appearance: 'auto' }}
                >
                  <option value="" className="cursor-pointer">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec} className="cursor-pointer">
                      {spec}
                    </option>
                  ))}
                </select>
                {errors.specialization && (
                  <p className="text-sm text-red-600 mt-1">{errors.specialization}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="doctor@email.com"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter password for doctor login"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Operating Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Days <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {opDaysOptions.map((day) => (
                    <label
                      key={day}
                      className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                        formData.opDays.includes(day)
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.opDays.includes(day)}
                        onChange={() => handleOpDaysChange(day)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">
                        {day.slice(0, 3)}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.opDays && (
                  <p className="text-sm text-red-600 mt-1">{errors.opDays}</p>
                )}
              </div>

              {/* Operating Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Operating Hours <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.opHours.start}
                      onChange={(e) => handleOpHoursChange("start", e.target.value)}
                      className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.opHours ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Start Time</label>
                  </div>
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.opHours.end}
                      onChange={(e) => handleOpHoursChange("end", e.target.value)}
                      className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.opHours ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">End Time</label>
                  </div>
                </div>
                {errors.opHours && (
                  <p className="text-sm text-red-600 mt-1">{errors.opHours}</p>
                )}
              </div>

              {/* Additional Details */}
              <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-end mb-4">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avg. Consultation Time (minutes) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="avgConsultationTime"
                      min="15"
                      max="120"
                      value={formData.avgConsultationTime}
                      onChange={handleInputChange}
                      className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.avgConsultationTime ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.avgConsultationTime && (
                    <p className="text-sm text-red-600 mt-1">{errors.avgConsultationTime}</p>
                  )}
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="consultationFee"
                      min="100"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.consultationFee ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-bold">₹</span>
                  </div>
                  {errors.consultationFee && (
                    <p className="text-sm text-red-600 mt-1">{errors.consultationFee}</p>
                  )}
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OP Validity (days) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="opValidityDays"
                      min="1"
                      max="365"
                      value={formData.opValidityDays}
                      onChange={handleInputChange}
                      className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        errors.opValidityDays ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.opValidityDays && (
                    <p className="text-sm text-red-600 mt-1">{errors.opValidityDays}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/hospital-dashboard")}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors cursor-pointer"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Adding Doctor...
                    </div>
                  ) : (
                    "Add Doctor"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorForm;