const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route (fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/protected"));

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("DB Error:", err);
    });