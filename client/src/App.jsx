import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom";
import HomePage from './home/HomePage';
import PatientLogin from './authentication/patient/PatientLogin';
import PatientRegistration from './authentication/patient/PatientRegistration';
import HospitalLogin from './authentication/hospital/HospitalLogin';
import HospitalRegistration from './authentication/hospital/HospitalRegistration';
import PatientDashBoard from './dashboards/patient/PatientDashBoard';
import AdminDashBoard from './dashboards/admin/AdminDashBoard';
import DoctorForm from './dashboards/admin/DoctorForm';
import Dashboard from './home/Dashboard';
import DoctorsList from './dashboards/patient/DoctorList';
import DoctorLogin from './authentication/doctor/DoctorLogin';
import DoctorDashboard from './dashboards/doctor/DoctorDashboard';
const App = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
        <Route path="/" element={ <Dashboard/>}/>
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-register" element={<PatientRegistration /> } />

        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/hospital-register" element={<HospitalRegistration />} />
        <Route path="/add-doctor" element={<DoctorForm />} />

        <Route path='doctor-list' element={<DoctorsList />} />
        <Route path='doctor-login' element={<DoctorLogin />} />

        <Route path="/patient-dashboard" element={<PatientDashBoard />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard /> } />
      </Routes>
    </>
  )
}

export default App

 {/* <Route
          path="home"
          element={ <HomePage/>
          }
        /> */}