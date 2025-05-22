import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  role: { type: String, enum: ['doctor'], default: 'doctor' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },

  // Authentication fields
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Operating schedule
  opDays: [String], // e.g., ['Monday', 'Wednesday']
  opHours: {
    start: { type: String, required: true }, // '09:00'
    end: { type: String, required: true }     // '13:00'
  },

  // Consultation details
  avgConsultationTime: { type: Number, required: true }, // in minutes
  consultationFee: { type: Number, required: true },
  opValidityDays: { type: Number, default: 30 },

  createdAt: { type: Date, default: Date.now } 
});

// // Index for better query performance
// doctorSchema.index({ email: 1 });
// doctorSchema.index({ phone: 1 });
// doctorSchema.index({ hospitalId: 1 });
// doctorSchema.index({ specialization: 1 });

// Virtual for full profile without password
// doctorSchema.methods.toJSON = function() {
//   const doctor = this.toObject();
//   delete doctor.password;
//   return doctor;
// };

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;