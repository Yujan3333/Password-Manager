// routes/index.ts
import { Router } from 'express';
import usersRoutes from './users';
import vaultRoutes from './vault';
// import {auth} from '../middleware/authMiddleware';


const router = Router();

// User routes for login and signup
router.use('/users', usersRoutes);

// router.use('/vaults', auth, vaultRoutes);
router.use('/vaults', vaultRoutes);

export default router;
