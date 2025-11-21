import Class from "../models/Class.js";

export const AddClass = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, error: true, message: "Class name is required" });
        }

        const exist = await Class.findOne({ name });
        if (exist) {
            return res.status(400).json({ success: false, error: true, message: "This class already exists" });
        }

        const newClass = new Class({ name });
        await newClass.save();

        res.status(201).json({ success: true, error: false, message: "Class added successfully", data: newClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const GetClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, error: true, message: "Class ID is required" });
        }

        const classData = await Class.findById(id)
            .populate("subjects")
            .populate("students")
            .populate("teachers");

        if (!classData) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        res.status(200).json({ success: true, data: classData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const GetAllClasses = async (req, res) => {
    try {
        const allClasses = await Class.find({})
            .populate("subjects")
            .populate("students")
            .populate("teachers");

        if (!allClasses || allClasses.length === 0) {
            return res.status(404).json({ success: false, message: "There are no classes yet" });
        }

        res.status(200).json({ success: true, data: allClasses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ////////////////////////////////////////////////////////////////////////////