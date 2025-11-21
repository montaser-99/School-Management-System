import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["lecture", "assignment"], required: true },
  fileUrl: { type: String },
  dueDate: { type: Date } 
}, { timestamps: true });

export default mongoose.model("Material", materialSchema);
