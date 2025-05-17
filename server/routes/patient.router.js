import express from 'express';
import { getPatientProfile, patientLogin, registerPatient } from '../controllers/patient.controller.js';
import { userLogout } from '../controllers/userLogout.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.middleware.js';


const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', patientLogin);
router.post('/logout', isAuthenticated, userLogout);
router.get('/get-profile', isAuthenticated, getPatientProfile);

export default router;