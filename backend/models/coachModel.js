const { prisma } = require('../config/dbConnection');

const getCoaches = async () => {
  try {
    const coaches = await prisma.coach.findMany({
      select: {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        phone: true,
        bio: true,
        gender: true,
        experienceYear: true,
      },
    });

    return coaches;
  } catch (error) {
    throw new Error("Failed to fetch coaches.");
  }
};

const getCoach = async(coachId) => {
  try {
    const coach = await prisma.coach.findUnique({
      where: {
        id: coachId
      },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        phone: true,
        bio: true,
        gender: true,
        experienceYear: true,
      },
    });
    return coach;
  } catch (error) {
    throw new Error("Failed to fetch a coach.");
  }
}

module.exports = {
  getCoaches,
  getCoach
}