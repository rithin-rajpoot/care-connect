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