import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer.jsx";
import { UserPlus, User, Settings, LogOut, Eye, EyeOff } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("add-doctor");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminDetails, hospitalDetails } = useSelector(
    (state) => state.hospitalReducer
  );
  const { doctors } = useSelector((state) => state.doctorReducer);
  console.log(doctors);

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
    <div className="min-h-screen bg-gray-50 ">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                Hospital Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {adminDetails?.adminName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {adminDetails?.adminName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {doctors.length == 0 ? (
              <button
                onClick={() => setActiveTab("add-doctor")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 cursor-pointer ${
                  activeTab === "add-doctor"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <UserPlus size={20} />
                <span>Add Doctor</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab("all-doctors")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 cursor-pointer ${
                  activeTab === "all-doctors"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <UserPlus size={20} />
                <span>All Doctors</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 cursor-pointer ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        {/* Add Doctor Tab */}
        {activeTab === "add-doctor"  && (
          <div className="bg-white rounded-lg shadow p-6 min-h-[60vh] flex flex-col justify-center items-center">
            <div className="text-center">
              <UserPlus className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Add New Doctor
              </h2>
              <p className="text-gray-600 mb-8">
                Add doctors to your hospital so they can start accepting
                appointments
              </p>
              <button
                onClick={() => navigate("/add-doctor")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2 mx-auto cursor-pointer"
              >
                <UserPlus size={20} />
                <span>Add Doctor</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "all-doctors" && doctors.length > 0 && (
          <div className="min-h-[75vh] bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Speciality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Op Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-mail
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doctor.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doctor.specialization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doctor.avgConsultationTime} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doctor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          edit details
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          remove doctor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Settings size={20} />
                <span>Hospital Profile</span>
              </h3>
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
