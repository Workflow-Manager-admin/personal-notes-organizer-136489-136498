const {
  registerUser,
  loginUser,
  generateToken,
} = require('../services/auth');

// PUBLIC_INTERFACE
async function register(req, res) {
  /**
   * Register a new user.
   * Request body: { username, password }
   * Response: 201 Created with { id, username }
   */
  try {
    const { username, password } = req.body;
    const user = registerUser({ username, password });
    return res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// PUBLIC_INTERFACE
async function login(req, res) {
  /**
   * Login a user.
   * Request body: { username, password }
   * Response: 200 OK with { token }
   */
  try {
    const { username, password } = req.body;
    const user = loginUser({ username, password });
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
};
