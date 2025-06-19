import React from "react";
const teamMembers = [
  {
    name: "Jigme Wangdi",
    role: "Frontend Developer",
    image: "https://avatars.githubusercontent.com/u/205863656?v=4",
  },
  {
    name: "Ugyen Choden",
    role: "Project Coordinator",
    image: "https://avatars.githubusercontent.com/u/205810978?v=4",
  },
  {
    name: "Pema choden",
    role: "Designer",
    image: "https://avatars.githubusercontent.com/u/206161634?v=4",
  },
  {
    name: "Susma Gurung",
    role: "Backend Developer",
    image: "https://avatars.githubusercontent.com/u/206171620?v=4",
  },
  {
    name: "Yeshi choden",
    role: "Content Creator",
    image: "https://avatars.githubusercontent.com/u/205859634?v=4",
  },
];

const Team = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Meet the Team Behind Habit</h2>
      <p style={styles.subtitle}>
        We're a group of passionate creators, designers, and developers
        dedicated to helping people build better habits, stay motivated, and
        transform their daily routines for long-term success.
      </p>
      <div style={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.card}>
            <img src={member.image} alt={member.name} style={styles.image} />
            <h3 style={styles.name}>{member.name}</h3>
            <p style={styles.role}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 1.5rem",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: "2.75rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2.5rem",
    color: "#4a5568",
    fontWeight: "500",
  },
  teamGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "2.5rem",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "1.5rem",
    width: "220px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  },
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "110px",
    height: "110px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "1.2rem",
    border: "4px solid #3182ce",
  },
  name: {
    fontSize: "1.3rem",
    margin: "0.5rem 0 0.3rem",
    color: "#2d3748",
    fontWeight: "600",
  },
  role: {
    fontSize: "1rem",
    color: "#718096",
    fontWeight: "400",
  },
};
export default Team;
