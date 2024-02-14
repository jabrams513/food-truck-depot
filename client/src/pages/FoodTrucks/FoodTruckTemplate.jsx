import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styles from "./FoodTruckPage.module.css";
import { QUERY_FOOD_TRUCK_BY_ID } from "../../utils/queries.js"; 

const FoodTruckPage = () => {
  let { truckId } = useParams();
  console.log(truckId)
  const { loading, error, data } = useQuery(QUERY_FOOD_TRUCK_BY_ID, {
    variables: { truckId },
  });

  console.log(data)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // if (!data || !data.foodTruck) return <div>Truck not found</div>;

  const {
    vendorName,
    description,
    image,
    popular,
    owner,
    location,
    latitude,
    longitude,
    category
  } = data.foodTruckById;



  return (
    <div>
      <h1 className={styles.foodTruckTitle}>Food Truck Page</h1>
      <div className={styles.vendorList}>
        <div className={styles.vendorItem}>
          <img src={image} alt={vendorName} className={styles.truckImage} />
          <h2>{vendorName}</h2>
          <p>Description: {description}</p>
          <p>Popular: {popular}</p>
          <p>Owner: {owner}</p>
          <p>Location: {location}</p>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>Category: {category}</p>
          <Link to="/reservations">Book Us</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodTruckPage;
