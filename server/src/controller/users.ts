// src/controllers/users.ts

import { Request, Response } from "express";
import * as userService from "../service/users";

export const signup = async (req: Request, res: Response) => {
  const result = req.body;
  try {
    const data = await userService.signup(
      result.email,
      result.password
    );
    // // ts does not give data to be compared with 200
    // if (data === 200) {
    //   res.status(200).json({message:"Signup Successful"});
    // } else {
    //   res.status(422).json(data);
    // }
    
    // // corrected code checks if data is object first
    if ('id' in data) {
        // This means 'data' is an object with user data
        res.status(200).json({ message: "Signup Successful" });
      } else {
        // This means 'data' is an object with an error property
        res.status(422).json(data);
      }
      
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const data = await userService.login(result.email, result.password);
    if (data !== 401 && data !== 404) {
      res.status(200).json(data);
      // res.status(200);
    } else if (data === 401) {
      res.status(401).json({ error: "Invalid Credentials" });
    } else if (data === 404) {
      res.status(404).json({ error: "User doesnt exist" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
