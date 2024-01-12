// controllers/UserController.ts
import { Request, Response } from 'express';
import UserModel from '../model/users';

export default class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.createUser(email, password);
      res.status(201).json(user);
    } catch (error) {
      // Specify the type of error
      if(error instanceof Error){
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserModel.loginUser(email, password);
      res.json({ token });
    } catch (error: any) {
      // Specify the type of error
      if(error instanceof Error){
      res.status(401).json({ error: error.message });
      }
    }
  }
}
