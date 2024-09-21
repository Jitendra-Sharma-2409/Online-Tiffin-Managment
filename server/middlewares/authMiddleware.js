const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers['token']; // Change from 'authorization' to 'x-auth-token'

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = authMiddleware;

