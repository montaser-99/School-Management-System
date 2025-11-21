import mongoose from "mongoose"

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    attendance: [
        {
            date: { type: Date, required: true },
            records: [
                {
                    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                    status: { type: String, enum: ["Present", "Absent", "Late"], required: true }
                }
            ]
        }
    ]

}, { timestamps: true })
const Class = mongoose.model("Class", classSchema)

export default Class