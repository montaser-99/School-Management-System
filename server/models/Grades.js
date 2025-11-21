import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  subject: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Subject", 
    required: true 
  },
  class: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Class", 
    required: true 
  },
  score: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  type: { 
    type: String, 
    enum: ["Exam", "Quiz", "Assignment", "Project"], 
    required: true 
  },
  note: { 
    type: String // ملاحظات إضافية لو فيه
  }
}, { timestamps: true });

export default mongoose.model("Grade", gradeSchema);
