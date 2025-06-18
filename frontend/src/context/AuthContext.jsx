import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isloggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    getLoggedInUser();
  }, []);

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("taag-token");
      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/auth/loggedin-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoggedIn(true);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("taag-token");
      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }
      await axios.delete("http://localhost:3000/auth/signout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoggedIn(false);
      setUser({});
      localStorage.setItem("taag-token", "");
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isloggedIn, isLoading, user, getLoggedInUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
