import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import axios from "./config/axiosConfig";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/", {
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
