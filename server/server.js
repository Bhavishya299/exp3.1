// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/protected"));

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/authDB")
    .then(() => {
        console.log("MongoDB Connected");
        createTestUser(); // 👈 Create user after DB connects
    })
    .catch((err) => console.log(err));

// 🔹 Create Test User (RUNS ONLY ONCE)
const createTestUser = async() => {
    try {
        const existingUser = await User.findOne({ email: "admin@test.com" });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("123456", 10);

            await User.create({
                email: "admin@test.com",
                password: hashedPassword,
                role: "admin",
            });

            console.log("✅ Test Admin Created");
        } else {
            console.log("⚡ Test Admin Already Exists");
        }
    } catch (error) {
        console.log("Error creating test user:", error);
    }
};

// Start Server
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});