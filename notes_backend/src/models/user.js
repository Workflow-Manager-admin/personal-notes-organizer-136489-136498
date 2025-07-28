const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../../data/users.json');

// PUBLIC_INTERFACE
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const content = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return [];
  }
}

// PUBLIC_INTERFACE
function saveUsers(users) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// PUBLIC_INTERFACE
function findUserByUsername(username) {
  const users = loadUsers();
  return users.find((u) => u.username === username);
}

// PUBLIC_INTERFACE
function findUserById(id) {
  const users = loadUsers();
  return users.find((u) => u.id === id);
}

// PUBLIC_INTERFACE
function createUser(user) {
  const users = loadUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

module.exports = {
  loadUsers,
  saveUsers,
  findUserByUsername,
  findUserById,
  createUser,
};
