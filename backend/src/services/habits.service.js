const Habits = require("../models/habit");


const getAllHabits =  async (loggedInUserId, filter = {}) => {
  const habit = await Habits.find ({ userId: loggedInUserId, ...filter });
  return habit;
};

const getHabitById = async (id, loggedInUserId) => {
  const habit = await Habits.findOne({ _id: id, userId: loggedInUserId });
  return habit;
};

const createHabit = async (newHabit, loggedInUserId) => {
  newHabit.userId = loggedInUserId;
  const savedHabit = await Habits.create(newHabit);
  return savedHabit;
};

const updateHabitById = async (id, newHabit, loggedInUserId) => {
  const update = await Habits.updateOne(
    { _id: id, userId: loggedInUserId },
    { $set: newTodo }
  );
  if (update.matchedCount > 0) {
  const updateHabit = await Habits.findOne({ _id: id});
  return updateHabit;
  } else {
    return;
  }
};

const deleteHabitById = async (id, loggedInUserId) => {
  const deleted = await Habits.deleteOne({ _id: id, userId: loggedInUserId});

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
  deleteHabitById
};

