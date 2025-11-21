import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";


export const AddTeacher = async (req, res) => {
    try {
        const { name, email, password, subjects, class: classId } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email and password are required" });
        }


        const existingUser = await User.checkEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        const newTeacher = new User({
            name,
            email,
            password,
            role: "Teacher",
            subjects: subjects || [],
            class: classId || []
        });
        await newTeacher.save()

        res.status(201).json({ success: true, data: newTeacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const AddStudent = async (req, res) => {
    try {
        const { name, email, password, class: classId } = req.body;

        if (!name || !email || !password || !classId) {
            return res.status(400).json({ success: false, message: "Name, email, password and class are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const newStudent = await User.create({
            name,
            email,
            password,
            role: "Student",
            class: classId
        });
        await newStudent.save()

        res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// /
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.checkEmail(email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or Password incorrect"
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: "Email or Password incorrect"
            });
        }
        const safeUser = user.toObject();
        delete safeUser.password;
        const token = generateAccessToken(user)
        const cookieOption = {
            httpOnly: true,
            secure: false,
            sameSite: "Lax"
        };
        res.cookie("Access_Token", token, {
            ...cookieOption, maxAge: 60 * 60 * 1000

        });


        res.status(200).json({
            error: false,
            success: true,
            user: safeUser,
            message: "Login Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        });
    }
};
// ///////////////////////////////
export const Logout = async (req, res) => {
    const id = req.user._id
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user not found"
        });
    }
    const cookieOption = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax"
    };
    res.clearCookie("Access_Token", cookieOption);
    return res.status(200).json({
        success: true,
        message: "Logout Successfully"
    });
}
// //////////////////////////////////////////////////