const express = require("express");
const {
  getAllCoaches,
  getSingleCoach
} = require("../controllers/coachController");

const router = express.Router();

router.route('/').get(getAllCoaches)
router.route('/:id').get(getSingleCoach)

module.exports = router;