import { v4 as uuidv4 } from 'uuid';

class Post {
  constructor({ id = uuidv4(), title, text, createdAt = Date.now(), userId, comments = [] }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.userId = userId;
    this.comments = comments;
  }

  static toResponse(post) {
    const { id, title, text, createdAt, userId, comments } = post;
    return { id, title, text, createdAt, userId, comments };
  }
}

export default Post;
