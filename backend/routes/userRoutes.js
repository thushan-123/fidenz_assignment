import Router from "express";
import {createUser, userLogin, callBack, logOut} from "../controllers/auth.js";
import user from "../models/user.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.post("/callBack", callBack);
router.get("/logout", user);

export default router;