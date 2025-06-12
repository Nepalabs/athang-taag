const express = require("express");
const connectMongoDB = require("./db/mongo.db");
const authRoutes = require("./routes/auth.route");

const PORT = 3000;

const app = express();
connectMongoDB();
app.use(express.json());
app.use("/auth", authRoutes)

app.get("/health", (req, res) => {
  res.send(`Server is up and running`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
