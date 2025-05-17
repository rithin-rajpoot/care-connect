import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";

export const registerPatient = asyncHandler(async (req, res, next) => {

    let { fullName, username, email, password, DOB, gender, address, phone } = req.body;
    if (!fullName || !username || !email || !phone || !password) {
        return next(new errorHandler("Required fields cannot be empty", 400));
    }
    const patient = await Patient.findOne({ email });
    if (patient) {
        return next(new errorHandler("User already exists with this email", 400));
    }

    let patientData = {
        fullName,
        username,
        email,
        password,
        DOB,
        gender,
        address,
        phone,
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    patientData.password = hashedPassword;
    const newPatient = new Patient(patientData);
    newPatient.save();

    // Generate and send JWT
    const tokenData = {
        _id: newPatient?._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            //   secure: true,
            sameSite: "none",
        })
        .json({
            success: true,
            responseData: {
                newPatient,
                token
            },
        });
});


export const patientLogin = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorHandler("Your password or username is empty", 400))
        }

        const patient = await Patient.findOne({ email });
        if (!patient) {
            return next(new errorHandler("Your password or username is Invalid!", 400))
        }

        const isValidPassword = await bcrypt.compare(password, patient.password);
        if (!isValidPassword) {
            return next(new errorHandler("Your password or username is Invalid!", 400))
        }

        // Generate and send JWT
        const tokenData = {
            _id: patient?._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                // secure: true,
                sameSite: 'none'
            })
            .json({
                success: true,
                message: "Login successful",
                responseData: {
                    patient,
                    token
                }
            })
    }
)

export const getPatientProfile = asyncHandler(async (req, res, next) => {
    const patientData = await Patient.findById(req.user._id);
    res.status(200).json({
        success: true,
        responseData: patientData
    });
})
