import { Router } from 'express';
import * as userController from './user.controller.js';

const router = Router();

router.route('/').get(userController.getAllUsers);
router.route('/').post(userController.createUser);
router.route('/:id').get(userController.getUserById);
router.route('/:id').put(userController.updateUser);
router.route('/:id').delete(userController.deleteUser);
router.route('/:id/posts').get(userController.getUserPosts);
router.route('/:id/comments').get(userController.getUserComments);

export default router;
