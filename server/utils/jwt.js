import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h', // Token expires in 1 hour
            jwtid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // Unique ID for the token
        }
    );
};