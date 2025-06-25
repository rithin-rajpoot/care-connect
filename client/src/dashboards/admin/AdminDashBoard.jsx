import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer.jsx";
import { UserPlus, User, Settings, LogOut, Eye, EyeOff, Building2, Users, Calendar, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProfileThunk,
  logoutAdminThunk,
  updateHospitalProfileThunk,
} from "../../store/slice/hospital/hospitalThunk.js";
import { getAllDoctorsThunk } from "../../store/slice/doctor/doctorThunk.js";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState("all-doctors");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminDetails, hospitalDetails } = useSelector(
    (state) => state.hospitalReducer
  );
  const { doctors } = useSelector((state) => state.doctorReducer);

  useEffect(() => {
    dispatch(getAdminProfileThunk());
    dispatch(getAllDoctorsThunk());
  }, []);

  const handleProfileUpdate = (updatedData) => {
    dispatch(updateHospitalProfileThunk(updatedData));
  };

  const handleLogout = async () => {
    const response = await dispatch(logoutAdminThunk());
    if (response?.payload?.success) {
      navigate("/hospital-login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hospital Admin</h1>
                <p className="text-xs text-green-600">{hospitalDetails?.hospitalName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <button
                onClick={() => navigate("/add-doctor")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-medium"
              >
                <UserPlus size={18} />
                <span>Add Doctor</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {adminDetails?.adminName?.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-gray-900">
                    {adminDetails?.adminName}
                  </span>
                  <p className="text-xs text-gray-500">Administrator</p>
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

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctors?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Stethoscope className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Queues</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-1">
            <nav className="flex space-x-1">
              {doctors.length == 0 ? (
                <button
                  onClick={() => setActiveTab("add-doctor")}
                  className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                    activeTab === "add-doctor"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <UserPlus size={18} />
                  <span>Add Doctor</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab("all-doctors")}
                  className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                    activeTab === "all-doctors"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Users size={18} />
                  <span>All Doctors</span>
                </button>
              )}
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-all ${
                  activeTab === "profile"
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Settings size={18} />
                <span>Profile</span>
              </button>
            </nav>
          </div>
        </div>

        {/* All Doctors Tab */}
        {activeTab === 'all-doctors' && doctors.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>Doctor Management</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">Manage your hospital's medical staff</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Doctor Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Speciality
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Consultation Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {doctor.fullName?.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {doctor.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              Dr. {doctor.fullName?.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {doctor.specialization}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{doctor.avgConsultationTime} min</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doctor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button className="text-green-600 hover:text-green-900 hover:bg-green-50 px-3 py-1 rounded-md transition-colors">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 hover:bg-red-50 px-3 py-1 rounded-md transition-colors">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Doctor Tab */}
        {(activeTab === "add-doctor" || doctors.length === 0) && (
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-12">
            <div className="text-center max-w-md mx-auto">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Add New Doctor
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Expand your medical team by adding qualified doctors to your hospital. 
                They'll be able to manage their schedules and accept patient appointments.
              </p>
              <button
                onClick={() => navigate("/add-doctor")}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2 mx-auto shadow-md hover:shadow-lg"
              >
                <UserPlus size={20} />
                <span>Add Doctor</span>
              </button>
              
              {doctors.length === 0 && (
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Getting Started:</strong> Add at least one doctor to begin accepting patient appointments.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <span>Hospital Profile</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">Manage your hospital information and settings</p>
            </div>
            <ProfileForm
              hospitalData={hospitalDetails}
              adminData={adminDetails}
              onUpdate={handleProfileUpdate}
            />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashBoard;