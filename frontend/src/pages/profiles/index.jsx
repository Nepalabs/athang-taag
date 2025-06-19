import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./index.css"

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
      <div className={styles.profileContainer}>
        <h1 className={styles.heading}>Your Profile</h1>

        <div className={styles.userDetail}>
          <span className={styles.label}>Name:</span> {user.name}
        </div>

        <div className={styles.userDetail}>
          <span className={styles.label}>Email:</span> {user.email}
        </div>

        <div className={styles.userDetail}>
          <span className={styles.label}>Phone Number:</span> {user.tel}
        </div>

        <div className={styles.userDetail}>
          <span className={styles.label}>Gender:</span> {user.gender}
        </div>
      </div>
    </div>
  );
};

export default Profile;
