import express from 'express';
import { userLogout } from '../controllers/userLogout.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.middleware.js';
import { adminLogin, getAdminProfile, registerHospitalAndAdmin } from '../controllers/admin.controller.js';


const router = express.Router();

router.post('/register', registerHospitalAndAdmin);
router.post('/login', adminLogin);
router.post('/logout', isAuthenticated, userLogout);
router.get('/get-profile', isAuthenticated, getAdminProfile);

export default router;