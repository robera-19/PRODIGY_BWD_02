const User = require('../models/user');

const create = async (data) => {
  return User.create(data);
};

const list = async () => {
  return User.find().lean();
};

const getOne = async (id) => {
  return User.findOne({ id }).lean();
};

const update = async (id, changes) => {
  const user = await User.findOne({ id });
  if (!user) return null;
  Object.assign(user, changes);
  return user.save();
};

const remove = async (id) => {
  const user = await User.findOne({ id });
  if (!user) return false;
  await user.deleteOne();
  return true;
};

module.exports = { create, list, getOne, update, remove };
const User = require('../models/user');

async function createUser({ name, email, age }) {
  return User.create({ name, email, age });
}

async function listUsers() {
  return User.find().lean();
}

async function getUserById(id) {
  return User.findOne({ id }).lean();
}

async function updateUser(id, { name, email, age }) {
  const user = await User.findOne({ id });
  if (!user) return null;
  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.age = age ?? user.age;
  await user.save();
  return user;
}

async function deleteUser(id) {
  const user = await User.findOne({ id });
  if (!user) return false;
  await user.deleteOne();
  return true;
}

module.exports = { createUser, listUsers, getUserById, updateUser, deleteUser };
