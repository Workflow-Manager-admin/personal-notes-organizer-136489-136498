const express = require('express');
const notesController = require('../controllers/notes');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes for user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/', authenticateJWT, notesController.listNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note object
 *       404:
 *         description: Note not found
 */
router.get('/:id', authenticateJWT, notesController.getNote);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created note
 *       400:
 *         description: Invalid data
 */
router.post('/', authenticateJWT, notesController.createNewNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated note
 *       404:
 *         description: Note not found
 */
router.put('/:id', authenticateJWT, notesController.updateExistingNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Note not found
 */
router.delete('/:id', authenticateJWT, notesController.deleteExistingNote);

module.exports = router;
