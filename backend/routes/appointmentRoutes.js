const express = require("express");
const { getUserAppoinments, getParticularAppoinment } = require("../controllers/appointmentController");

const router = express.Router();

router.route('/').get(getUserAppoinments)
router.route('/:id').get(getParticularAppoinment)

module.exports = router;