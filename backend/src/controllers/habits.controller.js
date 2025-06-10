const habitsService = require("../services/habits.service");

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

module.exports = {
  updateHabitById,
};
