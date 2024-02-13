import React from "react";
import { Link } from "react-router-dom";
import styles from "./FoodTruckPage.module.css";
import { vendors } from "../Home/Home.jsx"; 

const FoodTruckPage = ({ vendors, truckId }) => { 
  const findTruckById = (id) => {
    return vendors.find((truck) => truck.id === id); 
  };

  const truckData = findTruckById(truckId);

  if (!truckData) {
    return <div>Truck not found</div>;
  }

  return (
    <div>
      <h1>Food Truck Page</h1>
      <div className={styles.vendorList}>
        <div className={styles.vendorItem}>
          <FoodTruckTemplate truck={truckData} />
          <Link to="/reservations">Book Us</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodTruckPage;
