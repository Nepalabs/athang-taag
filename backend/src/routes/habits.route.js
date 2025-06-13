const express = require("express");
const habitController = require("../controllers/habits.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const habitsRoutes = express();

habitsRoutes.get("/", verifyAuth, habitController.getAllHabits);

habitsRoutes.get("/:id", verifyAuth, habitController.getHabitById);

habitsRoutes.post("/", verifyAuth, habitController.createHabit);

habitsRoutes.put("/:id", verifyAuth, habitController.updateHabitById);

habitsRoutes.delete("/:id", verifyAuth, habitController.deleteHabitById);

module.exports = habitsRoutes;
