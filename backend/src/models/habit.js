const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    note: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    completed: Boolean,
  },
  { timestamps: true }
);

const Habits = mongoose.model("habits", TodoSchema);
module.exports = Habits;
