const express = require("express");
const habitController = require("../controllers/habit.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const habitRoutes = express();

habitRoutes.get("/", verifyAuth, habitController.getAllHabits);

habitRoutes.get("/:id", verifyAuth, habitController.getHabitById);

habitRoutes.post("/", verifyAuth, habitController.createHabit);

habitRoutes.put("/:id", verifyAuth, habitController.updateHabitById);

habitRoutes.delete("/:id", verifyAuth, habitController.deleteHabitById);

module.exports = habitRoutes;
