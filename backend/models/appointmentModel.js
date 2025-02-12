const { prisma } = require('../config/dbConnection');

const getAppoinments = async(currentUserId) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: currentUserId
      },
      select: {
        name: true,
        from: true,
        to: true,
        duration: true,
        mode: true,
        starts: true,
        ends: true,
        coach: {
          select: {
            firstName: true,
            lastName: true,
          }
        },
        specialization: {
          select: {
            name: true,
          }
        }
      }
    })
    return appointments;
  } catch(error) {
    throw new Error("Failed to fetch Appointments.");
  }
}

const getAppoinment = async(appointmentId, currentUserId) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: parseInt(appointmentId),
        // userId: parseInt(currentUserId)
      },
      select: {
        name: true,
        from: true,
        to: true,
        duration: true,
        mode: true,
        starts: true,
        ends: true,
        coach: {
          select: {
            firstName: true,
            lastName: true,
          }
        },
        specialization: {
          select: {
            name: true,
          }
        }
      }
    })
    return appointment;
  } catch(error) {
    throw new Error("Failed to fetch Appointment.");
  }
}

module.exports = {
  getAppoinments,
  getAppoinment
}