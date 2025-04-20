import { Router } from 'express';

import Post from './post.model.js';
import * as postsService from './post.service.js';
import * as usersService from '../user.service.js';
import * as commentsService from '../comment/comment.service.js'; // Исправлен путь

const router = Router();

router.route('/').get(async (req, res) => {
  try {
    const posts = await postsService.getAll();
    res.json(posts.map(Post.toResponse));
  } catch (error) {
    res.status(500).send({ message: 'Не удалось получить посты', error: error.message });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById(id);
    if (!post) {
      return res.status(404).send({ message: 'Пост не найден' });
    }
    return res.json(Post.toResponse(post));
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось получить пост', error: error.message });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { title, text, comment, userId } = req.body;
    const post = await postsService.createPost(title, text, comment, userId);
    res.status(201).json(Post.toResponse(post));
  } catch (error) {
    res.status(500).send({ message: 'Не удалось создать пост', error: error.message });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, comment, userId } = req.body;
    const post = await postsService.updatePost(id, title, text, comment, userId);
    if (!post) {
      return res.status(404).send({ message: 'Пост не найден' });
    }
    return res.json(Post.toResponse(post));
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось обновить пост', error: error.message });
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsService.deletePost(id);
    if (!post) {
      return res.status(404).send({ message: 'Пост не найден' });
    }
    return res.status(200).send({ message: 'пост удален' });
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось удалить пост', error: error.message });
  }
});

router.route('/:id/user').get(async (req, res) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: 'Пост не найден' });
    }
    const user = await usersService.getById(post.userId);
    return res.json(user);
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось получить пользователя поста', error: error.message });
  }
});

router.route('/:id/comments').get(async (req, res) => {
  try {
    const comments = await commentsService.getCommentsByPostId(req.params.id);
    res.json(comments);
  } catch (error) {
    res.status(500).send({ message: 'Не удалось получить комментарии поста', error: error.message });
  }
});

export default router;
