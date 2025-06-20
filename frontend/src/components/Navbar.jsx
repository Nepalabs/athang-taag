import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { isloggedIn, user, toggleAuth } = useAuth();

  // const handleLogout = () => {
  //   logout();
  // };

  const handleAuth = () => {
    if (isloggedIn) {
      toggleAuth();
      Navigate("/");
    } else {
      Navigate("/login");
    }
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
          <span className="user-info">{user?.name || " "}</span>
          <button className="logout-button" onClick={handleAuth}>
            {isloggedIn ? `Logout` : `Login`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
