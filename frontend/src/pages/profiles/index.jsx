import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <h1>Your Profile</h1>

      <div>
        <strong>Name</strong> {user.name}
      </div>

      <div>
        <strong>Email</strong> {user.email}
      </div>

      <div>
        <strong>Phone Number: </strong> {user.tel}
      </div>

      <div>
        <strong>Gender</strong> {user.gender}
      </div>
    </div>
  );
};

export default Profile;
