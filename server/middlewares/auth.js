import User from "../models/User.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req?.cookies?.Access_Token;
        if (!token) {
            return res.status(401).json({ error: true, success: false, message: "No token provided" });
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(404).json({ error: true, success: false, message: "Please authenticate" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: true, success: false, message: "Invalid or expired token" });
    }
};

export default auth;
