import jwt from 'jsonwebtoken';


// [ 'method': 'end point' ]
// [ {'post' : 'api/v1/login'}, {} , {} ]

const jwtSecret = process.env.JWT_SECRET;

const permitAccessEndPoints = async (permitAccessList) => {

}

const authentication = async (req, res, next) => {
    try {

        const header = req.headers.authorization || '';

        const token = header.startsWith('Bearer ') ? header.slice(7) : '';

        if (!token) {
            res.status(401).json({
                message: 'unauthorized access',
            })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload) {
            req.user = payload;
            next();
        }else {
            res.status(401).json({
                message: 'unauthorized access',
            })
        }
    }catch(e) {
        console.log(e.message)
    }
}