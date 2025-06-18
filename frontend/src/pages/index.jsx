import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../api/api";

const initialData = {
  title: "",
  description: "",
  note: "",
  completed: false,
};

const Home = () => {
  const [form, setForm] = useState({ ...initialData });
  const [habits, setHabits] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
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
    setForm({ ...form, [name]: name === "completed" ? checked : value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

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
    const { userId, _v, ...data } = habit;
    handleDialog(true);
    setForm(data);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">My Habits</div>
        <div className="nav-right">
          <span className="user-info">{user?.name || "user"}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="habit-container">
        <h1>Habit List</h1>
        <button className="add-button" onClick={() => handleDialog(true)}>
          Add
        </button>
        <ul className="habit-list">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <li key={habit._id} className="habit-item">
                <div>
                  <p className="habit-title">{habit.title}</p>
                  <p>{habit.description}</p>
                  <small>{habit.note}</small>
                  {habit.completed && <p className="completed">Completed</p>}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(habit)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(habit._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div style={{ fontSize: "1.8em" }}>
              No Habits. Start creating Habit
            </div>
          )}
        </ul>

        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h2>{isUpdate ? "Update Habit" : "Add Habit"}</h2>
              <form className="habit-from" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="note"
                  placeholder="Note"
                  value={form.note}
                  onChange={handleChange}
                />

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
    </div>
  );
};

export default Home;
