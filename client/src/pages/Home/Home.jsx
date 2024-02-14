import React, { useState } from "react";
import styles from "./Home.module.css";
import Vendor from "../Vendor/Vendor.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import AmericanTruck from "../../assets/AmericanTruck.png";
import AsianTruck from "../../assets/AsianTruck.png";
import bevtruck from "../../assets/bevtruck.png";
import HealthyTruck from "../../assets/HealthyTruck.png";
import ItalianTruck from "../../assets/ItalianTruck.png";
import tacotruck from "../../assets/tacotruck.png";
import { useQuery } from "@apollo/client";
import { QUERY_FOOD_TRUCKS } from "../../utils/queries.js";
import { QUERY_CATEGORIES } from "../../utils/queries.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const [prevClicked, setPrevClicked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const { loading, data } = useQuery(QUERY_FOOD_TRUCKS);
  const categoryData = useQuery(QUERY_CATEGORIES);
  console.log("LOADING CATEGORIES");
  console.log(categoryData.data?.categories);
  const categoryList = categoryData.data?.categories || [];
  const vendorList = data?.foodTrucks || [];

  const nextVendors = () => {
    setStartIndex((prevIndex) =>
      prevIndex + (window.innerWidth < 768 ? 1 : 3) >= vendorList.length
        ? 0
        : prevIndex + (window.innerWidth < 768 ? 1 : 3)
    );
    setNextClicked(true);
    setPrevClicked(false);
    setTimeout(() => setNextClicked(false), 500);
  };

  const prevVendors = () => {
    setStartIndex((prevIndex) =>
      prevIndex - (window.innerWidth < 768 ? 1 : 3) < 0
        ? vendorList.length - (window.innerWidth < 768 ? 1 : 3)
        : prevIndex - (window.innerWidth < 768 ? 1 : 3)
    );
    setPrevClicked(true);
    setNextClicked(false);
    setTimeout(() => setPrevClicked(false), 500);
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.vendorContainer}>
        <h1 className="pb-2 mx-5">Local Vendors</h1>
        <p className="pb-2 mx-5"></p>
        <h3>Find Flavor on Wheels: Food Truck Depot, Your Culinary Compass!</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.vendorCarousel}>
            <div
              className={`${styles.navIcon} ${
                prevClicked ? styles.clicked : ""
              }`}
              onClick={prevVendors}
            >
              <FontAwesomeIcon icon={faIceCream} size="3x" rotation={90} />
            </div>
            <div className={styles.vendorList}>
              {vendorList
                .slice(
                  startIndex,
                  startIndex + (window.innerWidth < 768 ? 1 : 3)
                )
                .map((vendor, index) => (
                  <div className={styles.vendorItem} key={vendor._id}>
                    <Vendor vendor={vendor} />
                  </div>
                ))}
            </div>
            <div
              className={`${styles.navIcon} ${
                nextClicked ? styles.clicked : ""
              }`}
              onClick={nextVendors}
            >
              <FontAwesomeIcon icon={faIceCream} size="3x" rotation={270} />
            </div>
          </div>
        )}
        <h1> Explore by Category </h1>
        {categoryData.loading ? (
          <div>LOADING</div>
        ) : (
          <>
            <div className={styles.categoriesContainer}>
              {categoryList.map((category, index) => (
                <Link
                  to={category.name}
                  key={`category-${index}`}
                  className={styles.categoryLink}
                >
                  <div
                    className={styles.categoryTile}
                    key={`category-${index}`}
                  >
                    <img
                      className={styles.categoryImage}
                      src={category.image}
                      alt={category.name}
                    />
                    <h2 className={styles.categoryName}>{category.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
