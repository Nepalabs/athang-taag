const habitService = require("../services/habits.service");

const getAllHabits = async (req, res) => {
  const user = req.user;
  const { completed } = req.query;

  const filter = {};
  if (completed !== undefined) {
    filter.completed = completed === "true";
  }
  const Habit = await habitService.getAllHabits(user._id, filter);
  res.json({ Habit });
};

const getHabitById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const habit = await habitService.getHabitById(id, user._id);

  if (habit) {
    res.json(habit);
  } else {
    res.status(404).json({ message: `habit ${id} not found` });
  }
};

const createHabit = async (req, res) => {
  const user = req.user;
  if (!req.body) {
    return res.status(400).json({
      message: `Body cannot be empty`,
    });
  }
  const newHabit = req.body;
  const keys = Object.keys(newHabit);
  const requireKeys = ["title", "description", "note", "completed"];

  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }
  const createHabit = await habitService.createHabit(newHabit,user._id);
  res. status(201).json({ message: "Habit created", Habit: createHabit });
};


const updateHabitById = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).json({
      message: `Body cannot be empty`,
    });
  }

  const newHabit = req.body;

  const keys = Object.keys(newHabit);
  const requireKeys = ["title", "goal", "frequency"];
  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }

  const updateHabit = await habitsService.updateHabitById(
    id,
    newHabit,
    user._id
  );

  if (updateHabit) {
    res.json({
      message: `Habit ${id} updated successfully`,
      habit: updateHabit,
    });
  } else {
    res.status(404).json({ message: `Habit ${id} not found` });
  }
};

const deleteHabitById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const isDeleted = await habitService.deleteHabitById(id, user._id);

  if (isDeleted) {
    res.json({ message: `Habit ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Habitn with ${id} not found` });
  }
};
module.exports = {
  getAllHabits,
  getHabitById,
  createHabit,
  updateHabitById,
  deleteHabitById
};
