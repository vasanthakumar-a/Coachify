const express = require("express");
const { google } = require('googleapis');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const validateTokenHandler = require("../middlewares/validateTokenHandler");
const { loginUser, registerUser, getProfile} = require("../controllers/authController");

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', validateTokenHandler, getProfile)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }), (req, res) => {
    const { code } = req.query;
      console.log("Tokens received:", code);
    const token = jwt.sign({
      user: {
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
        code: code
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' }
    );

    res.cookie("_token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:5173/");
  }
);

module.exports = router;
