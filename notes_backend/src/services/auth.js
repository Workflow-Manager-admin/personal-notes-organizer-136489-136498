const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername, createUser, findUserById } = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret!change_this_in_production';
const JWT_EXPIRES_IN = '12h';

// PUBLIC_INTERFACE
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// PUBLIC_INTERFACE
function comparePassword(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}

// PUBLIC_INTERFACE
function generateToken(user) {
  // Don't include passwordHash in token
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// PUBLIC_INTERFACE
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// PUBLIC_INTERFACE
function registerUser({ username, password }) {
  if (!username || !password) throw new Error('Missing username or password');
  if (findUserByUsername(username)) throw new Error('User already exists');
  const user = {
    id: 'u_' + Math.random().toString(36).substr(2, 9),
    username,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  createUser(user);
  return user;
}

// PUBLIC_INTERFACE
function loginUser({ username, password }) {
  const user = findUserByUsername(username);
  if (!user) throw new Error('Invalid credentials');
  if (!comparePassword(password, user.passwordHash)) throw new Error('Invalid credentials');
  return user;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  registerUser,
  loginUser,
  findUserById,
};
