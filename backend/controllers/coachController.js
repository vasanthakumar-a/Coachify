const asyncHandler = require('express-async-handler');
const { getCoaches, getCoach, totalCoaches } = require('../models/coachModel');
const { google } = require("googleapis");

//@desc Get All Coaches
//@route /api/coaches
//@access Public
const getAllCoaches = asyncHandler(async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search || "";
  const coaches = await getCoaches(searchQuery, page, limit);
  const total = await totalCoaches();
  res.status(200).json({
    coaches,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  })
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
  const { coachName, specialization, date, time } = req.body;

  console.log(req.user);
  const { accessToken, refreshToken, reqCode } = req.user;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "/api/auth/google/callback"
  );

  oAuth2Client.setCredentials({
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar.events.readonly",
    ],
    access_type: "offline",  // Required for refreshToken
    prompt: "consent",
  });

  oAuth2Client.setCredentials({ access_token: accessToken });

  console.log("Came to 2:");

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  console.log("Came to 3:");
    const event = {
      summary: `Session with ${coachName} at ${date}`,
      description: `Coaching session with ${coachName}`,
      start: {
        dateTime: new Date(date).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(date).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email: req.user.email }], // Add user as an attendee
    };

    // List calendar events
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Came to 4:", events);
    console.log("Upcoming events:", events.data.items);

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.status(201).json({
      message: "Event created successfully",
      eventLink: response.data.htmlLink,
    });
});

module.exports = {
  getAllCoaches,
  getSingleCoach,
  bookCoach
}