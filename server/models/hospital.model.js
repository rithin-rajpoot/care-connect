import mongoose from 'mongoose';
const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationId: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // General, Super Specialty, etc.
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, default:'' }, // or { lat, lng } for maps
  logoUrl: { type: String },
  licenseUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;