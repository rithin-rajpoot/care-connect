import express from 'express';
import { userLogout } from '../controllers/userLogout.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.middleware.js';
import { adminLogin, getAdminProfile, registerHospitalAndAdmin, updateHospital } from '../controllers/admin.controller.js';


const router = express.Router();

router.post('/register', registerHospitalAndAdmin);
router.post('/login', adminLogin);
router.post('/logout', isAuthenticated, userLogout);
router.get('/get-profile', isAuthenticated, getAdminProfile);
router.post('/update-hospital', isAuthenticated, updateHospital);

export default router;