import * as usersService from './user.service.js';
import * as postsService from './post/post.service.js';
import * as commentsService from './comment/comment.service.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: 'Не удалось получить пользователей', error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send({ message: 'Ошибка при создании пользователя', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось получить пользователя', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await usersService.updatedUserData(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось обновить пользователя', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await usersService.deleteUser(id);
    await postsService.deletePostsByUserId(id);
    await commentsService.deleteCommentsByUserId(id);
    res.status(200).json({ message: `Пользователь с id ${id} удален` });
  } catch (error) {
    res.status(404).send({ message: 'Пользователь не найден', error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await postsService.getPostsByUserId(req.params.id);
    res.json(posts);
  } catch (error) {
    res.status(500).send({ message: 'Не удалось получить посты пользователя', error: error.message });
  }
};

const getUserComments = async (req, res) => {
  try {
    const comments = await commentsService.getCommentsByUserId(req.params.id);
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Не удалось получить комментарии пользователя', error: error.message });
  }
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser, getUserPosts, getUserComments };
