import mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    role: { type: String, enum: ['patient'], default: 'patient' },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9+]{10,15}$/, },
    DOB: { type: Date, required: true },
    gender: { type: String, required: true, default: '' },
    address: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;

