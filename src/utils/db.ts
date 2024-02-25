import { PrismaClient } from '@prisma/client'

export const connect = async () => {
  const prisma = new PrismaClient()
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to the database');
  }
}