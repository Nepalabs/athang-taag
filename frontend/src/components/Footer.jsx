import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company">
          <h2>Athang Taag Habit Tracker</h2>
          <p className="tagline">Advance Habit Tracker</p>
          <p className="location">Bumthang, Bhutan</p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:jimmyongdue@gmail.com">jimmyongdue@gmail.com</a>
          </p>
          <p>
            Phone: <a href="tel:+97517577965">+975 17 577 965</a>
          </p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Athang Taag Habit Tracker Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
