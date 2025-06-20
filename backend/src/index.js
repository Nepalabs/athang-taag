const express = require("express");
const connectMongoDB = require("./db/mongo.db");
const cors = require("cors");
const { viteURI } = require("./config/index");

const authRoutes = require("./routes/auth.route");
const habitsRoutes = require("./routes/habit.route");

const app = express();
connectMongoDB();

const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: viteURI, credentials: true }));

app.use("/auth", authRoutes);
app.use("/habits", habitsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
