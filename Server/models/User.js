const mongoose = require("mongoose");
const validator = require("validator");

const EnrolledCourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "courseType",
    },
    courseType: {
        type: String,
        required: true,
        enum: ["Course1", "Course2", "Course3"],
    },
    enrolledAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        parentPhoneNumber: { type: String, required: true },
        AcademicStage: {
            type: String,
            enum: ["first", "second", "third"],
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "instructor", "student"],
            default: "student",
        },
        balance: { type: Number, default: 0 },

        enrolledCourses: [EnrolledCourseSchema],

        activeSession: { type: String, default: null }, // Stores the JWT token for active session
        lastUserAgent: { type: String, default: null }, // Stores User-Agent for session tracking
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
