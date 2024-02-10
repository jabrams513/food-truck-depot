import styles from "./Navbar.module.css";
import logo from "../../assets/foodtruck.png";
import { useState } from "react";

const Navbar = () => {

  const [isChecked, setIsChecked] = useState(false);  
  console.log(isChecked)
  return (
    <div className={styles.navbar}>
      <div className={styles.dropdown}>
        <div className={styles.hamburgerWrapper}>
        <div className={styles.hamburgerPositioner}>
          <input type="checkbox" id="hamburger" className={styles.hamburgerCheckbox} onChange={()=>{setIsChecked(!isChecked)}} />
          <label htmlFor="hamburger" className={styles.hamburger}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </label>
        </div>
      </div>
        {isChecked && <div className={styles.dropdownContent}>
          <a href="#">Home</a>
          <a href="#">Favorites</a>
          <a href="#">Login</a>
          <a href="#">Sign Up</a>
          <a href="#">Sign out</a>
        </div>}
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
