const express = require("express");
const {
  getAllCoaches,
  getSingleCoach,
  bookCoach
} = require("../controllers/coachController");
const validateTokenHandler = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.route('/').get(getAllCoaches)
router.route('/:id').get(getSingleCoach)
router.post('/:id/booking', validateTokenHandler, bookCoach)

module.exports = router;