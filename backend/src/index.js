const express = require("express");

const app = express();
const PORT = 3000;

app.get("/health", (req, res) => {
  res.send(`Server is up and running`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
