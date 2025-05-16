import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  role: { type: String, enum: ['doctor'], default: 'doctor' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },

  opDays: [String], // e.g., ['Monday', 'Wednesday']
  opHours: {
    start: { type: String, required: true }, // '09:00'
    end: { type: String, required: true }     // '13:00'
  },

  avgConsultationTime: { type: Number, required: true }, // in minutes
  consultationFee: { type: Number, required: true },
  opValidityDays: { type: Number, default: 30 },

  createdAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
