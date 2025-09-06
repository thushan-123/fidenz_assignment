import Router from "express";
import {createUser, userLogin} from "../controllers/auth.js";

const router = Router();

// JWT
router.post("/register", createUser);
router.post("/login", userLogin);


export default router;
