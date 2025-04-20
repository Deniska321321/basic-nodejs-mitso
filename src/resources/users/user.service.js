import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();

const createUser = async ({ name, login, password }) => {
  const newUser = await usersRepo.createUser({ name, login, password });
  return newUser;
};

const getById = (id) => usersRepo.getById(id);

const updatedUserData = (id, updatedData) => usersRepo.updateUser(id, updatedData);

const deleteUser = async (id) => {
  const deletedUser = await usersRepo.deleteUser(id);
  if (!deletedUser) {
    throw new Error('User not found');
  }
  return deletedUser;
};

export { getAll, createUser, getById, updatedUserData, deleteUser };
