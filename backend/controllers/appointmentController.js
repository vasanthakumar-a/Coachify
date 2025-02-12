const asyncHandler = require('express-async-handler');
const { getAppoinments, getAppoinment } = require('../models/appointmentModel');

//@desc Get All Appointments of current user
//@route /api/appointments
//@access Private
const getUserAppoinments = asyncHandler(async(req, res) => {
  const appointments = await getAppoinments(req.user?.id)
  res.status(200).json(appointments);
});

//@desc Get Particular Appointment of current user
//@route /api/appointments/:id
//@access Private
const getParticularAppoinment = asyncHandler(async(req, res) => {
  const appointment = await getAppoinment(req.params.id, req.user?.id)
  res.status(200).json(appointment);
});

module.exports = {
  getUserAppoinments,
  getParticularAppoinment
}