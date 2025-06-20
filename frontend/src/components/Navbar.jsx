import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isloggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        zIndex: 1000,
      }}
    >
      <Link
        style={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          textDecoration: "none",
        }}
        to="/"
      >
        Home
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
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
