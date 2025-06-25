import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer.jsx";
import { 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  MapPin, 
  Star,
  Bell,
  Plus,
  Activity,
  Heart,
  FileText,
  Phone,
  Filter,
  ChevronRight,
  Stethoscope
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfileThunk, logoutPatientThunk } from "../../store/slice/patient/patientThunk.js";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("book-appointment");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const { patientDetails } = useSelector((state) => state.patientReducer);

  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      date: "2025-06-26",
      time: "10:30 AM",
      serialNumber: 3,
      status: "confirmed",
      estimatedWait: "15 mins"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      hospital: "Medical Center Plus",
      date: "2025-06-28",
      time: "2:15 PM",
      serialNumber: 7,
      status: "confirmed",
      estimatedWait: "45 mins"
    }
  ];

  const recentAppointments = [
    {
      id: 3,
      doctorName: "Dr. Emily Johnson",
      specialty: "General Medicine",
      hospital: "Health Care Hospital",
      date: "2025-06-20",
      status: "completed"
    }
  ];

  const nearbyHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      rating: 4.5,
      distance: "1.2 km",
      specialties: ["Cardiology", "Neurology", "Orthopedics"],
      availableDoctors: 12
    },
    {
      id: 2,
      name: "Medical Center Plus",
      rating: 4.3,
      distance: "2.1 km",
      specialties: ["Dermatology", "Pediatrics", "ENT"],
      availableDoctors: 8
    },
    {
      id: 3,
      name: "Health Care Hospital",
      rating: 4.7,
      distance: "3.5 km",
      specialties: ["General Medicine", "Gynecology", "Psychiatry"],
      availableDoctors: 15
    }
  ];

  const handleLogout = () => {
    dispatch(logoutPatientThunk());
    navigate("/patient-login");
  };

  // GetPatient Profile
  useEffect(()=>{
       dispatch(getPatientProfileThunk());
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Care Connect</h1>
                <p className="text-xs text-blue-600">Patient Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {patientDetails?.fullName?.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-gray-900">
                    {patientDetails?.fullName}
                  </span>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments?.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{recentAppointments?.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nearby Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{nearbyHospitals?.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                <p className="text-2xl font-bold text-gray-900">30m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-1">
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab("book-appointment")}
                className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                  activeTab === "book-appointment"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Plus size={18} />
                <span>Book Appointment</span>
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                  activeTab === "appointments"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Calendar size={18} />
                <span>My Appointments</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                  activeTab === "profile"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Book Appointment Tab */}
        {activeTab === "book-appointment" && (
          <div className="space-y-6">
            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Search className="h-5 w-5 text-blue-600" />
                <span>Find Doctors & Hospitals</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by doctor name, specialty, or hospital..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Search size={18} />
                  <span>Search</span>
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {/* Nearby Hospitals */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Nearby Hospitals</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">Find healthcare providers near you</p>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {nearbyHospitals?.map((hospital) => (
                    <div key={hospital.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{hospital.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{hospital.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Stethoscope className="h-4 w-4" />
                              <span>{hospital.availableDoctors} doctors</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {hospital.specialties.map((specialty, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Appointments</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">Your scheduled medical consultations</p>
              </div>
              <div className="p-6">
                {upcomingAppointments?.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments?.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {appointment.doctorName.split(' ')[1]?.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{appointment.doctorName}</h4>
                                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date} at {appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>{appointment.hospital}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Serial No: {appointment.serialNumber}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Activity className="h-4 w-4" />
                                <span>Est. wait: {appointment.estimatedWait}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                {appointment.status}
                              </span>
                              <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                                Track Queue
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                                Reschedule
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Appointments</h4>
                    <p className="text-gray-600 mb-4">Book your first appointment to get started</p>
                    <button 
                      onClick={() => setActiveTab("book-appointment")}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span>Recent Appointments</span>
                </h3>
              </div>
              <div className="p-6">
                {recentAppointments?.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.doctorName.split(' ')[1]?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.doctorName}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.date}</p>
                        </div>
                      </div>
                      <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Patient Profile</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">Manage your personal information</p>
            </div>
            <div className="p-6">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {patientDetails?.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{patientDetails?.fullName}</h4>
                    <p className="text-gray-600">Patient ID:{patientDetails?._id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={patientDetails?.fullName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={patientDetails?.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      value={patientDetails?.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DOB</label>
                    <input 
                      type="number" 
                      value={patientDetails?.DOB}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <input 
                      type="text" 
                      value={patientDetails?.gender}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default PatientDashboard;