const Habit = require("../models/habit.model");

const getAllHabits = async (loggedInUserId, filter = {}) => {
  const habits = await Habit.find({ userId: loggedInUserId, ...filter });
  return habits;
};

const getHabitById = async (id, loggedInUserId) => {
  const habit = await Habit.findOne({ _id: id, userId: loggedInUserId });
  return habit;
};

const createHabit = async (newHabit, loggedInUserId) => {
  newHabit.userId = loggedInUserId;
  const savedHabit = await Habit.create(newHabit);
  return savedHabit;
};

const updateHabitById = async (id, newHabit, loggedInUserId) => {
  const update = await Habit.updateOne(
    { _id: id, userId: loggedInUserId },
    { $set: newHabit }
  );
  if (update.matchedCount > 0) {
    const updateHabit = await Habit.findOne({ _id: id });
    return updateHabit;
  } else {
    return;
  }
};

const deleteHabitById = async (id, loggedInUserId) => {
  const deleted = await Habit.deleteOne({ _id: id, userId: loggedInUserId });

  if (deleted.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllHabits,
  getHabitById,
  createHabit,
  updateHabitById,
  deleteHabitById,
};
