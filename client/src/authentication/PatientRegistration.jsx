import React ,{useState} from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
const PatientRegistration = () => {
 const [inputType,setInputType] = useState(true);
 const [showPassword,setShowPassword] = useState(true)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="  rounded-lg shadow-md p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Patient Registration</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Create your account to book appointments</p>


        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" placeholder="Enter your full name" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Registration Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Method</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="registrationMethod" defaultChecked className="text-blue-600" onChange={()=>{setInputType(!inputType)}}/>
              <span>Email</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="registrationMethod" className="text-blue-600" onChange={()=>{setInputType(!inputType)}}/>
              <span>Mobile (OTP)</span>
            </label>
          </div>
        </div>

        {inputType ? (
            <>
            {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type= {showPassword ? "text" : "password"} placeholder="Create a password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          {showPassword ? <EyeOff size={22} className="text-black absolute bottom-2 right-2" onClick={()=>{setShowPassword(!showPassword)}}/>: <Eye size={22} className="text-black absolute bottom-2 right-2" onClick={()=>{setShowPassword(!showPassword)}}/>}
        </div>

        {/* Date of Birth & Gender */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (Optional)</label>
            <input type="date" placeholder="dd-mm-yyyy" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender (Optional)</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </>) : <>
          {/* Mobile Number */}
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

           {/* OTP */}
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div></>
        }

        {/* Continue Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition">Continue</button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
           Already have an account? <Link to="/patient-login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default PatientRegistration;
