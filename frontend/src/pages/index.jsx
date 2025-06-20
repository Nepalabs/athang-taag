import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1 className="main-title">Welcome to the Habit Tracker</h1>

        <section className="section">
          <h2 className="section-title">Featured Habits: Start Here</h2>
          <p>
            Just like travel destinations, some habits stand out for their
            transformative potential. Here are a few top picks to begin with:
          </p>
          <ul>
            <li>
              <strong>Daily Meditation</strong>: Just 10 minutes a day can
              reduce stress and increase focus.
            </li>
            <li>
              <strong>Regular Exercise</strong>: Boosts energy levels, improves
              mood, and enhances physical health.
            </li>
            <li>
              <strong>Journaling</strong>: Helps you reflect, plan, and stay
              mindful of your progress.
            </li>
          </ul>
        </section>

        <section className="section">
          <h2 className="section-title">Recent Habit Spotlight</h2>
          <p>
            Recently, one popular addition is the{" "}
            <strong>“Digital Detox”</strong> habit. By taking a short break from
            screens daily, users report feeling more present, productive, and
            peaceful. Each small step, like limiting social media time or
            turning off notifications after hours, adds up to significant mental
            clarity.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Habit Tips: Your Roadmap to Success</h2>
          <ul>
            <li>
              <strong>Start Small</strong>: Choose one habit and commit to just
              a few minutes a day.
            </li>
            <li>
              <strong>Be Consistent</strong>: Consistency is more important than
              perfection.
            </li>
            <li>
              <strong>Track Your Progress</strong>: Use our Habit Tracker to log
              your habits daily. Visual progress keeps motivation high.
            </li>
            <li>
              <strong>Celebrate Wins</strong>: Whether it’s a full week of water
              intake or finally reading that book, celebrate every milestone.
            </li>
          </ul>
        </section>

        <div className="conclusion">
          <p>
            <strong>
              The Habit Tracker isn’t just an app — it’s your partner in growth.
            </strong>
            Whether you’re just getting started or refining your routine, we’re
            here to support your journey every step of the way.
          </p>
          <p>
            Ready to take the first step? Let’s build better habits — together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
