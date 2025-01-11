const express = require("express");
const membershipRouter = require("./routes/memberships");
const app = express();

app.use(express.json());

// Routes
app.use("/memberships", membershipRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
