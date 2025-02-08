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
  loginUserModel
}