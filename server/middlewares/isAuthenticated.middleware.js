import jwt from 'jsonwebtoken';
import  { asyncHandler }  from '../utils/asyncHandler.util.js';
import { errorHandler }  from '../utils/errorHandler.util.js';

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];/* || req.query.token*/ // we have sent the token in cookie while login and signup
    if (!token) {
        return next(new errorHandler("Token not found. Please log in!", 401)); // if the user is not logged in or token has expired
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET); // returns the token data set during login or signup
    req.user = tokenData;
    next();

})

export default isAuthenticated;



// import Patient from '../models/patient.model.js';
// import Doctor from '../models/doctor.model.js';

// // General authentication middleware
// export const isAuthenticated = asyncHandler(async (req, res, next) => {
//     let token;

//     // Get token from cookie or Authorization header
//     if (req.cookies?.token) {
//         token = req.cookies.token;
//     } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return next(new errorHandler('Access denied. No token provided.', 401));
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Find user based on role or try both models
//         let user = null;
        
//         if (decoded.role === 'doctor') {
//             user = await Doctor.findById(decoded._id).select('-password');
//         } else if (decoded.role === 'patient') {
//             user = await Patient.findById(decoded._id).select('-password');
//         } else {
//             // If no role specified, try both (for backward compatibility)
//             user = await Patient.findById(decoded._id).select('-password') || 
//                    await Doctor.findById(decoded._id).select('-password');
//         }

//         if (!user) {
//             return next(new errorHandler('Token is valid but user not found', 401));
//         }

//         req.user = user;
//         req.userRole = decoded.role || (user.role || 'patient');
//         next();
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError') {
//             return next(new errorHandler('Invalid token', 401));
//         } else if (error.name === 'TokenExpiredError') {
//             return next(new errorHandler('Token expired', 401));
//         }
//         return next(new errorHandler('Token verification failed', 401));
//     }
// });

// // Admin authentication middleware
// export const isAdmin = asyncHandler(async (req, res, next) => {
//     // Assuming you have an Admin model or admin role in User model
//     if (!req.user) {
//         return next(new errorHandler('Authentication required', 401));
//     }

//     // Check if user is admin (adjust based on your admin model structure)
//     if (req.userRole !== 'admin' && req.user.role !== 'admin') {
//         return next(new errorHandler('Access denied. Admin privileges required.', 403));
//     }

//     next();
// });

// // Doctor authentication middleware
// export const isDoctor = asyncHandler(async (req, res, next) => {
//     if (!req.user) {
//         return next(new errorHandler('Authentication required', 401));
//     }

//     if (req.userRole !== 'doctor' && req.user.role !== 'doctor') {
//         return next(new errorHandler('Access denied. Doctor privileges required.', 403));
//     }

//     next();
// });

// // Patient authentication middleware
// export const isPatient = asyncHandler(async (req, res, next) => {
//     if (!req.user) {
//         return next(new errorHandler('Authentication required', 401));
//     }

//     if (req.userRole !== 'patient' && req.user.role !== 'patient') {
//         return next(new errorHandler('Access denied. Patient privileges required.', 403));
//     }

//     next();
// });

// // Multiple role authorization
// export const authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!req.user) {
//             return next(new errorHandler('Authentication required', 401));
//         }

//         const userRole = req.userRole || req.user.role;
//         if (!roles.includes(userRole)) {
//             return next(new errorHandler(`Access denied. Required roles: ${roles.join(', ')}`, 403));
//         }

//         next();
//     };
// };