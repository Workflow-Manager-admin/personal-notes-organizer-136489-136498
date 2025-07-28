const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/auth');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret!change_this_in_production';

// PUBLIC_INTERFACE
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      const user = findUserById(payload.id);
      if (!user) throw new Error();
      req.user = { id: user.id, username: user.username };
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
  return res.status(401).json({ error: 'Authorization required' });
}

module.exports = {
  authenticateJWT,
};
