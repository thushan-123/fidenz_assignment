import express from "express";
import passport from "passport";
import User from "../models/user.js";
import { genAccessToken } from "../utils/tokens.js";

const router = express.Router();


router.get("/login", async (req, res) => {

})