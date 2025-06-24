import React, { useState } from 'react';
import { User, Building2, Calendar, Clock, Users, Stethoscope, Heart, ArrowRight, Star, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from "react-router-dom";
import Header from '../components/Header';

const Dashboard = () => {
  const [userType, setUserType] = useState('patient');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Skip the Wait,
              <span className="block text-yellow-300">Book Your Slot</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Real-time queue tracking • Smart notifications • Seamless booking
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Users className="h-5 w-5" />
                <span>10,000+ Patients Served</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Building2 className="h-5 w-5" />
                <span>500+ Hospitals</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-xl text-gray-600">Get started based on who you are</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setUserType('patient')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  userType === 'patient'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-5 w-5 inline mr-2" />
                Patient
              </button>
              <button
                onClick={() => setUserType('hospital')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  userType === 'hospital'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building2 className="h-5 w-5 inline mr-2" />
                Hospital
              </button>
            </div>
          </div>

          {/* Patient Section */}
          {userType === 'patient' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-full mr-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Patient Portal</h3>
                    <p className="text-gray-600">Book appointments, track queues, get notifications</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Easy Booking</h4>
                      <p className="text-sm text-gray-600">Get your serial number instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Live Tracking</h4>
                      <p className="text-sm text-gray-600">Real-time queue updates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Smart Alerts</h4>
                      <p className="text-sm text-gray-600">SMS & WhatsApp notifications</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/patient-login" className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <User className="h-5 w-5 mr-2" />
                    Login as Patient
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                  <Link to="/patient-register" className="flex-1 bg-white text-blue-600 py-4 px-6 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center">
                    Register as Patient
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Hospital Section */}
          {userType === 'hospital' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-600 p-3 rounded-full mr-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Hospital Portal</h3>
                    <p className="text-gray-600">Manage appointments, doctors, and optimize patient flow</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Queue Management</h4>
                      <p className="text-sm text-gray-600">Real-time patient tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Stethoscope className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Doctor Profiles</h4>
                      <p className="text-sm text-gray-600">Manage schedules & availability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Analytics</h4>
                      <p className="text-sm text-gray-600">Patient trends & insights</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/hospital-login"  className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Hospital Login
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                  <Link  to="/hospital-register" className="flex-1 bg-white text-green-600 py-4 px-6 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors flex items-center justify-center">
                    Register Hospital
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CareConnect?</h2>
            <p className="text-xl text-gray-600">Modern healthcare booking made simple</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No More Waiting</h3>
              <p className="text-gray-600">Get real-time updates on your queue position</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Notifications</h3>
              <p className="text-gray-600">SMS & WhatsApp alerts for your appointments</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibrand text-gray-900 mb-2">Easy Rescheduling</h3>
              <p className="text-gray-600">Change appointments with a single tap</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Find Nearby</h3>
              <p className="text-gray-600">Locate hospitals and doctors near you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Care Connect</h3>
                  <p className="text-sm text-gray-400">Smart OP Booking</p>
                </div>
              </div>
              <p className="text-gray-400">
                Revolutionizing healthcare appointments with smart queue management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Book Appointments</li>
                <li>Track Queue</li>
                <li>Get Notifications</li>
                <li>Reschedule Easy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Hospitals</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Manage Queues</li>
                <li>Doctor Profiles</li>
                <li>Analytics</li>
                <li>API Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@careconnect.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; Care Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;