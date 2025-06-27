import React, { useState } from "react";
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



// Main Doctors List Component
const DoctorsList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Calculate next available slot
  const getNextAvailableDay = (opDays) => {
    if (!opDays || opDays.length === 0) return 'Not available';
    const today = new Date().getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames[today];
    
    if (opDays.includes(currentDay)) {
      return 'Today';
    }
    
    return `Next ${opDays[0]}`;
  };

  const displayDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDoctorCard = () => {
    setSelectedDoctor(null);
  };

  // Helper function to get numeric value from MongoDB format
  const getNumericValue = (value) => {
    if (typeof value === 'object' && value.$numberInt) {
      return parseInt(value.$numberInt);
    }
    return value;
  };

  const doctors = [
    {
      "_id": { "$oid": "682f10e40f6d02675c851260" },
      "fullName": "Dr. Rithin Rajpoot",
      "specialization": "Cardiology",
      "role": "doctor",
      "hospitalId": { "$oid": "682b636afb292ca0153f2318" },
      "email": "rjpoot@gmail.com",
      "phone": "7013047820",
      "password": "$2b$10$6zM8ZTF5iTsGkP12f9FUX.jI6rE/HaIL1t5avmkUuutzuU3kF1PUW",
      "opDays": ["Monday", "Tuesday"],
      "opHours": { "start": "09:00", "end": "17:00" },
      "avgConsultationTime": { "$numberInt": "30" },
      "consultationFee": { "$numberInt": "500" },
      "opValidityDays": { "$numberInt": "30" },
      "createdAt": { "$date": { "$numberLong": "1747914980902" } },
      "__v": { "$numberInt": "0" }
    },
    {
      "_id": { "$oid": "682f10e40f6d02675c851261" },
      "fullName": "Dr. Priya Mehra",
      "specialization": "Dermatology",
      "role": "doctor",
      "hospitalId": { "$oid": "682b636afb292ca0153f2318" },
      "email": "priyam@gmail.com",
      "phone": "9876543210",
      "password": "$2b$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      "opDays": ["Wednesday", "Friday"],
      "opHours": { "start": "10:00", "end": "16:00" },
      "avgConsultationTime": { "$numberInt": "20" },
      "consultationFee": { "$numberInt": "400" },
      "opValidityDays": { "$numberInt": "15" },
      "createdAt": { "$date": { "$numberLong": "1747915980902" } },
      "__v": { "$numberInt": "0" }
    },
    {
      "_id": { "$oid": "682f10e40f6d02675c851262" },
      "fullName": "Dr. Arjun Singh",
      "specialization": "Neurology",
      "role": "doctor",
      "hospitalId": { "$oid": "682b636afb292ca0153f2318" },
      "email": "arjun.singh@gmail.com",
      "phone": "9123456780",
      "password": "$2b$10$1234567890123456789012abcdefabcdefabcdefabcdefabcdef",
      "opDays": ["Tuesday", "Thursday"],
      "opHours": { "start": "11:00", "end": "18:00" },
      "avgConsultationTime": { "$numberInt": "40" },
      "consultationFee": { "$numberInt": "700" },
      "opValidityDays": { "$numberInt": "20" },
      "createdAt": { "$date": { "$numberLong": "1747916980902" } },
      "__v": { "$numberInt": "0" }
    },
    {
      "_id": { "$oid": "682f10e40f6d02675c851263" },
      "fullName": "Dr. Sneha Iyer",
      "specialization": "Pediatrics",
      "role": "doctor",
      "hospitalId": { "$oid": "682b636afb292ca0153f2318" },
      "email": "sneha.iyer@gmail.com",
      "phone": "9001234567",
      "password": "$2b$10$zyxwvutsrqponmlkjihgfedcbaabcdefabcdefabcdefabcdef",
      "opDays": ["Monday", "Wednesday", "Friday"],
      "opHours": { "start": "08:00", "end": "14:00" },
      "avgConsultationTime": { "$numberInt": "25" },
      "consultationFee": { "$numberInt": "300" },
      "opValidityDays": { "$numberInt": "25" },
      "createdAt": { "$date": { "$numberLong": "1747917980902" } },
      "__v": { "$numberInt": "0" }
    },
    {
      "_id": { "$oid": "682f10e40f6d02675c851264" },
      "fullName": "Dr. Manish Khurana",
      "specialization": "Orthopedics",
      "role": "doctor",
      "hospitalId": { "$oid": "682b636afb292ca0153f2318" },
      "email": "manishk@gmail.com",
      "phone": "7889900112",
      "password": "$2b$10$mnopqr1234567890stuvwxyzabcdefabcdefabcdefabcdef",
      "opDays": ["Tuesday", "Thursday", "Saturday"],
      "opHours": { "start": "12:00", "end": "20:00" },
      "avgConsultationTime": { "$numberInt": "35" },
      "consultationFee": { "$numberInt": "600" },
      "opValidityDays": { "$numberInt": "40" },
      "createdAt": { "$date": { "$numberLong": "1747918980902" } },
      "__v": { "$numberInt": "0" }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Available Doctors
        </h2>
        <p className="text-gray-600">Choose from our qualified specialists</p>
      </div>

      {/* Doctors List */}
      {doctors?.map((doctor) => (
        <div key={doctor._id.$oid} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Doctor Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-600 p-4 rounded-full mr-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {doctor.fullName}
                </h3>
                <p className="text-lg text-blue-600 font-semibold">
                  {doctor.specialization}
                </p>
                <div className="flex items-center mt-1">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    Available for consultation
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-green-600">₹{getNumericValue(doctor.consultationFee)}</span>
                  <span className="text-sm text-gray-600 ml-2">consultation fee</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {getNextAvailableDay(doctor.opDays)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </button>
            <button 
              onClick={() => displayDoctor(doctor)} 
              className="flex-1 bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <User className="h-5 w-5 mr-2" />
              View Profile
            </button>
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              Call
            </button>
          </div>
        </div>
      ))}

      {/* Modal for detailed doctor view */}
      {selectedDoctor && (
        <DoctorCard doctor={selectedDoctor} onClose={closeDoctorCard} />
      )}
    </div>
  );
};

export default DoctorsList;