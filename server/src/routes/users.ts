// routes/userRoutes.ts
import express from 'express';
import UserController from '../controller/users';

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export default router;
