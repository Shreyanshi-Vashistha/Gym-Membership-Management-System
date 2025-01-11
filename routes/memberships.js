const express = require("express");
const router = express.Router();

let members = [];

// Register Membership
router.post("/register", (req, res) => {
  const { name, email, startDate } = req.body;
  if (!name || !email || !startDate) {
    return res
      .status(400)
      .json({ error: "Name, email, and start date are required" });
  }

  const existingMember = members.find((member) => member.email === email);
  if (existingMember) {
    return res
      .status(400)
      .json({ error: "Membership already exists for this email" });
  }

  const member = {
    id: members.length + 1,
    name,
    email,
    startDate,
    active: true,
  };
  members.push(member);
  res
    .status(201)
    .json({ message: "Membership registered successfully", member });
});

// View Membership Details by Email
router.get("/:email", (req, res) => {
  const { email } = req.params;
  const member = members.find((member) => member.email === email);

  if (!member) {
    return res.status(404).json({ error: "Membership not found" });
  }

  res.json(member);
});

// View All Active Members
router.get("/", (req, res) => {
  const activeMembers = members.filter((member) => member.active);
  res.json(activeMembers.map(({ name, email }) => ({ name, email })));
});

// Cancel Membership
router.delete("/cancel/:email", (req, res) => {
  const { email } = req.params;
  const member = members.find((member) => member.email === email);

  if (!member) {
    return res.status(404).json({ error: "Membership not found" });
  }

  member.active = false;
  res.json({ message: "Membership cancelled successfully" });
});

// Modify Membership Start Date
router.put("/modify/:email", (req, res) => {
  const { email } = req.params;
  const { startDate } = req.body;

  const member = members.find((member) => member.email === email);

  if (!member) {
    return res.status(404).json({ error: "Membership not found" });
  }

  if (!startDate) {
    return res.status(400).json({ error: "New start date is required" });
  }

  member.startDate = startDate;
  res.json({ message: "Membership start date modified successfully", member });
});

module.exports = router;
