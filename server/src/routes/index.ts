// routes/index.ts
import { Router } from 'express';
import usersRoutes from './users';
import vaultRoutes from './vault';
// import {auth} from '../middleware/authMiddleware';
// import {auth} from '../middleware/auth';
import { auth } from '../middleware/auth';


const router = Router();

// User routes for login and signup
router.use('/users', usersRoutes);

// router.use('/vaults', auth, vaultRoutes);
router.use('/vaults',auth, vaultRoutes);

export default router;
