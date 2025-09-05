import jwt from 'jsonwebtoken';

import {genAccessToken} from "../utils/tokens.js";
// [ 'method': X , 'end point' : x]
// [ {method :'post' , path : 'api/v1/login'}, {} , {} ]

const jwtSecret = process.env.JWT_SECRET;

const permitAccessList = [
    {
        method: "POST",
        path: "/auth/login"
    },
    {
        method: "POST",
        path: "/auth/register"
    }
]



const permitAccessEndPoints = async (req) => {
    return permitAccessList.some((i) => {
        const methodMatch =
            i.method.toLowerCase() === "all" ||
            i.method.toLowerCase() === req.method.toLowerCase();

        const regexPath = new RegExp(
            "^" + i.path.replace(/\*/g, ".*") + "$"
        );

        const pathMatch = regexPath.test(req.path);

        return methodMatch && pathMatch;
    });
};

const authentication = async (req, res, next) => {
    try {

        if (await permitAccessEndPoints(req)){
            return next();
        }

        const header = req.headers.authorization || '';

        const token = header.startsWith('Bearer ') ? header.slice(7) : '';

        if (!token) {
            res.status(401).json({
                message: 'unauthorized access',
            })
        }
        console.log("token", token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload) {
            console.log("payload", payload);
            req.user = payload;
            return next();
        }else {
            const refreshHeader = req.headers.refresh || '';
            const refreshToken = refreshHeader.startsWith('refresh ') ? refreshHeader.slice(7) : '';
            if (refreshToken) {
                const validRefreshToken = jwt.verify(token, process.env.JWT_SECRET);
                if (validRefreshToken) {
                    const payload = jwt.decode(token).payload;
                    req.headers.authorization = `Bearer ${await genAccessToken(payload)}`;
                    return next();
                }
                res.status(401).json({
                    message: 'unauthorized access',
                })
            }
            res.status(401).json({
                message: 'unauthorized access',
            })
        }
    }catch(e) {
        console.log(e.message);
        res.status(500).json({
            "message": "unauthorized access"
        })
    }
}

export {authentication}