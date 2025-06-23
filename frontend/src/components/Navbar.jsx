import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { isloggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>

      <div className="nav-links">
        <Link to="/habits">Habits</Link>
        <Link to="/about">About</Link>
        {isloggedIn && <Link to="/profile"> Profile </Link>}

        <div className="nav-right">
          {isloggedIn ? (
            <button onClick={handleLogout}> Logout </button>
          ) : (
            <Link to="/login"> Login </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
