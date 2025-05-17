import mongoose from 'mongoose';
const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  registrationId: { type: String, required: true, unique: true },
  hospitalType: { type: String, required: true }, // General, Super Specialty, etc.
  hospitalPhno: { type: String, required: true },
  hospitalEmail: { type: String, required: true },
  hospitalAddress: { type: String, default:'' }, // or { lat, lng } for maps
  logoUrl: { type: String },
  licenseUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;