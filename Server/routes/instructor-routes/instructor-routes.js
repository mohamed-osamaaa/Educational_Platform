const express = require("express");
const {
    addNewCourse,
    updateCourseByID,
} = require("../../controllers/instructor-controller/index");

const router = express.Router();

const validateCourseType = (req, res, next) => {
    const { courseType } = req.params;
    if (!["1", "2", "3"].includes(courseType)) {
        return res.status(400).json({
            success: false,
            message: "Invalid course type!",
        });
    }
    next();
};

router.put("/:courseType/:id", validateCourseType, updateCourseByID);
router.post("/add/:courseType", validateCourseType, addNewCourse);

module.exports = router;
