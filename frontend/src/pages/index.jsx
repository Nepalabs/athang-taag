import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { deleteTodo, getAllTodos } from "../api/api";

const initialData = {
    title: "",
    description: "",
    note: "",
    completed: false,
};

const Home = () => {
    const [form, setForm] = useState({ ...initialData });
    const [todos, setTodos] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { user, logout } = useAuth();

    const isUpdate = !!form._id;

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await getAllTodos();
        setTodos(response.data?.todos || []);
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
            const response = await deleteTodo(id);
            if (response && response.data) {
                await fetchTodos();
            }
        } catch (error) {
            console.error(error);
        };
    }
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setForm({ ...form, [name]: name === "completed" ? checked : value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            let response;
            if (isUpdate) {
                response = await updateTodo(form._id, form);
            } else {
                response = await createTodo(form);
            }
            if (response && response.data) {
                await fetchTodos();
                handleDialog(false);
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleUpdate = (todo) => {
        const { userId, _v, ...date } = todo;
        handleDialog(true);
        setForm(data);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">LWP todo</div>
                <div className="nav-right">
                    <span className="user-info">{user?.name || "user"}</span>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="todo-container">
                <h1>Todo List</h1>
                <button className="add-button" onClick={handleDialog(true)}>
                    Add
                </button>
                <ul className="todo-list">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <li key={todo._id} className="todo-item">
                                <div>
                                    <p className="todo-title">{todo.title}</p>
                                    <p>{todo.description}</p>
                                    <small>{todo.note}</small>
                                    {todo.completed && <p className="completed">Completed</p>}
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        className="update-button"
                                        onClick={() => handleUpdate(todo)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div style={{ fontSize: "1.8em" }}>
                            No todos. Start creating Todo
                        </div>
                    )}
                </ul>

                {isDialogOpen && (
                    <div className="dialog-overlay">
                        <div className="dialog">
                            <h2>{isUpdate ? "Update Todo" : "Add todo"}</h2>
                            <form className="todo-from" onSubmit={handleSubmit}>
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
                                    <button type="button" onClick={() => handleDialog(false)}>Cancle</button>
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
