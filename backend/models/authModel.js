const { prisma } = require('../config/dbConnection');
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return user;
}

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });
  return user;
}

const findByGoogleId = async (googleId) => {
  const user = await prisma.user.findMany({
    where: {
      googleId
    },
  });
  return user[0];
}

const createUserModel = async ({ username, email, googleId }) => {
  const hashedPassword = await bcrypt.hash('123456', 10);
  return await prisma.user.create({
    data: { username, email, encryptedPassword: hashedPassword, googleId }
  });
}

const updateUserGoogleIdModel = async ({ email, googleId }) => {
  return await prisma.user.update({
    where: { email },
    data: { googleId }
  });
}

const registerUserModel = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { username, email, encryptedPassword: hashedPassword }
  });
}

const loginUserModel = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.findUnique({
    where: { email, encryptedPassword: hashedPassword }
  });
}

module.exports = {
  findUserByEmail,
  findUserByUsername,
  registerUserModel,
  loginUserModel,
  findByGoogleId,
  createUserModel,
  updateUserGoogleIdModel
}