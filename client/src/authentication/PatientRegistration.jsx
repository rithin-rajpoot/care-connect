import React ,{useEffect, useState} from 'react';
import { Link ,useNavigate} from "react-router-dom";
import { Eye, EyeOff,ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { registerPatientThunk } from '../store/slice/patient/patientThunk';

const PatientRegistration = () => {
 const [inputType,setInputType] = useState(true);
 const [showPassword,setShowPassword] = useState(true)
 const [otp, setOtp] = useState(['', '', '', '']);
const dispatch = useDispatch();
  const navigate = useNavigate();

 const { isAuthenticated} = useSelector((state) => state.patientReducer);

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

  const handleSendOtp = async (e) => {
    e.preventDefault() // DO-NOT refresh
    try {
      alert('OTP sent successfully');
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
       
    }
  };

 const [formData,setFormData] = useState({
    fullName:"",
    username:"",
    email:"",
    phno:"",
    password:"",
    DOB:"",
    gender:"",
    address:"",
 })

 const handleInputChange = (e)=> {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

const handlePatientRegistration = async ()=>{
    const response = await dispatch(registerPatientThunk(formData));
    if (response?.payload?.success) {
      navigate("/");
    }
}

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <>
    <Navbar/>
    <form onSubmit={handlePatientRegistration}>

    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
      <Link to="/" className="flex items-center relative md:right-38 sm:right-35"><ArrowLeft className="w-6 h-6 cursor-pointer text-gray-700" /> Back to Home</Link>
      <div className="rounded-lg shadow-md p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Patient Registration</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Create your account to book appointments</p>


        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" placeholder="Enter your full name" name="fullName" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange}/>
        </div>

         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
          <input type="text" placeholder="eg:alice_22" name="username" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange}/>
        </div>
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No:</label>
          <input type="tel" placeholder="ph no" name="phno" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange}/>
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
          <input type="email" placeholder="Enter your email" name="email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange} />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type= {showPassword ? "text" : "password"} name = "password" placeholder="Create a password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange} />
          {showPassword ? <EyeOff size={22} className="text-black absolute bottom-2 right-2" onClick={()=>{setShowPassword(!showPassword)}}/>: <Eye size={22} className="text-black absolute bottom-2 right-2" onClick={()=>{setShowPassword(!showPassword)}}/>}
        </div>

        {/* Date of Birth & Gender */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (Optional)</label>
            <input type="date" placeholder="dd-mm-yyyy" name="d_o_b" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange}/>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender (Optional)</label>
            <select name="gender" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"onChange={handleInputChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
          <textarea rows="3" cols = "3" placeholder="Enter your address" name="address" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleInputChange} />
         
        </div>
      </>) : <>
           {/* OTP */}
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <div className="flex  flex-wrap justify-center  items-center gap-3 ">
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
                  <button className="btn btn-primary" onClick={handleSendOtp}>Get-OTP</button>
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
          </>
        }

        {/* Continue Button */}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition">Continue</button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
           Already have an account? <Link to="/patient-login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>

    </form>
     <Footer/>
     </>
  );
};

export default PatientRegistration;
