const User = require('../models/user');

async function createUser({ name, email, age }) {
  return User.create({ name, email, age });
}

async function listUsers() {
  return User.find().lean();
}

async function getUserById(id) {
  return User.findById(id).lean();   // ✅ better: use findById instead of findOne({ id })
}

async function updateUser(id, { name, email, age }) {
  const user = await User.findById(id);
  if (!user) return null;

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.age = age ?? user.age;

  await user.save();
  return user;
}

async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) return false;

  await user.deleteOne();
  return true;
}

module.exports = { createUser, listUsers, getUserById, updateUser, deleteUser };
