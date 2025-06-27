import express from 'express';
import { getAllHospitals, updateHospital } from "../controllers/hospital.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.middleware.js";

const router = express.Router();

router.post('/update-hospital', isAuthenticated, updateHospital);

// patient use
router.get('/get-all-hospitals', isAuthenticated, getAllHospitals);

export default router;