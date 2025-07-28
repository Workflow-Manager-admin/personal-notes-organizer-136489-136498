const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: myuser
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: User already exists or invalid data
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', userController.login);

module.exports = router;
