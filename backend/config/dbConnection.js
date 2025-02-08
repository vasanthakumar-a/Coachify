const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.info('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  prisma
};