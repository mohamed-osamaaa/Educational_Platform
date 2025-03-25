const express = require("express");
const multer = require("multer");
const {
    addNewCourse,
    getAllCourses,
    getCourseDetailsByID,
    updateCourseByID,
} = require("../../controllers/instructor-controller/index");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add", upload.single("image"), addNewCourse);
router.get("/all", getAllCourses);
router.get("/:courseType/:id", getCourseDetailsByID);
router.put("/:courseType/:id", updateCourseByID);

module.exports = router;
