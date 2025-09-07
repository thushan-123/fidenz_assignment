import express from "express";
import User from "../models/user.js";
import { genAccessToken } from "../utils/tokens.js";
import jwt from "jsonwebtoken";
import axios from "axios";

const router = express.Router();

const AUTH0_DOMAIN= process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL;
const AUTH0_SCOPE = "openid profile email";
const AUTH0_RESPONSE_TYPE = "code"
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

router.get("/login", async (req, res) => {
    const redir_url =
        `https://${AUTH0_DOMAIN}/authorize?` +
        `response_type=${encodeURIComponent(AUTH0_RESPONSE_TYPE)}` +
        `&client_id=${encodeURIComponent(AUTH0_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(AUTH0_CALLBACK_URL)}` +
        `&scope=${encodeURIComponent(AUTH0_SCOPE)}` +
        `&state=${encodeURIComponent("xyz123")}`;

    res.redirect(redir_url);
});


router.get("/callback", async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
            grant_type: "authorization_code",
            client_id: AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            code: code,
            redirect_uri: AUTH0_CALLBACK_URL,
        }, {
            headers: { "Content-Type": "application/json" }
        });

        const { id_token, access_token } = tokenResponse.data;


        const decoded = jwt.decode(id_token);

        console.log("Decoded JWT:", decoded);

        const userResponse = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const user = userResponse.data;

        console.log("User Info:");
        console.log("First Name:", user.given_name || decoded.given_name);
        console.log("Last Name:", user.family_name || decoded.family_name);
        console.log("Email:", user.email);
        console.log("Mobile:", user.phone_number);

        let user_ = await User.findOne({"email": user.email});
        if (!user_) {
            user_ = await User.create({
                firstName: user.given_name,
                lastName: user.family_name,
                email: user.email,
                }
            )
        }

        const data = {
            firstName: user_.given_name,
            lastName: user_.family_name,
            email: user_.email,

        }

        const token = await genAccessToken(data)
        const url =  `http://localhost:5173/redir?token=${token}`

        res.redirect(url);

    } catch (err) {
        console.error("Auth0 Callback Error:", err.message);
        res.status(500).json({ error: "Authentication failed" });
    }
});


router.post("/logout", async (req, res) => {

})

export default router;