const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not found or invalid format' });
    }

    const token = authHeader.split(' ')[1];
    if(!token )return res.status(401).json({error:'Token not found'});
        
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
