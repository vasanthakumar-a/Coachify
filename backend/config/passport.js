const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient } = require("@prisma/client");
const { findByGoogleId, createUserModel, updateUserGoogleIdModel } = require("../models/authModel");

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await findByGoogleId(profile.id);
        if (!user) {
          user = await createUserModel({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        } else {
          if(!user.googleId) {
            await updateUserGoogleIdModel(profile.emails[0].value, profile.id);
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
