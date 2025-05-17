
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true, unique: true },
  adminPassword: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;