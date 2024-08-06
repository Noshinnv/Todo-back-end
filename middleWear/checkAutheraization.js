import Jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";

const checkAutherization = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        // console.log(token)

        if (!token)
            return res
                .status(400)
                .json({ success: false, message: "You are  not logged in" });
        const dcryptedData = Jwt.verify(token, process.env.JWT_SECRET);

        req.userId = dcryptedData.userId;
        next();
    } catch (error) {
        console.log(error);
    }
};
export default checkAutherization;


export const checkAdminAutherization = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res
                .status(400)
                .json({ success: false, message: "You are  not logged in" });
        const { userId } = Jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(userId);
        if (!user.isAdmin)
            return res.status(403).json({ success: false, message: "Forbidden: user is not admin" });
        req.userId = userId
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

