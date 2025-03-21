const asyncHandler = require('express-async-handler');
const { getCoaches, getCoach } = require('../models/coachModel');
const { google } = require("googleapis");

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


  // curl -X GET "https://www.googleapis.com/calendar/v3/calendars/primary/events" \
  // -H "Authorization: Bearer ya29.a0AeXRPp5duB-qqWgxgnFdjgItmRA5vsEL7uXEB53jGc8nx9NeM7VjD3mXeOUORfUVPMdG8ANq2JzGhR46RxN3XuubXvuV2XZbYSzNOaqLzI-hWEFHcwwnCUfgFwZeEPA5o8fDCmGkemLM2dhNTLSNUbkUDibHt07-QIbJtaKoaCgYKAXkSARMSFQHGX2MiIrd809If3dcL0j75kkDGUw0175" \
  // -H "Accept: application/json"


  // const { tokens } = await oAuth2Client.getToken("4/0AQSTgQEwNy-57gux0VK8nohxB7BfMEdXGmpuJCSR3u4kbv0DOJugtCAaZlkdEAF81cQDfg");

  // console.log("Came to 1:", tokens);

  // const { tokens } = await oAuth2Client.getToken(reqCode);
  // console.log("Tokens received 2:", tokens);
  // const token = await oAuth2Client.getAccessToken();
  // console.log("Generated Access Token:", token);
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