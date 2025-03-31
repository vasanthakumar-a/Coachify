const { prisma } = require('../config/dbConnection');

const getCoaches = async (searchQuery, page, limit) => {
  try {
    const coaches = await prisma.coach.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchQuery,
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              contains: searchQuery,
              mode: 'insensitive'
            }
          },
          {
            username: {
              contains: searchQuery,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: searchQuery,
              mode: 'insensitive'
            }
          },
          {
            phone: {
              contains: searchQuery,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        phone: true,
        bio: true,
        gender: true,
        experienceYear: true,
        hourlyRate: true,
        address: {
          select: {
            address1: true,
            address2: true,
            city: true,
            state: true,
            pincode: true,
          }
        },
        specialization: {
          select: {
            name: true,
            description: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
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
        id: parseInt(coachId)
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
        hourlyRate: true,
        address: {
          select: {
            address1: true,
            address2: true,
            city: true,
            state: true,
            pincode: true,
          }
        },
        specialization: {
          select: {
            name: true,
            description: true
          }
        }
      }
    });
    return coach;
  } catch (error) {
    throw new Error("Failed to fetch a coach.");
  }
}

const totalCoaches = async() => {
  return await prisma.coach.count();
}

module.exports = {
  getCoaches,
  getCoach,
  totalCoaches
}