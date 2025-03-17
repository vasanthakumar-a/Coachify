const express = require("express");
const {
  getAllCoaches,
  getSingleCoach,
  bookCoach
} = require("../controllers/coachController");

const router = express.Router();

router.route('/').get(getAllCoaches)
router.route('/:id').get(getSingleCoach)
router.route('/:id/booking').post(bookCoach)

module.exports = router;