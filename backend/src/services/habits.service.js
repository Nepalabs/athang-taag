const habits = require("../models/habit");


const getAllHabits =  async (loggedInUserId, filter = {}) => {
  const habit = await habits.find ({ userId: loggedInUserId, ...filter });
  return habit;
};

const getHabitById = async (id, loggedInUserId) => {
  const habit = await habits.findOne({ _id: id, userId: loggedInUserId });
  return habit;
};
module.exports = {
  getAllHabits,
  getHabitById
}

