import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import Home from "../pages/index";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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
      <Route path="/login" Component={Login} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="register" Component={Register} />
    </Routes>
  );
};

export default AppRoutes;
