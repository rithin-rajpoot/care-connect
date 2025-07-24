import express from 'express';
import { userLogout } from '../controllers/userLogout.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.middleware.js';
import { changePassword, deleteDoctor, doctorLogin, getAllDoctors, getDoctorById, getDoctorProfile, getDoctorsByHospital, getDoctorsBySpecialization, getDoctorStats, registerDoctor, updateDoctor, updateDoctorProfile } from '../controllers/doctor.controller.js';


const router = express.Router();

// Admin Specific Routes
router.post('/register', isAuthenticated, registerDoctor);
router.get('/all-doctors', isAuthenticated, getAllDoctors);
// router.get('/stats', isAuthenticated, getDoctorStats);
// router.get('/:doctorId', isAuthenticated, getDoctorById);
// router.put('/:doctorId', isAuthenticated, updateDoctor);
// router.delete('/:doctorId', isAuthenticated, deleteDoctor);

// // Doctor Login
router.post('/login', doctorLogin);
// // Doctor Profile Management
// router.get('/profile/me', isAuthenticated, getDoctorProfile);
// router.put('/profile/me', isAuthenticated, updateDoctorProfile);
// router.put('/profile/change-password', isAuthenticated, changePassword);
// router.post('/profile/logout', isAuthenticated, userLogout);

// // patient use 
router.get('/search/specialization', isAuthenticated, getDoctorsBySpecialization);
router.get('/:hospitalId', isAuthenticated, getDoctorsByHospital);

export default router;