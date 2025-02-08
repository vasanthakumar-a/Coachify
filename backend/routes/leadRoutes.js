const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, company, userId } = req.body;
  const lead = await prisma.lead.create({
    data: { name, email, phone, company, userId },
  });
  res.json(lead);
});

router.get("/", async (req, res) => {
  const leads = await prisma.lead.findMany();
  res.json(leads);
});

module.exports = router;
