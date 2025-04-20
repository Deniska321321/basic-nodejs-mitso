import Comment from './comment.model.js';

const comments = [];

const getAll = async () => comments.map(Comment.toResponse);

const createComment = async (text, userId, postId) => {
  const newComment = new Comment({ text, userId, postId });
  comments.push(newComment);
  return Comment.toResponse(newComment);
};

const getCommentById = async (id) => comments.find((c) => c.id === id);

const updateComment = async (id, text) => {
  const comment = comments.find((c) => c.id === id);
  if (!comment) return null;
  comment.text = text;
  return Comment.toResponse(comment);
};

const deleteComment = async (id) => {
  const index = comments.findIndex((c) => c.id === id);
  if (index === -1) return null;
  comments.splice(index, 1);
  return true;
};

export { getAll, createComment, getCommentById, updateComment, deleteComment };
