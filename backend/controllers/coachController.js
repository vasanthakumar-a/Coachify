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

//@desc Post Coach booking event
//@route /api/coaches/:id/booking
//@access Public
const bookCoach = asyncHandler(async(req, res) => {
  let events = [];
  const { coachName, specialization, date, time } = req.body;

  console.log(req.body);
  if (!coachName || !date || !time || !specialization) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEvent = {
    id: events.length + 1,
    title: `Session with ${coachName} for ${specialization} at ${date}`,
    date,
    time,
  };

  events.push(newEvent);
  console.log(events);
  res.status(201).json({ message: "Event created", event: newEvent });
});

module.exports = {
  getAllCoaches,
  getSingleCoach,
  bookCoach
}