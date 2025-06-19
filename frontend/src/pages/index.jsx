import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../api/api";
import Navbar from "../components/Navbar";

const initialData = {
  title: "",
  goal: "",
  frequency: "daily",
  progress: [],
  completed: false,
};

const Home = () => {
  const [form, setForm] = useState({ ...initialData });
  const [habits, setHabits] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, logout } = useAuth();

  const isUpdate = !!form._id;

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const response = await getAllHabits();
    setHabits(response.data?.habits || []);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDialog = (isOpen) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      setForm({ ...initialData });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteHabit(id);
      if (response && response.data) {
        await fetchHabits();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "completed") {
      const currentDate = getDate();
      let updatedProgress = [...form.progress];

      const index = updatedProgress.findIndex(
        (entry) => entry.date === currentDate
      );

      if (index >= 0) {
        updatedProgress[index].status = checked;
      } else {
        updatedProgress.push({ date: currentDate, status: checked });
      }
      setForm({ ...form, completed: checked, progress: updatedProgress });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const getDate = () => new Date().toLocaleString();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      form.title = form.title.trim();
      form.goal = form.goal.trim();

      if (!isUpdate) {
        const currentDate = getDate();
        form.progress = [{ date: currentDate, status: form.completed }];
      }

      let response;
      if (isUpdate) {
        response = await updateHabit(form._id, form);
      } else {
        response = await createHabit(form);
      }

      if (response && response.data) {
        await fetchHabits();
        handleDialog(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (habit) => {
    const { userId, __v, ...data } = habit;
    handleDialog(true);
    setForm({
      title: data.title || "",
      goal: data.goal || "",
      frequency: data.frequency || "daily",
      progress: data.progress || [],
      completed: data.completed ?? false,
      _id: data._id,
    });
  };

  const handleNext = () => {
    if (habits.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % habits.length);
    }
  };

  const handlePrevious = () => {
    if (habits.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + habits.length) % habits.length
      );
    }
  };

  return (
    <div>
      <Navbar />


      <div className="habit-container">
        <h1>Habit List</h1>
        <button className="add-button" onClick={() => handleDialog(true)}>
          Add
        </button>

        <div className="habit-slider">
          {habits.length > 0 ? (
            <>
              <div className="habit-card">
                <p className="habit-title">
                  <strong>Habit:</strong> {habits[currentIndex].title}
                </p>
                <p>
                  <strong>Goal:</strong> {habits[currentIndex].goal}
                </p>
                <p>
                  <strong>Frequency:</strong> {habits[currentIndex].frequency}
                </p>

                <div>
                  <strong>Progress:</strong>
                  {habits[currentIndex].progress.length > 0 ? (
                    <ul>
                      {habits[currentIndex].progress.map((entry, index) => (
                        <li key={index}>
                          {new Date(entry.date).toLocaleString()}
                          {entry.status ? "✅" : "❌"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No progress yet</div>
                  )}
                </div>

                {habits[currentIndex].completed && (
                  <p className="completed">Completed</p>
                )}
                <div className="habit-actions">
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(habits[currentIndex])}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(habits[currentIndex]._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="slider-controls">
                <button onClick={handlePrevious}>⟨ Prev</button>
                <span>
                  {currentIndex + 1} / {habits.length}
                </span>
                <button onClick={handleNext}>Next ⟩</button>
              </div>
            </>
          ) : (
            <div style={{ fontSize: "1.8em" }}>
              No Habits. Start creating Habit
            </div>
          )}
        </div>

        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h2>{isUpdate ? "Update Habit" : "Add Habit"}</h2>
              <form className="habit-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="goal"
                  placeholder="goal"
                  value={form.goal}
                  onChange={handleChange}
                  required
                />

                <label> Frequency: </label>
                <select
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                >
                  <option value="daily"> Daily </option>
                  <option value="weekly"> Weekly </option>
                </select>

                {isUpdate && (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="completed"
                      checked={form.completed}
                      onChange={handleChange}
                    />
                    <span>Completed</span>
                  </label>
                )}
                <div className="form-action">
                  <button type="button" onClick={() => handleDialog(false)}>
                    Cancel
                  </button>
                  <button type="submit">{isUpdate ? "Update" : "Add"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default Home;
