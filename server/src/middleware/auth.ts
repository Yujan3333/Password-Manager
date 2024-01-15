import jwt from "jsonwebtoken";
import config from "../config";
import { Request, Response, NextFunction } from "express";

// Middleware to verify JWT token
export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // When No token
    if (!token) {
      throw new Error("Authentication required.");
    }

    const decoded = jwt.verify(token, config.myTokenKey);

    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    // Handle errors here
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).send("Token expired.");
      } else {
        res.status(403).send("Invalid token.");
      }
    }
  }
};
