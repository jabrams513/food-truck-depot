import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/foodtruck.png";
import { useState, useEffect, useRef } from "react";
import Auth from "../../utils/auth";
const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsChecked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    console.log("User Signed out");
    Auth.logout();
  };

  const handleLinkClick = () => {
    setIsChecked(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <p className={styles.logoText}> Food Truck Depot </p> 
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
      <div className={styles.dropdown} ref={dropdownRef}>
        <div className={styles.hamburgerWrapper}>
          <div className={styles.hamburgerPositioner}>
            <input
              type="checkbox"
              id="hamburger"
              className={styles.hamburgerCheckbox}
              checked={isChecked}
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
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
            <Link to="/favorites" onClick={handleLinkClick}>
              Favorites
            </Link>
            <Link to="/map" onClick={handleLinkClick}>
              Map
            </Link>
            <Link to="/reservations" onClick={handleLinkClick}>
              Reservations
            </Link>
            <Link to="/addtruck" onClick={handleLinkClick}>
              Add Truck
            </Link>
            {!Auth.loggedIn() ? (
              <>
                {" "}
                <Link to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
                <Link to="/sign-up" onClick={handleLinkClick}>
                  Sign Up
                </Link>
              </>
            ) : (
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
