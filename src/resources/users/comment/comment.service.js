import * as commentRepo from './comment.memory.repository.js';

const getAll = async () => commentRepo.getAll();

const createComment = async (text, userId, postId) => {
  const comment = await commentRepo.createComment(text, userId, postId);
  return comment;
};

const getCommentById = async (id) => commentRepo.getCommentById(id);

const updateComment = async (id, text) => {
  const comment = await commentRepo.updateComment(id, text);
  return comment;
};

const deleteComment = async (id) => commentRepo.deleteComment(id);

const getCommentsByUserId = async (userId) => {
  const comments = await commentRepo.getAll();
  return comments.filter((c) => c.userId === userId);
};

const getCommentsByPostId = async (postId) => {
  const comments = await commentRepo.getAll();
  return comments.filter((c) => c.postId === postId);
};

const deleteCommentsByUserId = async (userId) => {
  const commentsToDelete = comments.filter((c) => c.userId === userId);
  commentsToDelete.forEach((c) => deleteComment(c.id));
};

const deleteCommentsByPostId = async (postId) => {
  const commentsToDelete = comments.filter((c) => c.postId === postId);
  commentsToDelete.forEach((c) => deleteComment(c.id));
};

export {
  getAll,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByUserId,
  getCommentsByPostId,
  deleteCommentsByUserId,
  deleteCommentsByPostId,
};
