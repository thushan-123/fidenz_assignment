import express from "express";
import passport from "passport";
import User from "../models/user.js";
import { genAccessToken } from "../utils/tokens.js";

const router = express.Router();

router.get(
    "/login",
    passport.authenticate("auth0", {
        scope: "openid email profile",
    })
);

router.get(
    "/callback",
    passport.authenticate("auth0", {
        failureRedirect: process.env.FRONTEND_URL + "/login" || "http://localhost:5173/login",
        session: false
    }),
    async (req, res) => {
        try {

            const accessToken = await genAccessToken({
                id: req.user._id,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: req.user.last_name
            });

            res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/home?token=${accessToken}`);
        } catch (err) {
            console.error("Auth0 callback error:", err);
            res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=auth_failed`);
        }
    }
);


router.get("/user", async (req, res) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.slice(7);


        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        });
    } catch (error) {
        console.error("Error getting user info:", error);
        res.status(401).json({ message: "Invalid token" });
    }
});

router.get("/logout", (req, res) => {
    res.redirect(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(process.env.FRONTEND_URL || "http://localhost:5173")}`
    );
});

export default router;

