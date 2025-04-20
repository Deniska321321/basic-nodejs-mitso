import Post from './post.model.js';

const post = [new Post({})];

const getAll = async () => post.map(Post.toResponse);

const createPost = async (title, text, comment, userId) => {
  const newPost = new Post({ title, text, comment, userId });
  post.push(newPost);
  return Post.toResponse(newPost);
};

const getPostById = async (id) => post.find((p) => p.id === id);

const updatePost = async (id, title, text, comment, userId) => {
  const index = post.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }
  const updatedPost = {
    ...post[index],
    title: title || post[index].title, // Используйте старое значение, если новое не задано
    text: text || post[index].text,
    comment: comment || post[index].comment,
    userId: userId || post[index].userId,
  };

  post[index] = updatedPost;

  return Post.toResponse(updatedPost);
};

const deletePost = async (id) => {
  const index = post.findIndex((posts) => posts.id === id);
  if (index === -1) {
    return null;
  }
  return post.splice(index, 1)[0];
};

export { getAll, createPost, updatePost, getPostById, deletePost };
