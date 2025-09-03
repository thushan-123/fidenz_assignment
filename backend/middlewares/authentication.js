import jwt from 'jsonwebtoken';

// [ 'method': 'end point' ]
// [ {'post' : 'api/v1/login'}, {} , {} ]

const permitAccessEndPoints = async (permitAccessList) => {

}

const authentication = async (req, res, next) => {
    const header = req.headers.authorization || '';

    const token = header.startsWith('Bearer ') ? header.slice(7) : '';

    if (!token) {
        if (permitAccessEndPoints){
            next();
        }
        res.status(401).json({
            message: 'unauthorized access',
        })
    }
}