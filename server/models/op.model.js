import mongoose from 'mongoose';
const opBookingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  
  serialNumber: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  estimatedConsultationTime: { type: String }, // e.g., "10:30 AM"
  status: {
    type: String,
    enum: ['booked', 'running', 'completed', 'cancelled'],
    default: 'booked'
  },

  // 👇 Patient-side booking details
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  reason: { type: String, required: true }, // Reason for OP
  bookingLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },

  travelDistanceKm: { type: Number }, 
  travelTimeMinutes: { type: Number }, 

  isEmergency: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  createdAt: { type: Date, default: Date.now }
});

const OpBooking = mongoose.model('OpBooking', opBookingSchema);
export default OpBooking;