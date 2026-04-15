const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/protected"));

// ✅ IMPORT USER MODEL
const User = require("./models/User");

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(async() => {
        console.log("MongoDB Connected");

        // 🔥 AUTO CREATE ADMIN USER
        const existingUser = await User.findOne({ email: "admin@test.com" });

        if (!existingUser) {
            await User.create({
                email: "admin@test.com",
                password: "123456",
                role: "admin",
            });

            console.log("✅ Test Admin Created");
        } else {
            console.log("⚡ Admin already exists");
        }

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("DB Error:", err);
    });