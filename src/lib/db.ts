import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    return new PrismaClient();
  } catch (error) {
    console.error('Error initializing Prisma client:', error);
    process.exit(1);
  }
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
} else {
  prisma.$connect();
}

export default prisma;