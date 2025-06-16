import axios from "axios";
import { usestate } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = usestate({ ...initialData });

  const [error, setError] = usestate("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setError("Password and confrim password does not matched");
        return;
      }
      const response = await axios.post("htto://localhost:3000/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });
      console.log(response.data);
      setError("");
      setFormData({ ...initialData });
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "some error occured");
    }
  };
  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Register</h2>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ConfirmPassword
          <input
            type="text"
            name="confirmpassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          PhoneNumber
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="register-error">{error}</p>}
        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
