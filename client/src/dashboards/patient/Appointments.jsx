import React from 'react'

const Appointments = () => {
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
  return (
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
  )
}

export default Appointments
