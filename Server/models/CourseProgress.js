const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
    lectureId: String,
    viewed: Boolean,
});

const CourseProgressSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    lecturesProgress: [LectureProgressSchema],
});

const CourseProgress1 = mongoose.model("CourseProgress1", CourseProgressSchema);
const CourseProgress2 = mongoose.model("CourseProgress2", CourseProgressSchema);
const CourseProgress3 = mongoose.model("CourseProgress3", CourseProgressSchema);

module.exports = { CourseProgress1, CourseProgress2, CourseProgress3 };
