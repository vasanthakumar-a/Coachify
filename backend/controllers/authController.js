const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  findUserByEmail,
  findUserByUsername,
  registerUserModel
} = require('../models/authModel');

//@desc Login a user
//@route POST /api/auth/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
  console.log('loginUser');
  console.log(req.cookies._token);
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    res.status(400);
    throw new Error('Please provide all the required fields');
  }
  
  let user;
  if (username) {
    user = await findUserByUsername(username);
  } else if (email) {
    user = await findUserByEmail(email);
  }

  // compare the password with the hashed password
  if(user && (await bcrypt.compare(password, user.encryptedPassword))) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' }
    );
    
    res.cookie("_token", accessToken, {
      httpOnly: false, // Prevents access via JavaScript (XSS protection)
      secure: false, // Only send over HTTPS
      // sameSite: "Strict", // Prevent CSRF attacks
      sameSite: "Strict", // Required for cross-origin requests
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    res.status(200).json({message: 'Login successfull!', accessToken});
  } else {
    res.status(401);
    throw new Error('Email or Password is incorrect');
  }
});

//@desc Register a user
//@route POST /api/auth/register
//@access Public
const registerUser = asyncHandler(async(req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    res.status(400);
    throw new Error('Please provide all the required fields');
  }

  let user;  
  if (username) {
    user = await findUserByUsername(username);
  } else if (email) {
    user = await findUserByEmail(email);
  }
  
  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  user = await registerUserModel({ username, email, password });
  res.status(200).json(user);
});


//@desc Get Profile Details
//@route POST /api/auth/profile
//@access Private
const getProfile = asyncHandler(async(req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

//@desc Get Profile Details
//@route POST /api/auth/profile
//@access Private
const logoutUser = asyncHandler(async(req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = {
  loginUser,
  registerUser,
  getProfile
}