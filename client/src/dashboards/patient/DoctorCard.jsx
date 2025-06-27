import {
  User,
  Clock,
  Calendar,
  Phone,
  Mail,
  Heart,
  IndianRupee,
  X,
} from "lucide-react";


// Detailed Doctor Card Component
const DoctorCard = ({ doctor, onClose }) => {
  // Format days for display
  const formatDays = (days) => {
    if (!days || days.length === 0) return 'Not available';
    return days.join(', ');
  };

  // Format time for display
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Helper function to get numeric value from MongoDB format
  const getNumericValue = (value) => {
    if (typeof value === 'object' && value.$numberInt) {
      return parseInt(value.$numberInt);
    }
    return value;
  };

  return (
    <div className="fixed inset-0 bg-primary/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Doctor Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Doctor Card Content */}
        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-6">
            {/* Doctor Header */}
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full mr-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{doctor.fullName}</h3>
                <p className="text-xl text-blue-600 font-semibold">{doctor.specialization}</p>
                <div className="flex items-center mt-2">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm text-gray-600">Available for consultation</span>
                </div>
              </div>
            </div>

            {/* Doctor Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Consultation Fee */}
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Consultation Fee</h4>
                  <p className="text-xl font-bold text-green-600">₹{getNumericValue(doctor.consultationFee)}</p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Operating Hours</h4>
                  <p className="text-base text-gray-600">
                    {formatTime(doctor.opHours?.start)} - {formatTime(doctor.opHours?.end)}
                  </p>
                </div>
              </div>

              {/* Available Days */}
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Available Days</h4>
                  <p className="text-base text-gray-600">{formatDays(doctor.opDays)}</p>
                </div>
              </div>

              {/* Consultation Time */}
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Consultation Duration</h4>
                  <p className="text-base text-gray-600">{getNumericValue(doctor.avgConsultationTime)} minutes</p>
                </div>
              </div>

              {/* Contact Phone */}
              <div className="flex items-start space-x-3">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Contact</h4>
                  <p className="text-base text-gray-600">{doctor.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                  <p className="text-base text-gray-600">{doctor.email}</p>
                </div>
              </div>

              {/* Validity Period */}
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Booking Validity</h4>
                  <p className="text-base text-gray-600">{getNumericValue(doctor.opValidityDays)} days</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </button>
              <button className="bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;