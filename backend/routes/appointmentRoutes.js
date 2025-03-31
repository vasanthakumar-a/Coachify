const express = require("express");
const { getUserAppoinments, getParticularAppoinment } = require("../controllers/appointmentController");
const validateTokenHandler = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.get('/', validateTokenHandler, getUserAppoinments)
router.get('/:id', validateTokenHandler, getParticularAppoinment)

module.exports = router;