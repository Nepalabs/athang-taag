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

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
