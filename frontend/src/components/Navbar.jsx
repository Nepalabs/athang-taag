import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();

  const { loggedIn, toggleAuth, userName } = useAuth();

  const handleAuth = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      toggleAuth();
      navigate("/");
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
        to={"/"}
      >
        Home
      </Link>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to={"/habits"}>Habits</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/profile"}>Profile</Link>
        {loggedIn && <Link to={"/profile"}>profile</Link>}
        {!loggedIn ? (
          <>
            <button onClick={handleAuth}>Login</button>
          </>
        ) : (
          <>
            {userName}
            <button onClick={handleAuth}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
