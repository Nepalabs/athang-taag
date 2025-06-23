import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/api";
import "./Login.css";

const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { getLoggedInUser } = useAuth();

  const [formData, setFormData] = useState({ ...initialData });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await loginUser(formData);

      setError("");
      setFormData({ ...initialData });

      localStorage.setItem("taag-token", response.data.token);
      await getLoggedInUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Error occured");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3 className="login-title"> Login </h3>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">LogIn</button>
        <p className="login-link">
          No account to be found? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
