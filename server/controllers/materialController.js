import Material from "../models/Material.js"

// إضافة مادة جديدة
export const AddMaterial = async (req, res) => {
    try {
        const { subject, title, type, dueDate } = req.body;
        if (!subject || !title || !type) {
            return res.status(400).json({ success: false, message: "Subject, title and type are required" });
        }

        if (!req.file || !req.file.path) {
            return res.status(400).json({ success: false, message: "File is required" });
        }

        const newMaterial = new Material({
            subject,
            title,
            type,
            fileUrl: req.file.path, // CloudinaryStorage بيرجع path كرابط مباشر
            dueDate: dueDate || null
        });

        await newMaterial.save();

        res.status(201).json({ success: true, data: newMaterial, message: "Material added successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// جلب كل المواد لمادة معينة
export const GetMaterialBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const materials = await Material.find({ subject: subjectId });
        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// حذف مادة
export const DeleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Material.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Material not found" });
        }
        res.status(200).json({ success: true, message: "Material deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
