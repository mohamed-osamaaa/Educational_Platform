const { Course1, Course2, Course3 } = require("../../models/Courses");

const getCourseModel = (courseType) => {
    switch (courseType) {
        case "1":
            return Course1;
        case "2":
            return Course2;
        case "3":
            return Course3;
        default:
            return null;
    }
};

const addNewCourse = async (req, res) => {
    try {
        const { courseType } = req.params; // Get courseType from URL params
        const courseData = req.body;

        const CourseModel = getCourseModel(courseType);
        if (!CourseModel) {
            return res.status(400).json({
                success: false,
                message: "Invalid course type!",
            });
        }

        const newlyCreatedCourse = new CourseModel(courseData);
        const saveCourse = await newlyCreatedCourse.save();

        res.status(201).json({
            success: true,
            message: "Course saved successfully",
            data: saveCourse,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

const updateCourseByID = async (req, res) => {
    try {
        const { courseType, id } = req.params; // Get courseType and id from URL params
        const updatedCourseData = req.body;

        const CourseModel = getCourseModel(courseType);
        if (!CourseModel) {
            return res.status(400).json({
                success: false,
                message: "Invalid course type!",
            });
        }

        const updatedCourse = await CourseModel.findByIdAndUpdate(
            id,
            updatedCourseData,
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

module.exports = {
    addNewCourse,
    updateCourseByID,
};
