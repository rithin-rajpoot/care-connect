import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom";
import HomePage from './home/HomePage';
import PatientLogin from './authentication/patient/PatientLogin';
import PatientRegistration from './authentication/patient/PatientRegistration';
import HospitalLogin from './authentication/hospital/HospitalLogin';
import HospitalRegistration from './authentication/hospital/HospitalRegistration';
import PatientDashBoard from './dashboards/PatientDashBoard';
import AdminDashBoard from './dashboards/admin/AdminDashBoard';
import DoctorForm from './dashboards/admin/DoctorForm';
const App = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
        <Route
          path="/"
          element={ <HomePage />
          }
        />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-register" element={<PatientRegistration /> } />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/hospital-register" element={<HospitalRegistration />} />
        <Route path="/patient-dashboard" element={<PatientDashBoard />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/add-doctor" element={<DoctorForm />} />
      </Routes>
    </>
  )
}

export default App
