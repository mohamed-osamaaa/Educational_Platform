const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "lectureType",
    },
    lectureType: {
        type: String,
        required: true,
        enum: ["Course1", "Course2", "Course3"],
    },
    viewed: { type: Boolean, default: false },
});

const CourseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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
    completed: { type: Boolean, default: false },
    completionDate: { type: Date, default: null },
    lecturesProgress: [LectureProgressSchema],
});

const CourseProgress1 = mongoose.model("CourseProgress1", CourseProgressSchema);
const CourseProgress2 = mongoose.model("CourseProgress2", CourseProgressSchema);
const CourseProgress3 = mongoose.model("CourseProgress3", CourseProgressSchema);

module.exports = { CourseProgress1, CourseProgress2, CourseProgress3 };
