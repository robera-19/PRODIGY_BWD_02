const userService = require('../services/userService');

function badRequest(res, message) {
  return res.status(400).json({ error: message });
}

async function create(req, res) {
  const { name, email, age } = req.body;
  if (!name || !email) return badRequest(res, 'name and email are required');
  try {
    const user = await userService.createUser({ name, email, age });
    return res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) return badRequest(res, 'email already in use');
    if (err.name === 'ValidationError')
      return badRequest(res, Object.values(err.errors).map(e => e.message).join(', '));
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
}

async function list(req, res) {
  const users = await userService.listUsers();
  res.json(users);
}

async function getOne(req, res) {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'user not found' });
  res.json(user);
}

async function update(req, res) {
  try {
    const { name, email, age } = req.body;

    if (email) {
      const existing = await require('../models/user').findOne({ email });
      if (existing && existing.id !== req.params.id) {
        return badRequest(res, 'email already in use');
      }
    }

    const updated = await userService.updateUser(req.params.id, { name, email, age });
    if (!updated) return res.status(404).json({ error: 'user not found' });
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError')
      return badRequest(res, Object.values(err.errors).map(e => e.message).join(', '));
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
}

async function remove(req, res) {
  const ok = await userService.deleteUser(req.params.id);
  if (!ok) return res.status(404).json({ error: 'user not found' });
  res.status(204).end();
}

module.exports = { create, list, getOne, update, remove };
