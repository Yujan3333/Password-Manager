// models/UserModel.ts
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

const prisma = new PrismaClient();

export default class UserModel {
  static async createUser(email: string, password: string): Promise<User> {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    return prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }

  static async loginUser(email: string, password: string): Promise<string> {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // // Throw an error if the user is not found or the password is incorrect
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   throw new Error("Invalid credentials");
    // }

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the provided password is incorrect
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    //here config.myTokenKey is the secret key
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.myTokenKey,
      {
        expiresIn: "15m", // Token expires in 1 hour
      }
    );

    return token;
  }
}
