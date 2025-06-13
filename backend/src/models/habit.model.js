const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: String,
  goal: String,
  frequency: {
    type: String,
    enum: ["daily", "weekly"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  progress: [
    {
      date: String,
      status: Boolean,
    },
  ],
});

const Habit = mongoose.model("habit", HabitSchema);
module.exports = Habit;
