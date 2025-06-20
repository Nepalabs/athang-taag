import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import "./index.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-heading">Your Profile</h1>

        <div className="profile-detail">
          <span className="profile-label">Name:</span> {user.name}
        </div>

        <div className="profile-detail">
          <span className="profile-label">Email:</span> {user.email}
        </div>

        <div className="profile-detail">
          <span className="profile-label">Phone Number:</span>{" "}
          {user.phoneNumber}
        </div>

        <div className="profile-detail">
          <span className="profile-label">Gender:</span> {user.gender}
        </div>
      </div>
    </div>
  );
};

export default Profile;
