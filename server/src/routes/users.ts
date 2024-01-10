import express, {Router} from "express";

import {
    login,
    signup
} from "../controller/users";

const router = Router();

//login route
router.post("/login", login);

//signup route
router.post("/signup", signup);


export default router; 