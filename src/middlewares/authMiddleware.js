const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
//   console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.username = decoded.username;
    next();
  });
};