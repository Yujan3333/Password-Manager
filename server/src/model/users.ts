// models/UserModel.ts
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

    // Throw an error if the user is not found or the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your-secret-key",
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    return token;
  }

  static async verifyToken(token: string): Promise<object> {
    // Verify JWT token
    try {
      const decoded = jwt.verify(token, "your-secret-key");
      return decoded as object;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
