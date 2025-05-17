import { asyncHandler } from "../utils/asyncHandler.util.js";

export const userLogout = asyncHandler(
    async (req, res, next) => {

        res.status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .json({
                success: true,
                message: "User logged out"
            });
    }
);