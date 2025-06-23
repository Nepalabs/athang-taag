import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={styles.loadingContainer}>
        <Navbar />
        <p style={styles.loadingText}>Loading your profile...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={styles.header}>
        <h1 style={styles.headerText}>👤 Your Profile</h1>
        <p style={styles.headerSubtitle}>
          Here’s your personal dashboard. Stay updated and in control.
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.avatarContainer}>
            <div
              style={{
                ...styles.avatar,
                backgroundColor:
                  user.gender === "Female"
                    ? "#fed7e2"
                    : user.gender === "Male"
                    ? "#bee3f8"
                    : "#e2e8f0",
              }}
            >
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          <h2 style={styles.name}>{user.name}</h2>

          <div style={styles.infoGroup}>
            <span style={styles.label}>📧 Email</span>
            <p style={styles.value}>{user.email || "Not provided"}</p>
          </div>

          <div style={styles.infoGroup}>
            <span style={styles.label}>📱 Phone Number</span>
            <p style={styles.value}>{user.phoneNumber || "Not provided"}</p>
          </div>

          <div style={styles.infoGroup}>
            <span style={styles.label}>🚻 Gender</span>
            <p style={styles.value}>{user.gender || "Not specified"}</p>
          </div>

          <div style={styles.infoGroup}>
            <span style={styles.label}>🌟 About</span>
            <p style={styles.value}>
              Passionate learner and builder who believes in consistent habits
              and community-driven growth.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "3rem 1.5rem 2rem",
    textAlign: "center",
  },
  headerText: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  headerSubtitle: {
    fontSize: "1.1rem",
    marginTop: "0.5rem",
    opacity: 0.9,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "3rem 1rem",
    backgroundColor: "#f7fafc",
  },
  card: {
    background: "rgba(255, 255, 255, 0.85)",
    borderRadius: "20px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.1)",
    padding: "2.5rem 2rem",
    maxWidth: "500px",
    width: "100%",
    backdropFilter: "blur(10px)",
    animation: "fadeIn 0.6s ease-out",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  avatar: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    fontSize: "2.4rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2d3748",
    border: "4px solid #fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  name: {
    fontSize: "1.75rem",
    textAlign: "center",
    color: "#2d3748",
    marginBottom: "2rem",
    fontWeight: "600",
  },
  infoGroup: {
    marginBottom: "1.25rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#4a5568",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "block",
    marginBottom: "0.3rem",
  },
  value: {
    fontSize: "1.05rem",
    color: "#2d3748",
    lineHeight: "1.5",
  },
  button: {
    marginTop: "2rem",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    color: "#fff",
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  loadingContainer: {
    minHeight: "100vh",
    backgroundColor: "#edf2f7",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4rem",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#4a5568",
  },
};

export default Profile;
