import * as postRepo from './post.memory.repository.js';

const getAll = () => postRepo.getAll();

const createPost = async (title, text, comment, userId) => {
  const newPost = await postRepo.createPost(title, text, comment, userId);
  return newPost;
};

const getPostById = async (id) => postRepo.getPostById(id);

const updatePost = async (id, title, text, comment, userId) => {
  const updatedPost = await postRepo.updatePost(id, title, text, comment, userId);
  return updatedPost;
};

const deletePost = async (id) => {
  const deletedPost = await postRepo.deletePost(id);
  return deletedPost;
};

const getPostsByUserId = async (userId) => {
  const posts = await postRepo.getAll();
  return posts.filter((p) => p.userId === userId);
};

const deletePostsByUserId = async (userId) => {
  const posts = await postRepo.getAll();
  const postsToDelete = posts.filter((p) => p.userId === userId);
  postsToDelete.forEach((p) => postRepo.deletePost(p.id));
};

export { getAll, createPost, updatePost, getPostById, deletePost, getPostsByUserId, deletePostsByUserId };
