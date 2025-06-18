import { useState, useEffect } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000", {
          withCredentials: true,
        });
        setMessage(response.data.message);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
