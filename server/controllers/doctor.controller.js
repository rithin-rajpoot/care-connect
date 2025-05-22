import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import Doctor from "../models/doctor.model.js";

export const registerDoctor = asyncHandler(async (req, res, next) => {
    let { 
        fullName, 
        specialization, 
        hospitalId,
        opDays, 
        opHours, 
        avgConsultationTime, 
        consultationFee, 
        opValidityDays,
        email,
        phone,
        password
    } = req.body;
     

    
    // Validate required fields
    if (!fullName || !specialization || !hospitalId || !email || !phone || !password) {
        return next(new errorHandler("Required fields cannot be empty", 400));
    }

    // // Validate input formats
    // if (fullName.trim().length < 2) {
    //     return next(new errorHandler("Full name must be at least 2 characters", 400));
    // }

    // if (specialization.trim().length < 2) {
    //     return next(new errorHandler("Specialization must be at least 2 characters", 400));
    // }

    // // Validate email format
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //     return next(new errorHandler("Please enter a valid email address", 400));
    // }

    // // Validate password
    // if (password.length < 6) {
    //     return next(new errorHandler("Password must be at least 6 characters", 400));
    // }

    // // Validate phone format
    // const phoneRegex = /^[+]?[0-9]{10,15}$/;
    // const cleanPhone = phone.replace(/\s/g, "");
    // if (!phoneRegex.test(cleanPhone)) {
    //     return next(new errorHandler("Please enter a valid phone number (10-15 digits)", 400));
    // }

    // // Check if doctor already exists with email or phone
    // const existingDoctor = await Doctor.findOne({ 
    //     $or: [{ email }, { phone: cleanPhone }] 
    // });
    
    // if (existingDoctor) {
    //     let conflict = "email";
    //     if (existingDoctor.phone === cleanPhone) conflict = "phone number";
    //     return next(new errorHandler(`A doctor already exists with this ${conflict}`, 400));
    // }

    // // Validate operating days
    // const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // if (opDays && opDays.length > 0) {
    //     const invalidDays = opDays.filter(day => !validDays.includes(day));
    //     if (invalidDays.length > 0) {
    //         return next(new errorHandler("Invalid operating days provided", 400));
    //     }
    // }

    // // Validate operating hours
    // if (opHours) {
    //     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    //     if (!timeRegex.test(opHours.start) || !timeRegex.test(opHours.end)) {
    //         return next(new errorHandler("Operating hours must be in HH:MM format", 400));
    //     }
        
    //     const startTime = new Date(`1970-01-01T${opHours.start}:00`);
    //     const endTime = new Date(`1970-01-01T${opHours.end}:00`);
    //     if (startTime >= endTime) {
    //         return next(new errorHandler("End time must be after start time", 400));
    //     }
    // }

    // // Validate consultation time and fee
    // if (avgConsultationTime && (avgConsultationTime < 5 || avgConsultationTime > 180)) {
    //     return next(new errorHandler("Average consultation time must be between 5 and 180 minutes", 400));
    // }

    // if (consultationFee && consultationFee < 0) {
    //     return next(new errorHandler("Consultation fee cannot be negative", 400));
    // }

    // if (opValidityDays && (opValidityDays < 1 || opValidityDays > 365)) {
    //     return next(new errorHandler("OP validity days must be between 1 and 365", 400));
    // }

    let doctorData = {
        fullName,
        specialization, 
        hospitalId,
        opDays, 
        opHours, 
        avgConsultationTime, 
        consultationFee, 
        opValidityDays,
        email,
        phone,
        password,
    }
    console.log("doctorData:",doctorData);
    // Hash password
    const hashedPassword = await bcrypt.hash(doctorData.password, 10);

    doctorData.password = hashedPassword;

    // const doctorData = {
    //     fullName: fullName.trim(),
    //     specialization: specialization.trim(),
    //     hospitalId,
    //     opDays: opDays || [],
    //     opHours: opHours || { start: "09:00", end: "17:00" },
    //     avgConsultationTime: avgConsultationTime || 30,
    //     consultationFee: consultationFee || 500,
    //     opValidityDays: opValidityDays || 30,
    //     email: email.toLowerCase().trim(),
    //     phone: cleanPhone,
    //     password: hashedPassword,
    // };

    // console.log("doctorData:",doctorData)

    const newDoctor = new Doctor(doctorData);
    console.log("new-doct:",newDoctor)
    await newDoctor.save();
    
    
    res.status(201).json({
        success: true,
        message: "Doctor registered successfully",
        responseData: {
            doctorDetails: {
                _id: newDoctor._id,
                fullName: newDoctor.fullName,
                specialization: newDoctor.specialization,
                role: newDoctor.role,
                hospitalId: newDoctor.hospitalId,
                opDays: newDoctor.opDays,
                opHours: newDoctor.opHours,
                avgConsultationTime: newDoctor.avgConsultationTime,
                consultationFee: newDoctor.consultationFee,
                opValidityDays: newDoctor.opValidityDays,
                email: newDoctor.email,
                phone: newDoctor.phone,
                createdAt: newDoctor.createdAt
            }
        },
    });
});

export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10, hospitalId, specialization, search } = req.params;
    
    const filter = {};
    
    if (hospitalId) {
        filter.hospitalId = hospitalId;
    }
    
    if (specialization) {
        filter.specialization = { $regex: specialization, $options: 'i' };
    }
    
    if (search) {
        filter.$or = [
            { fullName: { $regex: search, $options: 'i' } },
            { specialization: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;
    
    const doctors = await Doctor.find(filter)
        .populate('hospitalId', 'hospitalName hospitalAddress hospitalPhno hospitalEmail')
        .sort({ fullName: 1 })
        .skip(skip)
        .limit(parseInt(limit));
    
    const total = await Doctor.countDocuments(filter);

    res.status(200).json({
        success: true,
        message: "Doctors retrieved successfully",
        responseData: {
            doctors,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalDoctors: total,
                hasNext: page * limit < total,
                hasPrev: page > 1
            }
        }
    });
});

export const getDoctorById = asyncHandler(async (req, res, next) => {
    const { doctorId } = req.params;
    
    const doctor = await Doctor.findById(doctorId)
        .populate('hospitalId', 'name address phone email');
    
    if (!doctor) {
        return next(new errorHandler("Doctor not found", 404));
    }

    res.status(200).json({
        success: true,
        responseData: doctor
    });
});

export const updateDoctor = asyncHandler(async (req, res, next) => {
    const { doctorId } = req.params;
    const { 
        fullName, 
        specialization, 
        opDays, 
        opHours, 
        avgConsultationTime, 
        consultationFee, 
        opValidityDays
    } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return next(new errorHandler("Doctor not found", 404));
    }

    // Validate updates if provided
    if (fullName && fullName.trim().length < 2) {
        return next(new errorHandler("Full name must be at least 2 characters", 400));
    }

    if (specialization && specialization.trim().length < 2) {
        return next(new errorHandler("Specialization must be at least 2 characters", 400));
    }

    if (opDays && opDays.length > 0) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const invalidDays = opDays.filter(day => !validDays.includes(day));
        if (invalidDays.length > 0) {
            return next(new errorHandler("Invalid operating days provided", 400));
        }
    }

    if (opHours) {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(opHours.start) || !timeRegex.test(opHours.end)) {
            return next(new errorHandler("Operating hours must be in HH:MM format", 400));
        }
        
        const startTime = new Date(`1970-01-01T${opHours.start}:00`);
        const endTime = new Date(`1970-01-01T${opHours.end}:00`);
        if (startTime >= endTime) {
            return next(new errorHandler("End time must be after start time", 400));
        }
    }

    if (avgConsultationTime && (avgConsultationTime < 5 || avgConsultationTime > 180)) {
        return next(new errorHandler("Average consultation time must be between 5 and 180 minutes", 400));
    }

    if (consultationFee && consultationFee < 0) {
        return next(new errorHandler("Consultation fee cannot be negative", 400));
    }

    if (opValidityDays && (opValidityDays < 1 || opValidityDays > 365)) {
        return next(new errorHandler("OP validity days must be between 1 and 365", 400));
    }

    // Update fields
    const updateData = {};
    if (fullName) updateData.fullName = fullName.trim();
    if (specialization) updateData.specialization = specialization.trim();
    if (opDays) updateData.opDays = opDays;
    if (opHours) updateData.opHours = opHours;
    if (avgConsultationTime) updateData.avgConsultationTime = avgConsultationTime;
    if (consultationFee !== undefined) updateData.consultationFee = consultationFee;
    if (opValidityDays) updateData.opValidityDays = opValidityDays;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
        doctorId, 
        updateData, 
        { new: true, runValidators: true }
    ).populate('hospitalId', 'name address phone email');

    res.status(200).json({
        success: true,
        message: "Doctor updated successfully",
        responseData: updatedDoctor
    });
});

export const deleteDoctor = asyncHandler(async (req, res, next) => {
    const { doctorId } = req.params;
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return next(new errorHandler("Doctor not found", 404));
    }

    await Doctor.findByIdAndDelete(doctorId);

    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully"
    });
});


// for patient use 
export const getDoctorsBySpecialization = asyncHandler(async (req, res, next) => {
    const { specialization, hospitalId } = req.query;
    
    if (!specialization) {
        return next(new errorHandler("Specialization is required", 400));
    }

    const filter = { 
        specialization: { $regex: specialization, $options: 'i' } 
    };
    
    if (hospitalId) {
        filter.hospitalId = hospitalId;
    }

    const doctors = await Doctor.find(filter)
        .populate('hospitalId', 'name address phone email')
        .sort({ fullName: 1 });

    res.status(200).json({
        success: true,
        message: "Doctors retrieved successfully",
        responseData: {
            doctors,
            count: doctors.length
        }
    });
});

export const getDoctorStats = asyncHandler(async (req, res, next) => {
    const { hospitalId } = req.query;
    
    const matchFilter = hospitalId ? { hospitalId: mongoose.Types.ObjectId(hospitalId) } : {};
    
    const stats = await Doctor.aggregate([
        { $match: matchFilter },
        {
            $group: {
                _id: null,
                totalDoctors: { $sum: 1 },
                avgConsultationTime: { $avg: "$avgConsultationTime" },
                avgConsultationFee: { $avg: "$consultationFee" },
                specializations: { $addToSet: "$specialization" }
            }
        }
    ]);

    const specializationStats = await Doctor.aggregate([
        { $match: matchFilter },
        {
            $group: {
                _id: "$specialization",
                count: { $sum: 1 },
                avgFee: { $avg: "$consultationFee" }
            }
        },
        { $sort: { count: -1 } }
    ]);

    res.status(200).json({
        success: true,
        message: "Doctor statistics retrieved successfully",
        responseData: {
            overview: stats[0] || {
                totalDoctors: 0,
                avgConsultationTime: 0,
                avgConsultationFee: 0,
                specializations: []
            },
            specializationBreakdown: specializationStats
        }
    });
});

// =================================
// DOCTOR LOGIN SYSTEM
// =================================

export const doctorLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new errorHandler("Email and password are required", 400));
    }

    // Find doctor by email
    const doctor = await Doctor.findOne({ email }).populate('hospitalId', 'name address phone email');
    
    if (!doctor) {
        return next(new errorHandler("Invalid credentials", 400));
    }

    const isValidPassword = await bcrypt.compare(password, doctor.password);
    if (!isValidPassword) {
        return next(new errorHandler("Invalid credentials", 400));
    }

    // Generate JWT
    const tokenData = { _id: doctor._id, role: 'doctor' };
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
                doctor: {
                    _id: doctor._id,
                    fullName: doctor.fullName,
                    specialization: doctor.specialization,
                    role: doctor.role,
                    hospitalId: doctor.hospitalId,
                    opDays: doctor.opDays,
                    opHours: doctor.opHours,
                    avgConsultationTime: doctor.avgConsultationTime,
                    consultationFee: doctor.consultationFee,
                    opValidityDays: doctor.opValidityDays,
                    email: doctor.email,
                    phone: doctor.phone,
                },
                token
            }
        });
});

export const getDoctorProfile = asyncHandler(async (req, res, next) => {
    const doctorData = await Doctor.findById(req.user._id)
        .select('-password')
        .populate('hospitalId', 'name address phone email');
    
    if (!doctorData) {
        return next(new errorHandler("Doctor not found", 404));
    }

    res.status(200).json({
        success: true,
        responseData: doctorData
    });
});

export const updateDoctorProfile = asyncHandler(async (req, res, next) => {
    const { 
        opDays, 
        opHours, 
        avgConsultationTime, 
        consultationFee, 
        opValidityDays,
        phone 
    } = req.body;

    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
        return next(new errorHandler("Doctor not found", 404));
    }

    // Validate phone if provided
    if (phone) {
        const phoneRegex = /^[+]?[0-9]{10,15}$/;
        const cleanPhone = phone.replace(/\s/g, "");
        if (!phoneRegex.test(cleanPhone)) {
            return next(new errorHandler("Please enter a valid phone number (10-15 digits)", 400));
        }
        
        // Check if phone already exists for another doctor
        const existingDoctor = await Doctor.findOne({ 
            phone: cleanPhone, 
            _id: { $ne: req.user._id } 
        });
        if (existingDoctor) {
            return next(new errorHandler("A doctor already exists with this phone number", 400));
        }
    }

    // Validate other fields
    if (opDays && opDays.length > 0) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const invalidDays = opDays.filter(day => !validDays.includes(day));
        if (invalidDays.length > 0) {
            return next(new errorHandler("Invalid operating days provided", 400));
        }
    }

    if (opHours) {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(opHours.start) || !timeRegex.test(opHours.end)) {
            return next(new errorHandler("Operating hours must be in HH:MM format", 400));
        }
        
        const startTime = new Date(`1970-01-01T${opHours.start}:00`);
        const endTime = new Date(`1970-01-01T${opHours.end}:00`);
        if (startTime >= endTime) {
            return next(new errorHandler("End time must be after start time", 400));
        }
    }

    if (avgConsultationTime && (avgConsultationTime < 5 || avgConsultationTime > 180)) {
        return next(new errorHandler("Average consultation time must be between 5 and 180 minutes", 400));
    }

    if (consultationFee && consultationFee < 0) {
        return next(new errorHandler("Consultation fee cannot be negative", 400));
    }

    if (opValidityDays && (opValidityDays < 1 || opValidityDays > 365)) {
        return next(new errorHandler("OP validity days must be between 1 and 365", 400));
    }

    // Update fields
    const updateData = {};
    if (opDays) updateData.opDays = opDays;
    if (opHours) updateData.opHours = opHours;
    if (avgConsultationTime) updateData.avgConsultationTime = avgConsultationTime;
    if (consultationFee !== undefined) updateData.consultationFee = consultationFee;
    if (opValidityDays) updateData.opValidityDays = opValidityDays;
    if (phone) updateData.phone = phone.replace(/\s/g, "");

    const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.user._id, 
        updateData, 
        { new: true, runValidators: true }
    ).select('-password').populate('hospitalId', 'name address phone email');

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        responseData: updatedDoctor
    });
});

export const changePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return next(new errorHandler("Current password and new password are required", 400));
    }

    if (newPassword.length < 6) {
        return next(new errorHandler("New password must be at least 6 characters", 400));
    }

    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
        return next(new errorHandler("Doctor not found", 404));
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, doctor.password);
    if (!isValidPassword) {
        return next(new errorHandler("Current password is incorrect", 400));
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await Doctor.findByIdAndUpdate(req.user._id, { password: hashedNewPassword });

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});