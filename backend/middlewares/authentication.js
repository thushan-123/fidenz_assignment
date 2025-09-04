import jwt from 'jsonwebtoken';


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
    return permitAccessList.some((i) =>
        i.method.toLowerCase() === req.method.toLowerCase() && i.path === req.path
    );

}

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