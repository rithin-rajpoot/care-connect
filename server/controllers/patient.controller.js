import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";

export const registerPatient = asyncHandler(async (req, res, next) => {
    let { fullName, username, email, password, DOB, gender, address, phone } = req.body;
    
    // Validate required fields
    if (!fullName || !username || !email || !phone || !password) {
        return next(new errorHandler("Required fields cannot be empty", 400));
    }

    // Validate input formats
    if (fullName.trim().length < 2) {
        return next(new errorHandler("Full name must be at least 2 characters", 400));
    }

    if (username.trim().length < 3) {
        return next(new errorHandler("Username must be at least 3 characters", 400));
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return next(new errorHandler("Username can only contain letters, numbers, and underscores", 400));
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return next(new errorHandler("Please enter a valid email address", 400));
    }

    if (password.length < 6) {
        return next(new errorHandler("Password must be at least 6 characters", 400));
    }

    // Validate phone format (10-15 digits, optional + prefix)
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    const cleanPhone = phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
        return next(new errorHandler("Please enter a valid phone number (10-15 digits)", 400));
    }

    // Validate DOB if provided
    if (DOB && new Date(DOB) > new Date()) {
        return next(new errorHandler("Date of birth cannot be in the future", 400));
    }

    // Check if patient already exists with email, username, or phone
    const existingPatient = await Patient.findOne({ 
        $or: [{ email }, { username }, { phone }] 
    });
    
    if (existingPatient) {
        let conflict = "email";
        if (existingPatient.username === username) conflict = "username";
        if (existingPatient.phone === phone) conflict = "phone number";
        return next(new errorHandler(`A patient already exists with this ${conflict}`, 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const patientData = {
        fullName: fullName.trim(),
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: cleanPhone,
        DOB: DOB || '',
        gender: gender || '',
        address: address?.trim() || '',
    };

    const newPatient = new Patient(patientData);
    await newPatient.save();

    // Generate JWT
    const tokenData = { _id: newPatient._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });

    res
        .status(201)
        .cookie("token", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json({
            success: true,
            message: "Registration successful",
            responseData: {
                patient: {
                    _id: newPatient._id,
                    fullName: newPatient.fullName,
                    username: newPatient.username,
                    email: newPatient.email,
                    phone: newPatient.phone,
                    DOB: newPatient.DOB,
                    gender: newPatient.gender,
                    address: newPatient.address,
                    // Don't send password in response
                },
                token
            },
        });
});

export const patientLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new errorHandler("Email and password are required", 400));
    }

    // Find patient by email or username
    const patient = await Patient.findOne({ 
        $or: [{ email }, { username: email }] 
    });
    
    if (!patient) {
        return next(new errorHandler("Invalid credentials", 400));
    }

    const isValidPassword = await bcrypt.compare(password, patient.password);
    if (!isValidPassword) {
        return next(new errorHandler("Invalid credentials", 400));
    }

    // Generate JWT
    const tokenData = { _id: patient._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRATION 
    });

    res.status(200)
        .cookie("token", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json({
            success: true,
            message: "Login successful",
            responseData: {
                patient: {
                    _id: patient._id,
                    fullName: patient.fullName,
                    username: patient.username,
                    email: patient.email,
                    phone: patient.phone,
                    DOB: patient.DOB,
                    gender: patient.gender,
                    address: patient.address,
                    // Don't send password in response
                },
                token
            }
        });
});

export const getPatientProfile = asyncHandler(async (req, res, next) => {
    const patientData = await Patient.findById(req.user._id).select('-password');
    
    if (!patientData) {
        return next(new errorHandler("Patient not found", 404));
    }

    res.status(200).json({
        success: true,
        responseData: patientData
    });
});