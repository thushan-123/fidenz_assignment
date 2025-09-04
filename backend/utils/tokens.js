import jwt from 'jsonwebtoken';

const genAccessToken = async (payload) => {

    return await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        })
}

const generateRefreshToken = async (payload) => {
    return await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    )
}