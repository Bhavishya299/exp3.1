router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    // 🔥 SIMPLE PASSWORD CHECK (NO BCRYPT)
    if (user.password !== password) {
        return res.status(400).json({ msg: "Invalid password" });
    }

    // generate token
    const token = jwt.sign({ id: user._id, role: user.role },
        process.env.JWT_SECRET || "secretkey"
    );

    res.json({
        token,
        role: user.role,
    });
});