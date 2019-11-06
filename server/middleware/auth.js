require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.payload.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;