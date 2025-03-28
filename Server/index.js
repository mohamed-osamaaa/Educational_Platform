require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const instructorRoutes = require("./routes/instructor-routes/instructor-routes");
const mediaRoutes = require("./routes/instructor-routes/media-routes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
// app.options("*", cors()); // Handles preflight requests

app.use(express.json());

// Database connection
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("mongodb is connected"))
    .catch((e) => console.log(e));

// Routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor", instructorRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
