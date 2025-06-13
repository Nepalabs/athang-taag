const express = require("express");
const connectMongoDB = require("./db/mongo.db");
const authRoutes = require("./routes/auth.route");
const habitsRoutes = require("./routes/habits.route");

const app = express();
connectMongoDB();

const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/habits", habitsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
