import jwt from "jsonwebtoken";
import { genAccessToken } from "../utils/tokens.js";

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const permitAccessList = [
    {
        method: "POST",
        path: "/api/v1/user/*",
    },
];

const permitAccessEndPoints = async (req) => {
    return permitAccessList.some((i) => {
        const methodMatch =
            i.method.toLowerCase() === "all" ||
            i.method.toLowerCase() === req.method.toLowerCase();

        const regexPath = new RegExp("^" + i.path.replace(/\*/g, ".*") + "$");
        const pathMatch = regexPath.test(req.path);

        return methodMatch && pathMatch;
    });
};

const authentication = async (req, res, next) => {
    try {
        if (await permitAccessEndPoints(req)) {
            return next();
        }

        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : "";

        if (!token) {
            return res.status(401).json({ message: "unauthorized access" });
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
                        .json({ message: "refresh token not found in cookies" });
                }

                try {
                    const refreshPayload = jwt.verify(refreshToken, refreshSecret);

                    const newAccessToken = await genAccessToken(refreshPayload);
                    req.user = refreshPayload;

                    req.headers.authorization = `Bearer ${newAccessToken}`;

                    return next();
                } catch (refreshErr) {
                    return res
                        .status(401)
                        .json({ message: "unauthorized, invalid refresh token" });
                }
            }
            return res.status(401).json({ message: "unauthorized, invalid token" });
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "unauthorized access" });
    }
};

export { authentication };

