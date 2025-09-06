import {genAccessToken, generateRefreshToken} from "../utils/tokens.js";
import User from "../models/user.js";
import {z} from 'zod'
import passport from "passport";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const userLogin = async (req, res) => {

    const filterData = loginSchema.safeParse(req.body);
    if (!filterData.success) {
        return res.status(400).json({
            "message": filterData.error
        })
    }
    const user = await User.findOne({email :filterData.data.email}).select("+password");

    if (!user) {
        return res.status(404).json({
            "message": "User not found"
        })
    }
    console.log(user)
    const payload = {
        "id" : user._id,
        "first_name": user.first_name,
        "user_name": user.last_name,
        "email": user.email
    }

    const token = await genAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    // console.log(token)
    // console.log(refreshToken)
    res.status(200).json({
        "message": "logging successfully",
        "token": token,
        // "refreshToken": refreshToken,
        "data": {
            "user" : {
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            }
        }
    })
}

const userCreateSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string()
})

const createUser = async (req, res) => {
    const filterData = userCreateSchema.safeParse(req.body);
    if (!filterData.success) {
        return res.status(400).json({
            "message": filterData.error
        })
    }
    const user = await User.create(filterData.data);
    if (!user) {
        return res.status(400).json({
            "message": "User not found"
        })
    }

    res.status(201).json({
        "message": "User created successfully",
        "data": {
            "user" : {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email" : user.email,
            }
        }
    })
}

const auth0Schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    auth_id: z.string()
})

const createAuth0User = async (req, res) => {
    const filData = auth0Schema.safeParse(req.body);

    const user = await User.create(filData.data);
    if (!user) {
        return res.status(400).json({
            "message": "User not found"
        })
    }

    res.status(201).json({
        "message": "User created successfully",
        "data": {
            "user" : {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email" : user.email,
            }
        }
    })
}

// const login = passport.authenticate("auth0", {
//     scope: "openid email profile",
// });
//
// const callback =  async (req, res, next) => {
//     try {
//         const { email, name, sub } = req.user; // Auth0 user info
//         let user = await User.findOne({ email });
//
//         if (!user) {
//             // create new user for Auth0 login
//             user = new User({
//                 email,
//                 name,
//                 auth0Id: sub, // store Auth0 ID
//             });
//             await user.save();
//         }
//
//         // login the user, create session or JWT
//         req.session.userId = user._id;
//         res.redirect('/home');
//     } catch (err) {
//         next(err);
//     }
// };
//
//
//
// const logOut = (req, res) => {
//     req.logout(() => {
//         res.redirect(
//             `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=http://localhost:5173`
//         );
//     });
// };

export {userLogin, createUser}

// const callBack = [
//     passport.authenticate("auth0", {
//         failureRedirect: "/login",
//     }),
//     async (req, res) => {
//         try {
//             // Check user exists in DB
//             let user = await User.findOne({ email: req.user.emails[0].value });
//
//             //create user using  createAuth0User
//             if (!user) {
//                 const newUserData = {
//                     first_name: req.user.name.givenName || "",
//                     last_name: req.user.name.familyName || "",
//                     email: req.user.emails[0].value,
//                     auth_id: req.user.id,
//                 };
//
//                 const filData = auth0Schema.safeParse(newUserData);
//                 if (!filData.success) {
//                     return res.status(400).json({ message: filData.error });
//                 }
//
//                 user = await User.create(filData.data);
//             }
//             const payload = {
//                 id: user._id,
//                 first_name: user.first_name,
//                 last_name: user.last_name,
//                 email: user.email,
//             };
//
//             const token = genAccessToken(payload);
//
//             res.status(200).json({
//                 message: "Logged in with Auth0 successfully",
//                 token,
//                 data: { user: payload },
//             });
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ message: "Auth0 login failed" });
//         }
//     },
// ];