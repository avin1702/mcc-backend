const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');



exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

exports.loginAdmin = async (req, res) => {
try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
    return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate access token
    const accessToken = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Generate refresh token
    const refreshToken = jwt.sign({ username: admin.username }, process.env.JWT_REFRESH_SECRET);

    res.status(200).json({ accessToken, refreshToken });
} catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ message: 'Failed to login' });
}
}

exports.refreshTokens = async (req, res) => {
try {
    const { refreshToken } = req.body;

    // Verify refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const accessToken = jwt.sign({ username: decoded.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ accessToken });
    });
} catch (error) {
    console.error('Error refreshing tokens:', error);
    res.status(500).json({ message: 'Failed to refresh tokens' });
}
}