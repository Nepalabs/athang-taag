const req = require("express/lib/request");
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

module.exports = {
    getAllHabits,
    getHabitById

}
