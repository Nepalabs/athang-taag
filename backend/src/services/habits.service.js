const habits = require("../models/habit");

const updateHabitById = async (id, newHabit, loggedInUserId) => {
  const update = await habits.updateOne(
    { _id: id, userId: loggedInUserId },
    { $set: newHabit }
  );
  if (update.matchedCount > 0) {
    const updatedHabit = await habits.findOne({ _id: id });
    return updatedHabit;
  } else {
    return;
  }
};

module.exports = {
  updateHabitById,
};
