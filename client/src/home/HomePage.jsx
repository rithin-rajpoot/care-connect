import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  ArrowRight,
  Clock,
  Calendar,
  Bell,
  CheckCircle,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/patient/hospitals?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
     <Navbar/>
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-200 to-white py-16 md:py-24 px-[6rem]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Skip the Wait,
                <br />
                <span className="text-primary-500">Book Your OP</span> Today
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our revolutionary serial number-based OP booking system
                simplifies your hospital visits. No more waiting in long queues
                or uncertainty about your turn.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/patient/register"
                  className="btn bg-blue-600 hover:bg-blue-700 btn-lg"
                >
                  Register Now
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>

              <div className="flex items-center text-gray-600">
                <CheckCircle size={20} className="text-blue-500 mr-2" />
                <span>
                  Join thousands of patients enjoying hassle-free OP visits
                </span>
              </div>
            </div>
            <div className="">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <img
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Patient App Interface"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find the Best Hospitals & Doctors
            </h2>
            <p className="text-gray-600 mb-8">
              Search for hospitals and doctors based on specialization,
              location, or ratings
            </p>

            {/* search bar */}
            <label className="input">
              <FaSearch />
              <input type="search" required placeholder=" Search" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search
              </h3>
              <p className="text-gray-600">
                Find hospitals and doctors that match your requirements
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book</h3>
              <p className="text-gray-600">
                Book your appointment and get a serial number instantly
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Bell size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track
              </h3>
              <p className="text-gray-600">
                Get real-time updates and reminders about your appointment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Features That Make Healthcare Simpler
            </h2>
            <p className="text-gray-600">
              Our platform offers a comprehensive suite of features designed to
              streamline the OP booking process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Patient Registration
              </h3>
              <p className="text-gray-600">
                Simple mobile OTP or email registration with minimal information
                required
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>
                  <path d="M12 11h4"></path>
                  <path d="M12 16h4"></path>
                  <path d="M8 11h.01"></path>
                  <path d="M8 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Serial Number Booking
              </h3>
              <p className="text-gray-600">
                No time slots, just a simple serial number with estimated
                waiting time
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M12 20v-6M12 8V4M20 12h-4M8 12H4M19.45 19.45l-2.83-2.83M19.45 4.55l-2.83 2.83M7.38 7.38L4.55 4.55M7.38 16.62l-2.83 2.83"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Live Queue Updates
              </h3>
              <p className="text-gray-600">
                Track your position in the queue and get real-time updates
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Notifications
              </h3>
              <p className="text-gray-600">
                Receive automated SMS, WhatsApp, and app notifications about
                your appointment
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path>
                  <path d="M16 3v18"></path>
                  <path d="M8 3v18"></path>
                  <path d="M3 16h18"></path>
                  <path d="M3 8h18"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hospital Dashboard
              </h3>
              <p className="text-gray-600">
                Comprehensive dashboard for hospitals to manage doctors, OPs,
                and patients
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Doctor Controls
              </h3>
              <p className="text-gray-600">
                One-click interface for doctors to update patient status and
                manage queue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to transform your OP experience?
            </h2>
            <p className="text-lg opacity-90 mb-8 text-gray-200">
              Join thousands of patients and hundreds of hospitals that have
              switched to our serial number-based OP system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/patient/register"
                className="btn bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
              >
                Register as Patient
              </Link>
              <Link
                to="/hospital/register"
                className="btn bg-blue-700 text-white hover:bg-blue-800 shadow-lg"
              >
                Register Hospital <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
     </>
  );
};

export default HomePage;
