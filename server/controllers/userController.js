import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const AddTeacher = async (req, res) => {
    try {
        const { name, email, password, subjects, class: classId } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email and password are required" });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        const newTeacher = new User({
            name,
            email,
            password,
            role: "Teacher",
            subjects: subjects || [],
            class: classId || null
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
            password: hashedPassword,
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

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })

    }
}