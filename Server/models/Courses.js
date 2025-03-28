const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title: { type: String },
    videoUrl: { type: String },
    public_id: String,
});

const CourseSchema = new mongoose.Schema({
    title: { type: String },
    pricing: { type: Number, default: 0 },
    isFree: { type: Boolean, default: true },
    image: { type: String },
    Lectures: [LectureSchema],
});

const Course1 = mongoose.model("Course1", CourseSchema);
const Course2 = mongoose.model("Course2", CourseSchema);
const Course3 = mongoose.model("Course3", CourseSchema);

module.exports = { Course1, Course2, Course3 };
