import { useEffect, useState } from "react";
import Footer from "../../components/Footer.jsx";
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  MapPin, 
  Star,
  Plus,
  Activity,
  FileText,
  Filter,
  ChevronRight,
  Stethoscope,
  Phone
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfileThunk, logoutPatientThunk } from "../../store/slice/patient/patientThunk.js";
import Navbar from "./Navbar.jsx";
import { getHospitalsThunk } from "../../store/slice/hospital/hospitalThunk.js";
import PatientProfile from "./PatientProfile.jsx";
import Appointments from "./Appointments.jsx";
import DoctorsList from "./DoctorList.jsx";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("book-appointment");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  
  const { allHospitals } = useSelector((state) => state.hospitalReducer);

  // GetPatient Profile
  useEffect(()=>{
       dispatch(getPatientProfileThunk());
       dispatch(getHospitalsThunk());
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Header */}
      <Navbar />

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
                <p className="text-2xl font-bold text-gray-900">{5}</p>
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
                <p className="text-2xl font-bold text-gray-900">{2}</p>
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
                <p className="text-2xl font-bold text-gray-900">{allHospitals?.length}</p>
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
                  {allHospitals?.map((hospital) => (
                    <div key={hospital?._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{hospital?.hospitalName}</h4>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-600">{hospital?.hospitalType}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{hospital?.hospitalAdress}</span>
                            </div>
                            {/* <div className="flex items-center space-x-1">
                              <Stethoscope className="h-4 w-4" />
                              <span>{hospital.availableDoctors} doctors</span>
                            </div> */}
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{hospital?.hospitalPhno} </span>
                            </div>
                          </div>
                          {/* <div className="flex flex-wrap gap-2">
                            {hospital.specialties.map((specialty, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div> */}
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
          <Appointments />
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <PatientProfile />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;