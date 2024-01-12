import {Router} from "express";

// import {authenticateToken, refreshActionToken} from "../middleware/authToken";
import usersRoutes from "./users";
import vaultRoutes from "./vault";


const router = Router();

// user route for login and signup
router.use("/users",usersRoutes);

// route for User stored Passwords CRUD operations
router.use("/vaults", vaultRoutes);


export default router; 