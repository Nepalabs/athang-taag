import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import "../css/Home.css";

const imageList = [
  {
    url: "https://meditationinsydney.com/wp-content/uploads/2024/04/Benefits-of-meditation-God-light.jpg",
  },
  {
    url: "https://goqii.com/blog/wp-content/uploads/6-Health-Benefits-of-Playing-Sports-1024x683.jpg",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgCFto2O9UmwGA9kTzPUJpIuGad5f5gCoUw&s",
  },
  {
    url: "https://cdn-magazine.nutrabay.com/wp-content/uploads/2023/02/strong-bodybuilder-doing-heavy-weight-exercise-back-machine-1.jpg",
  },
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="home-container">
        <div className="content">
          <div className="image-gallery">
            <img
              className="habit-image sliding-image"
              src={imageList[currentImageIndex].url}
              alt={imageList[currentImageIndex].alt}
            />
          </div>
        </div>
      </div>
      <div className="content">
        <h1 className="main-title">Welcome to the Habit Tracker</h1>

        <section className="section">
          <h2 className="section-title">Featured Habits: Start Here</h2>
          <p>
            Just like travel destinations, some habits stand out for their
            transformative potential. Here are a few top picks to begin with:
          </p>

          <div className="habit-cards">
            <div className="habit-card">
              <span role="img" aria-label="Meditation">
                🧘‍♀️
              </span>
              <h3>Meditation</h3>
              <p>Just 10 minutes a day can reduce stress and increase focus.</p>
            </div>

            <div className="habit-card">
              <span role="img" aria-label="Exercise">
                🏃‍♂️
              </span>
              <h3>Exercise</h3>
              <p>
                Boosts energy levels, improves mood, and strengthens your body.
              </p>
            </div>

            <div className="habit-card">
              <span role="img" aria-label="Journaling">
                📓
              </span>
              <h3>Journaling</h3>
              <p>Reflect, plan, and stay mindful of your progress.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Recent Habit Spotlight</h2>
          <p>
            Recently, one popular addition is the{" "}
            <strong>“Digital Detox”</strong> habit. By taking a short break from
            screens daily, users report feeling more present, productive, and
            peaceful.
          </p>
        </section>

        <div className="image-gallery">
          <section className="section">
            <h2 className="section-title">
              Habit Tips: Your Roadmap to Success
            </h2>
            <ul>
              <li>
                <strong>Start Small:</strong> Begin with just a few minutes a
                day.
              </li>
              <li>
                <strong>Be Consistent:</strong> Progress is built by showing up
                daily.
              </li>
              <li>
                <strong>Track Your Progress:</strong> Use our tracker to stay
                motivated.
              </li>
              <li>
                <strong>Celebrate Wins:</strong> Milestones matter — big or
                small!
              </li>
            </ul>
          </section>
        </div>

        <div className="conclusion">
          <p>
            <strong>
              The Habit Tracker isn’t just an app — it’s your partner in growth.
            </strong>
          </p>
          <p>
            Ready to take the first step? Let’s build better habits — together.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
