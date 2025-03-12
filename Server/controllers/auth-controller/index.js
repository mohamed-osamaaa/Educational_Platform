const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const registerUser = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        parentPhoneNumber,
        AcademicStage,
        role,
    } = req.body;
    if (!name || !email || !password || !phoneNumber || !AcademicStage) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format!",
        });
    }
    if (
        !validator.isStrongPassword(password, {
            minLength: 8,
            minNumbers: 1,
            minLowercase: 1,
        })
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Password must be at least 8 characters long and include at least one number and one letter!",
        });
    }
    if (!validator.isMobilePhone(phoneNumber, "any")) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number format!",
        });
    }

    if (
        parentPhoneNumber &&
        !validator.isMobilePhone(parentPhoneNumber, "any")
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid parent phone number format!",
        });
    }
    if (phoneNumber === parentPhoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Parent phone number cannot be the same as phone number!",
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists!",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phoneNumber,
            parentPhoneNumber,
            AcademicStage,
            role,
            password: hashPassword,
            activeSession: null,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userAgent = req.headers["user-agent"];

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required!",
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format!",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        if (user.activeSession && user.lastUserAgent !== userAgent) {
            return res.status(403).json({
                success: false,
                message:
                    "Your account is already in use on another device. Please log out first.",
            });
        }

        const accessToken = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        user.activeSession = accessToken;
        user.lastUserAgent = userAgent;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            data: {
                accessToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.user._id;

        await User.findByIdAndUpdate(userId, { activeSession: null });

        res.status(200).json({
            success: true,
            message: "Logged out successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser };
