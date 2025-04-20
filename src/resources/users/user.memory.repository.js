import { v4 as uuidv4 } from 'uuid';
import User from './user.model.js';

const users = [
  new User({
    id: uuidv4(),
    name: 'Alice',
    login: 'alice123',
    password: 'password1',
  }),
  new User({
    id: uuidv4(),
    name: 'Bob',
    login: 'bob456',
    password: 'password2',
  }),
  new User({
    id: uuidv4(),
    name: 'Charlie',
    login: 'charlie789',
    password: 'password3',
  }),
];

const getAll = async () => users.map(User.toResponse);

const createUser = async ({ name, login, password }) => {
  const newUser = new User({
    id: uuidv4(),
    name,
    login,
    password,
    salt: 'randomGeneratedSalt',
  });
  users.push(newUser);
  return User.toResponse(newUser);
};

const getById = async (id) => users.find((user) => user.id === id);

const updateUser = async (id, updatedUserData) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    return User.toResponse(users[userIndex]);
  }
  return null;
};

const deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
  return null;
};

export { getAll, createUser, getById, updateUser, deleteUser };
