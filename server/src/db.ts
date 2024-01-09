import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to the database:', error.message);
      throw error;
    } else {
      console.error('Unknown error:', error);
      throw new Error('Unknown error');
    }
  } finally {
    await prisma.$disconnect();
  }
}

export {checkDatabaseConnection};