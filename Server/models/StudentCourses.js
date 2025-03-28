const mongoose = require("mongoose");

const StudentCoursesSchema = new mongoose.Schema({
    userId: String,
    courses: [
        {
            courseId: String,
            title: String,
        },
    ],
});

module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);
