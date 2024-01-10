// src/model/user.ts
import { PrismaClient } from "@prisma/client";
import { LoginInfo, SignupInfo } from "../interface/userInterface";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Function to hash the user's password
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export async function signup(result: SignupInfo) {

  try {
    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: {
        email: result.email,
      },
    });

    if (existingUser) {
      // Email is already in use, return an error
      return { error: "Email is already in use" };
    }
    
    //calling the hashing function to hash the password before entering the password in db
    const hashedPassword = await hashPassword(result.password);

    const newUser = await prisma.user.create({
      data: {
        email: result.email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function login(result: LoginInfo) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.email,
      },
    });

    if (!user) {
      // User doesn't exist
      return 404;
    }

    const isPasswordValid = await bcrypt.compare(
      result.password,
      user.password
    );

    if (!isPasswordValid) {
      // Invalid credentials
      return 401;
    }

    return user;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
