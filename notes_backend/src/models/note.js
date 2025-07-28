const fs = require('fs');
const path = require('path');
const NOTES_FILE = path.join(__dirname, '../../data/notes.json');

// PUBLIC_INTERFACE
function loadNotes() {
  if (!fs.existsSync(NOTES_FILE)) {
    return [];
  }
  try {
    const notes = fs.readFileSync(NOTES_FILE, 'utf-8');
    return JSON.parse(notes);
  } catch (err) {
    return [];
  }
}

// PUBLIC_INTERFACE
function saveNotes(notes) {
  fs.mkdirSync(path.dirname(NOTES_FILE), { recursive: true });
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8');
}

// PUBLIC_INTERFACE
function getNotesByUser(userId) {
  const notes = loadNotes();
  return notes.filter((n) => n.userId === userId);
}

// PUBLIC_INTERFACE
function getNoteByIdAndUser(noteId, userId) {
  const notes = loadNotes();
  return notes.find(n => n.id === noteId && n.userId === userId);
}

// PUBLIC_INTERFACE
function createNote(note) {
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
  return note;
}

// PUBLIC_INTERFACE
function updateNote(noteId, userId, update) {
  const notes = loadNotes();
  const idx = notes.findIndex(n => n.id === noteId && n.userId === userId);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...update };
  saveNotes(notes);
  return notes[idx];
}

// PUBLIC_INTERFACE
function deleteNote(noteId, userId) {
  let notes = loadNotes();
  const origLength = notes.length;
  notes = notes.filter(n => !(n.id === noteId && n.userId === userId));
  saveNotes(notes);
  return notes.length !== origLength;
}

module.exports = {
  loadNotes,
  saveNotes,
  getNotesByUser,
  getNoteByIdAndUser,
  createNote,
  updateNote,
  deleteNote,
};
