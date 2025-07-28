const {
  getNotesByUser,
  getNoteByIdAndUser,
  createNote,
  updateNote,
  deleteNote,
} = require('../models/note');

// PUBLIC_INTERFACE
async function listNotes(req, res) {
  /**
   * List all notes for the authenticated user.
   */
  const notes = getNotesByUser(req.user.id);
  return res.status(200).json(notes);
}

// PUBLIC_INTERFACE
async function getNote(req, res) {
  /**
   * Get a single note by ID for the authenticated user.
   */
  const noteId = req.params.id;
  const note = getNoteByIdAndUser(noteId, req.user.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  return res.status(200).json(note);
}

// PUBLIC_INTERFACE
async function createNewNote(req, res) {
  /**
   * Create a note for the authenticated user.
   */
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
  const note = {
    id: 'n_' + Math.random().toString(36).substr(2, 9),
    userId: req.user.id,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  createNote(note);
  return res.status(201).json(note);
}

// PUBLIC_INTERFACE
async function updateExistingNote(req, res) {
  /**
   * Update a note for the authenticated user.
   */
  const noteId = req.params.id;
  const { title, content } = req.body;
  const update = {};
  if (title) update.title = title;
  if (content) update.content = content;
  update.updatedAt = new Date().toISOString();
  const updated = updateNote(noteId, req.user.id, update);
  if (!updated) return res.status(404).json({ error: 'Note not found or not owned by user' });
  return res.status(200).json(updated);
}

// PUBLIC_INTERFACE
async function deleteExistingNote(req, res) {
  /**
   * Delete a note for the authenticated user.
   */
  const noteId = req.params.id;
  const deleted = deleteNote(noteId, req.user.id);
  if (!deleted) return res.status(404).json({ error: 'Note not found or not owned by user' });
  return res.status(204).send();
}

module.exports = {
  listNotes,
  getNote,
  createNewNote,
  updateExistingNote,
  deleteExistingNote,
};
