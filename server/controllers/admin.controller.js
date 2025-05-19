import Admin from "../models/admin.model.js";
import Hospital from "../models/hospital.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Validation schemas
const validateHospitalDetails = (hospitalDetails) => {
    const { hospitalName, registrationId, hospitalType, hospitalEmail, hospitalPhno,hospitalAddress } = hospitalDetails;
    
    const errors = [];
    
    if (!hospitalName?.trim()) errors.push("Hospital name is required");
    if (!registrationId?.trim()) errors.push("Registration ID is required");
    if (!hospitalType?.trim()) errors.push("Hospital type is required");
    if (!hospitalEmail?.trim()) errors.push("Hospital email is required");
    if (!hospitalPhno?.trim()) errors.push("Hospital phone number is required");
    if (!hospitalAddress?.trim()) errors.push("Hospital address is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (hospitalEmail && !emailRegex.test(hospitalEmail)) {
        errors.push("Invalid hospital email format");
    }
    
    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (hospitalPhno && !phoneRegex.test(hospitalPhno)) {
        errors.push("Invalid phone number format");
    }
    
    return errors;
};

const validateAdminDetails = (adminDetails) => {
    const { adminName, adminEmail, adminPassword } = adminDetails;
    
    const errors = [];
    
    if (!adminName?.trim()) errors.push("Admin name is required");
    if (!adminEmail?.trim()) errors.push("Admin email is required");
    if (!adminPassword?.trim()) errors.push("Admin password is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (adminEmail && !emailRegex.test(adminEmail)) {
        errors.push("Invalid admin email format");
    }
    
    // Password validation
    if (adminPassword && adminPassword.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }
    
    return errors;
};

export const registerHospitalAndAdmin = asyncHandler(async (req, res, next) => {
    const { hospitalDetails, adminDetails } = req.body;

    // Validation
    if (!hospitalDetails || !adminDetails) {
        return next(new errorHandler("Hospital details and admin details are required", 400));
    }

    const hospitalErrors = validateHospitalDetails(hospitalDetails);
    const adminErrors = validateAdminDetails(adminDetails);
    const allErrors = [...hospitalErrors, ...adminErrors];

    if (allErrors.length > 0) {
        return next(new errorHandler(allErrors.join(", "), 400));
    }

    // Check if hospital with same registration ID already exists
    const existingHospital = await Hospital.findOne({ 
        registrationId: hospitalDetails.registrationId 
    });
    if (existingHospital) {
        return next(new errorHandler("Hospital with this registration ID already exists", 409));
    }

    // Check if admin with same email already exists
    const existingAdmin = await Admin.findOne({ 
        adminEmail: adminDetails.adminEmail 
    });
    if (existingAdmin) {
        return next(new errorHandler("Admin with this email already exists", 409));
    }

    // Create Hospital - only include fields that exist in your schema
    const hospitalData = {
        hospitalName: hospitalDetails.hospitalName.trim(),
        registrationId: hospitalDetails.registrationId.trim(),
        hospitalType: hospitalDetails.hospitalType.trim(),
        hospitalEmail: hospitalDetails.hospitalEmail.toLowerCase().trim(),
        hospitalPhno: hospitalDetails.hospitalPhno.trim(),
    };

    // Add optional fields if they exist
    if (hospitalDetails.hospitalAddress) {
        hospitalData.hospitalAddress = hospitalDetails.hospitalAddress.trim();
    }
    if (hospitalDetails.logoUrl) {
        hospitalData.logoUrl = hospitalDetails.logoUrl.trim();
    }
    if (hospitalDetails.licenseUrl) {
        hospitalData.licenseUrl = hospitalDetails.licenseUrl.trim();
    }

    const hospital = new Hospital(hospitalData);
    await hospital.save();

    // Create Admin linked to that hospital
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminDetails.adminPassword, saltRounds);

    const newAdmin = new Admin({
        hospitalId: hospital._id,
        adminName: adminDetails.adminName.trim(),
        adminEmail: adminDetails.adminEmail.toLowerCase().trim(),
        adminPassword: hashedPassword,
    });

    await newAdmin.save();

    // Generate JWT
    const tokenData = {
        _id: newAdmin._id,
        adminEmail: newAdmin.adminEmail,
        hospitalId: hospital._id,
        role: newAdmin.role
    };
    
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION || '7d',
    });

    // Remove password from response
    const adminResponse = { ...newAdmin.toObject() };
    delete adminResponse.adminPassword;

    res
        .status(201)
        .cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json({
            success: true,
            message: "Hospital and Admin registered successfully",
            responseData: {
                hospitalDetails: hospital,
                adminDetails: adminResponse,
                token
            },
        });
});

export const adminLogin = asyncHandler(async (req, res, next) => {
    const { adminEmail, adminPassword } = req.body;
    
    // Validation
    if (!adminEmail?.trim() || !adminPassword?.trim()) {
        return next(new errorHandler("Email and password are required", 400));
    }

    // Find admin with populated hospital details
    const admin = await Admin.findOne({ 
        adminEmail: adminEmail.toLowerCase().trim() 
    }).populate('hospitalId');
    
    if (!admin) {
        return next(new errorHandler("Invalid email or password", 401));
    }

    // Check password
    const isValidPassword = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isValidPassword) {
        return next(new errorHandler("Invalid email or password", 401));
    }

    // Generate JWT
    const tokenData = {
        _id: admin._id,
        adminEmail: admin.adminEmail,
        hospitalId: admin.hospitalId._id,
        role: admin.role
    };
    
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRATION || '7d' 
    });

    // Remove password from response
    const adminResponse = { ...admin.toObject() };
    delete adminResponse.adminPassword;

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json({
            success: true,
            message: "Login successful",
            responseData: {
                admin: adminResponse,
                token
            }
        });
});

export const getAdminProfile = asyncHandler(async (req, res, next) => {
    const adminData = await Admin.findById(req.user._id)
        .populate('hospitalId')
        .select('-adminPassword');
    
    if (!adminData) {
        return next(new errorHandler("Admin not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        responseData: adminData
    });
});

export const updateAdminProfile = asyncHandler(async (req, res, next) => {
    const { adminName, adminEmail } = req.body;
    const adminId = req.user._id;

    // Validation
    if (!adminName?.trim() && !adminEmail?.trim()) {
        return next(new errorHandler("At least one field is required for update", 400));
    }

    const updateFields = {};
    if (adminName?.trim()) updateFields.adminName = adminName.trim();
    if (adminEmail?.trim()) {
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(adminEmail)) {
            return next(new errorHandler("Invalid email format", 400));
        }
        
        // Check if email already exists for another admin
        const existingAdmin = await Admin.findOne({ 
            adminEmail: adminEmail.toLowerCase().trim(),
            _id: { $ne: adminId }
        });
        if (existingAdmin) {
            return next(new errorHandler("Email already in use", 409));
        }
        
        updateFields.adminEmail = adminEmail.toLowerCase().trim();
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        adminId,
        updateFields,
        { new: true, runValidators: true }
    ).populate('hospitalId').select('-adminPassword');

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        responseData: updatedAdmin
    });
});

export const changeAdminPassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.user._id;

    // Validation
    if (!currentPassword || !newPassword) {
        return next(new errorHandler("Current password and new password are required", 400));
    }

    if (newPassword.length < 6) {
        return next(new errorHandler("New password must be at least 6 characters long", 400));
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
        return next(new errorHandler("Admin not found", 404));
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.adminPassword);
    if (!isValidPassword) {
        return next(new errorHandler("Current password is incorrect", 401));
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await Admin.findByIdAndUpdate(adminId, {
        adminPassword: hashedNewPassword
    });

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});

export const logoutAdmin = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json({
            success: true,
            message: "Logged out successfully"
        });
});