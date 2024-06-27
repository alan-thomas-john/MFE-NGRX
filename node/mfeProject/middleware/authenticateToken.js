// middleware/authenticateToken.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
function verifyToken(req, res, next) {

    //const token = req.headers.authorization;
    //    const token = req.headers.authorization?.split(' ')[1];
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token part

    console.log((token));

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {

        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: ' authentication:Invalid token', err });
        }

        req.user = decoded.response;
        next();
    });
}


// function verifyToken(req, res, next) {
//     const token = req.headers.authorization;
//     // const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Authorization token is required' });
//     }

//     jwt.verify(token, config.secretKey, (err, decoded) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: 'Token expired' });
//             }
//             console.error('JWT Verification Error:', err);
//             return res.status(401).json({ message: 'Invalid token', error: err.message });
//         }

//         // Decoded payload should contain user information
//         req.user = decoded;

//         // Proceed to the next middleware or route handler
//         next();
//     });
// }





module.exports = { verifyToken }



