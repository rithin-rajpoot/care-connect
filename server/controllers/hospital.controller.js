import Hospital from "../models/hospital.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";

export const updateHospital = asyncHandler(async (req, res, next) => {
    const { hospitalName, hospitalEmail, hospitalPhno, hospitalAddress, hospitalType } = req.body;
    
    const hospitalId = req.user.hospitalId;

    // Validation
    if (!hospitalName?.trim() && !hospitalEmail?.trim() && !hospitalPhno?.trim() && 
        !hospitalAddress?.trim() && !hospitalType?.trim()) {
        return next(new errorHandler("At least one field is required for update", 400));
    }

    // Find the hospital first to ensure it exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
        return next(new errorHandler("Hospital not found", 404));
    }

    const updateFields = {};
    
    // Handle each field with appropriate validation
    if (hospitalName?.trim()) updateFields.hospitalName = hospitalName.trim();
    
    if (hospitalEmail?.trim()) {
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(hospitalEmail)) {
            return next(new errorHandler("Invalid email format", 400));
        }
        
        // Check if email already exists for another hospital
        const existingHospital = await Hospital.findOne({ 
            hospitalEmail: hospitalEmail.toLowerCase().trim(),
            _id: { $ne: hospitalId }
        });
        if (existingHospital) {
            return next(new errorHandler("Email already in use", 409));
        }
        
        updateFields.hospitalEmail = hospitalEmail.toLowerCase().trim();
    }
    
    if (hospitalPhno?.trim()) updateFields.hospitalPhno = hospitalPhno.trim();
    if (hospitalAddress?.trim()) updateFields.hospitalAddress = hospitalAddress.trim();
    if (hospitalType?.trim()) updateFields.hospitalType = hospitalType.trim();

    // Ensure we're not removing required fields
    const updatedData = {
        ...hospital.toObject(),
        ...updateFields
    };
    
    // Check that required fields are still present
    if (!updatedData.hospitalName || !updatedData.hospitalEmail || 
        !updatedData.hospitalPhno || !updatedData.hospitalType || 
        !updatedData.registrationId) {
        return next(new errorHandler("Cannot remove required fields", 400));
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
        hospitalId,
        updateFields,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: "Hospital details updated successfully",
        responseData: {
            hospitalDetails: updatedHospital
        }
    });
});

export const getAllHospitals = asyncHandler(async (req, res, next) => {
    const hospitals = await Hospital.find().select('-licenseUrl'); // Exclude licenseUrl for security

    if (!hospitals || hospitals.length === 0) {
        return next(new errorHandler("No hospitals found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Hospitals retrieved successfully",
        responseData: hospitals
    });
});

