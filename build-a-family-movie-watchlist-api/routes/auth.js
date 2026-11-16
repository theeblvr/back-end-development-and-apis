import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../data/users.json" with { type: "json" };

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required",
        });
    }

    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(401).json({
            error: "Invalid credentials",
        });
    }

    const validPassword = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!validPassword) {
        return res.status(401).json({
            error: "Invalid credentials",
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
            username: user.username,
        },
        process.env.JWT_SECRET,
    );

    return res.status(200).json({
    token,
  });
  
});

export default router;