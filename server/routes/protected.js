// routes/protected.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { checkRole } = require("../middleware/role");

router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get("/user", verifyToken, (req, res) => {
    res.json({ message: "Welcome User" });
});

module.exports = router;