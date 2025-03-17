const express = require("express");
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
    const token = jwt.sign({ id: req.user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
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
