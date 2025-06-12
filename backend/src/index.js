const express = require("express");
const connectMongoDB = require("./db/mongo.db");

const PORT = 3000;

const app = express();
connectMongoDB();


app.get("/health", (req, res) => {
  res.send(`Server is up and running`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
