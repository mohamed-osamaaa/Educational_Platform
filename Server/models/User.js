const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    parentPhoneNumber: {
        type: String,
        required: true,
    },
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
    activeSession: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model("User", UserSchema);
