require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./config/dbConnection');
const errorHandler = require('./middlewares/errorHandler');

const passport = require('./config/passport');
const authRoutes = require("./routes/authRoutes");
const coachRoutes = require('./routes/coachRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')

const app = express();
connectDB();

// Middlewares
app.use(errorHandler);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/appoinments', appointmentRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));