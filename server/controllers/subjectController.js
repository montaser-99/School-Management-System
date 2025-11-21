import Subject from "../models/Subject.js";
import User from "../models/User.js";

// إضافة مادة جديدة
export const AddSubject = async (req, res) => {
    try {
        const { name, teachers = [] } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Subject name is required" });
        }

        // تحقق إن المادة مش موجودة بالفعل
        const existingSubject = await Subject.findOne({ name });
        if (existingSubject) {
            return res.status(400).json({ success: false, message: "This subject already exists" });
        }

        // تحقق من صحة الـ teachers ids
        const validTeachers = [];
        for (const id of teachers) {
            const teacher = await User.findById(id);
            if (teacher && teacher.role === "Teacher") validTeachers.push(id);
        }

        const newSubject = new Subject({
            name,
            teachers: validTeachers
        });

        await newSubject.save();

        res.status(201).json({ success: true, data: newSubject });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// جلب كل المواد
export const GetAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate("teachers", "name email");
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// جلب مادة واحدة بالـ id
export const GetSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: "Subject id is required" });

        const subject = await Subject.findById(id).populate("teachers", "name email");
        if (!subject) return res.status(404).json({ success: false, message: "Subject not found" });

        res.status(200).json({ success: true, data: subject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// //////////////////////////////