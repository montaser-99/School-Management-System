import mongoose from "mongoose"
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) { if (!isEmail(val)) { throw new Error("Email is invalid") } }

    },
    password: {
        type: String,
        required: true,
        minlength: [8, "password should be 8 characters at least"],
        validate(val) {
            const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            if (!password.test(val)) { throw new Error("password should be capital,small ,numbers and special characters") }

        }
    },
    role: {

        type: String,
        enum: ["Admin", "Teacher", "Student"],
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    subjects:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject"
            }
        ],
    grades:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Grades"
        }]

    ,
    attendance: [
        {
            date: { type: Date, required: true },
            status: { type: String, enum: ["Present", "Absent", "Late"], required: true }
        }
    ]

}, { timestamps: true })



userSchema.pre("save", async function () {
    const user = this
    if (!this.isModified("password")) return;
    const hashedPassword = await bcrypt.hash(this.password, 8);
    this.password = hashedPassword;
});

const User=mongoose.model("User",userSchema)


export default User