import React, { useState } from "react";

const teamMembers = [
  {
    name: "Jigme Wangdi",
    role: "Team leader and full stack developer",
    image: "https://avatars.githubusercontent.com/u/205863656?v=4",
    bio: "Jigme keeps the team on track and ensures projects are delivered efficiently.",
    social: "https://github.com/jigme",
  },

  {
    name: "Yeshi Choden",
    role: "Content Creator",
    image: "https://avatars.githubusercontent.com/u/205859634?v=4",
    bio: "Yeshi builds engaging and informative content to connect with our users.",
    social: "https://linkedin.com/in/yeshichoden",
  },

  {
    name: "Susma Gurung",
    role: "Backend Developer",
    image: "https://avatars.githubusercontent.com/u/206171620?v=4",
    bio: "Susma loves crafting scalable APIs and managing complex backend systems.",
    social: "https://github.com/susma",
  },

  {
    name: "Ugyen Choden",
    role: "Frontend Developer",
    image: "https://avatars.githubusercontent.com/u/205810978?v=4",
    bio: "Ugyen is passionate about building user-friendly, accessible web interfaces with React.",
    social: "https://linkedin.com/in/ugyen",
  },

  {
    name: "Pema Choden",
    role: "Designer",
    image: "https://avatars.githubusercontent.com/u/206161634?v=4",
    bio: "Pema creates beautiful and intuitive designs with a user-first mindset.",
    social: "https://dribbble.com/pemachoden",
  },
];

const Team = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌟 Meet the Team Behind Habit</h2>
      <p style={styles.subtitle}>
        We're a team of thinkers, doers, designers, and builders united by a
        common goal — to help people form meaningful habits that stick for life.
      </p>

      <div style={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(hoveredCard === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img src={member.image} alt={member.name} style={styles.image} />
            <h3 style={styles.name}>{member.name}</h3>
            <p style={styles.role}>{member.role}</p>
            <p style={styles.bio}>{member.bio}</p>
            <a
              href={member.social}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              🔗 Connect
            </a>
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
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #fefefe, #f3f4f6)",
    borderRadius: "12px",
  },
  title: {
    fontSize: "2.75rem",
    marginBottom: "0.75rem",
    color: "#1a202c",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "3rem",
    color: "#4a5568",
    fontWeight: "500",
    maxWidth: "720px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  teamGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "2rem 1.5rem",
    width: "260px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "1rem",
    border: "4px solid #4299e1",
  },
  name: {
    fontSize: "1.4rem",
    color: "#2d3748",
    fontWeight: "700",
    margin: "0.5rem 0 0.2rem",
  },
  role: {
    fontSize: "1.1rem",
    color: "#4a5568",
    fontWeight: "500",
    marginBottom: "0.6rem",
  },
  bio: {
    fontSize: "0.95rem",
    color: "#718096",
    marginBottom: "1rem",
    lineHeight: "1.4",
  },
  link: {
    fontSize: "0.95rem",
    color: "#3182ce",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s",
  },
};

export default Team;
