import jwt from "jsonwebtoken";
import { genAccessToken } from "../utils/tokens.js";

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const permitAccessList = [
    { method: "POST", path: "/user/*" },
    { method: "ALL", path: "/user/auth0/*" },
    { method: "GET", path: "/user/auth0/login" },
    { method: "GET", path: "/user/auth0/callback" },
    { method: "GET", path: "/user/auth0/logout" },
];

const permitAccessEndPoints = (req) => {
    return permitAccessList.some((rule) => {
        const methodMatch =
            rule.method.toLowerCase() === "all" ||
            rule.method.toLowerCase() === req.method.toLowerCase();

        const regexPath = new RegExp("^" + rule.path.replace(/\*/g, ".*") + "$");
        const pathMatch = regexPath.test(req.path);

        return methodMatch && pathMatch;
    });
};

const authentication = async (req, res, next) => {
    try {
        if (permitAccessEndPoints(req)) {
            return next();
        }

        if (typeof req.isAuthenticated === "function" && req.isAuthenticated()) {
            req.user = {
                id: req.user._id,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
            };
            return next();
        }

        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : "";

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access - no token" });
        }

        try {
            const payload = jwt.verify(token, jwtSecret);
            req.user = payload;
            return next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                const refreshToken = req.cookies?.refreshToken;

                if (!refreshToken) {
                    return res
                        .status(401)
                        .json({ message: "Refresh token missing. Please login again." });
                }

                try {
                    const refreshPayload = jwt.verify(refreshToken, refreshSecret);

                    const newAccessToken = await genAccessToken(refreshPayload);

                    res.setHeader("x-access-token", newAccessToken);

                    req.user = refreshPayload;
                    return next();
                } catch (refreshErr) {
                    return res
                        .status(401)
                        .json({ message: "Invalid refresh token. Please login again." });
                }
            }

            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
    } catch (e) {
        console.error("Auth middleware error:", e.message);
        res.status(500).json({ message: "Authentication error" });
    }
};

export { authentication };


