import prisma from "@/utils/connect";

export const connect = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to the database');
  }
}