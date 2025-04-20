import { Router } from 'express';
import Comment from './comment.model.js';
import * as commentsService from './comment.service.js';
import * as usersService from '../user.service.js'; // Исправлен путь
import * as postsService from '../post/post.service.js';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const comments = await commentsService.getAll();
      res.json(comments.map(Comment.toResponse));
    } catch (error) {
      res.status(500).send({ message: 'Failed to fetch comments', error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { text, userId, postId } = req.body;
      if (!text || !userId || !postId) {
        return res.status(400).send({ message: 'All fields are required' });
      }
      const comment = await commentsService.createComment(text, userId, postId);
      return res.status(201).json(Comment.toResponse(comment));
    } catch (error) {
      return res.status(500).send({ message: 'Failed to create a comment', error: error.message });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const comment = await commentsService.getCommentById(req.params.id);
      if (!comment) {
        return res.status(404).send({ message: 'Comment not found' });
      }
      return res.json(Comment.toResponse(comment));
    } catch (error) {
      return res.status(500).send({ message: 'Failed to fetch comment', error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { text } = req.body;
      const comment = await commentsService.updateComment(req.params.id, text);
      if (!comment) {
        return res.status(404).send({ message: 'Comment not found' });
      }
      return res.json(Comment.toResponse(comment));
    } catch (error) {
      return res.status(500).send({ message: 'Failed to update comment', error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const comment = await commentsService.deleteComment(req.params.id);
      if (!comment) {
        return res.status(404).send({ message: 'Comment not found' });
      }
      return res.status(204).send({ message: 'Comment deleted successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to delete comment', error: error.message });
    }
  });

router.route('/:id/user').get(async (req, res) => {
  try {
    const comment = await commentsService.getCommentById(req.params.id);
    if (!comment) {
      return res.status(404).send({ message: 'Комментарий не найден' });
    }
    const user = await usersService.getById(comment.userId);
    return res.json(user);
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось получить пользователя комментария', error: error.message });
  }
});

router.route('/:id/post').get(async (req, res) => {
  try {
    const comment = await commentsService.getCommentById(req.params.id);
    if (!comment) {
      return res.status(404).send({ message: 'Комментарий не найден' });
    }
    const post = await postsService.getPostById(comment.postId);
    return res.json(post);
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось получить пост комментария', error: error.message });
  }
});

export default router;
