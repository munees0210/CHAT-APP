import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1]; // Correctly split by space
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const user = await UserModel.findOne({ _id: decoded.id }).select('-password');
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(401).json({ msg: "Invalid token" });
    }
}

export default verifyUser;
