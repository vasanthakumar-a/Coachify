const asyncHandler = require('express-async-handler');
const { getCoaches, getCoach } = require('../models/coachModel');

//@desc Get All Coaches
//@route /api/coaches
//@access Public
const getAllCoaches = asyncHandler(async(req, res) => {
  const coaches = await getCoaches();
  res.status(200).json(coaches)
});

//@desc Get Single Coach
//@route /api/coaches/:id
//@access Public
const getSingleCoach = asyncHandler(async(req, res) => {
  const coach = await getCoach(req.params.id);
  res.status(200).json(coach)
});

module.exports = {
  getAllCoaches,
  getSingleCoach
}