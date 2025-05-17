import Admin from "../models/admin.model.js";
import Hospital from "../models/hospital.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerHospitalAndAdmin = asyncHandler(async (req, res, next) => {

    const { hospitalDetails, adminDetails } = req.body;

    // 1. Create Hospital
    const hospital = new Hospital(hospitalDetails);
    await hospital.save();

    // 2. Create Admin linked to that hospital
    const hashedPassword = await bcrypt.hash(adminDetails.password, 10);

    const newAdmin = new Admin({
        hospitalId: hospital._id,
        fullName: adminDetails.fullName,
        email: adminDetails.email,
        password: hashedPassword,
    });

    await newAdmin.save();

    // Generate and send JWT
    const tokenData = {
        _id: newAdmin?._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({
            success: true,
            message: "Hospital and Admin registered successfully",
            responseData: {
                HospitalDetails: hospital,
                AdminDetails: newAdmin,
                token
            },
        });
});


export const adminLogin = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorHandler("Your password or username is empty", 400))
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return next(new errorHandler("Your password or username is Invalid!", 400))
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return next(new errorHandler("Your password or username is Invalid!", 400))
        }

        // Generate and send JWT
        const tokenData = {
            _id: admin?._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

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
                    admin,
                    token
                }
            })
    }
)

export const getAdminProfile = asyncHandler(async (req, res, next) => {
    const adminData = await Admin.findById(req.user._id);
    res.status(200).json({
        success: true,
        responseData: adminData
    });
})
