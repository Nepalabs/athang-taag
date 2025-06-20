import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages";
import Profile from "../pages/profiles";
import About from "../pages/about";
import Habit from "../pages/habit/Habit";

const PrivateRoute = ({ children }) => {
  const { isloggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isloggedIn) {
    return children;
  }

  return <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route
        path="/habits"
        element={
          <PrivateRoute>
            <Habit />
          </PrivateRoute>
        }
      />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/profile" Component={Profile} />
      <Route path="/about" Component={About} />
    </Routes>
  );
};

export default AppRoutes;
