import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/foodtruck.png";
import { useState } from "react";

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);

  const handleSignOut = () => {
    console.log("User Signed out");
    localStorage.removeItem("accessToken");
    // Perform any other sign-out actions if needed
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.dropdown}>
        <div className={styles.hamburgerWrapper}>
          <div className={styles.hamburgerPositioner}>
            <input
              type="checkbox"
              id="hamburger"
              className={styles.hamburgerCheckbox}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            />
            <label htmlFor="hamburger" className={styles.hamburger}>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </label>
          </div>
        </div>
        {isChecked && (
          <div className={styles.dropdownContent}>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/addtruck">Add Truck</Link>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
            <a href="#" onClick={handleSignOut}>
              Sign out
            </a>
          </div>
        )}
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>
      <div className={styles.logo}>
        <p className={styles.logoText}> Food Truck Depot </p>
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Navbar;
