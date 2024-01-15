// routes/userRoutes.ts
import express from 'express';
import UserController from '../controller/users';
import { validateReqBody } from '../middleware/validator';
import { loginSchema, signupSchema } from '../schema/users';

const router = express.Router();

router.post('/signup',validateReqBody(signupSchema), UserController.signup);
router.post('/login',validateReqBody(loginSchema), UserController.login);

export default router;
