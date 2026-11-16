import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL database connected successfully.");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:");
    console.error(error);
    throw error;
  }
};

export default prisma;
