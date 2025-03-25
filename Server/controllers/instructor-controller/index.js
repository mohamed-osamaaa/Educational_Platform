const { uploadMediaToCloudinary } = require("../../helpers/cloudinary");
const { Course1, Course2, Course3 } = require("../../models/Courses");

const getCourseModel = (courseType) => {
    switch (courseType) {
        case "first":
            return Course1;
        case "second":
            return Course2;
        case "third":
            return Course3;
        default:
            return null;
    }
};

const addNewCourse = async (req, res) => {
    try {
        const { title, pricing, isFree, Lectures, courseType } = req.body;
        if (!title || !req.file || !courseType) {
            return res.status(400).json({
                success: false,
                message: "Title, image file, and courseType are required!",
            });
        }
        const result = await uploadMediaToCloudinary(req.file.path);

        const CourseModel = getCourseModel(courseType);
        if (!CourseModel) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid course type! Must be 'first', 'second', or 'third'.",
            });
        }

        const newCourse = new CourseModel({
            title,
            pricing,
            isFree,
            image: result.secure_url,
            Lectures,
        });
        const savedCourse = await newCourse.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully!",
            data: savedCourse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating course!",
            error: error.message,
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const { courseType } = req.query;
        const CourseModel = getCourseModel(courseType);

        if (!CourseModel) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid course type! Use 'first', 'second', or 'third'.",
            });
        }

        const courses = await CourseModel.find({});
        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching courses!",
            error: error.message,
        });
    }
};

const getCourseDetailsByID = async (req, res) => {
    try {
        const { id, courseType } = req.params;
        const CourseModel = getCourseModel(courseType);

        if (!CourseModel) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid course type! Use 'first', 'second', or 'third'.",
            });
        }

        const course = await CourseModel.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching course details!",
            error: error.message,
        });
    }
};

const updateCourseByID = async (req, res) => {
    try {
        const { id, courseType } = req.params;
        const updateData = req.body;

        const CourseModel = getCourseModel(courseType);
        if (!CourseModel) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid course type! Use 'first', 'second', or 'third'.",
            });
        }

        const updatedCourse = await CourseModel.findByIdAndUpdate(
            id,
            updateData,
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
            message: "Course updated successfully!",
            data: updatedCourse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating course!",
            error: error.message,
        });
    }
};

module.exports = {
    addNewCourse,
    getAllCourses,
    getCourseDetailsByID,
    updateCourseByID,
};
