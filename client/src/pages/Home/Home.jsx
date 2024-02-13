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

// Define the vendors array inside the component
const vendors = [
  {
    vendorName: "Pappy's Papaya",
    location: "Sutton Place",
    latitude: "40.758505",
    longitude: "-73.962029",
    description: "Fruit smoothies",
    image: "pic1",
    popular: "Trop, Gluten Free, CoCoNutty",
  },
  {
    vendorName: "Sal's Salami",
    location: "Upper East Side",
    latitude: "34.0522",
    longitude: "-118.2437",
    description: "Deli counter on wheels",
    image: "pic2",
    popular: "Italian Hoagie & Chicken Parm & Philly Cheesesteak",
  },
  {
    vendorName: "Paco's Tacos",
    location: "Pelham Parkway",
    latitude: "51.5074",
    longitude: "-0.1278",
    description: "Comida a la plancha",
    image: "pic3",
    popular: "Carne Asada, Leche Flan, Eloté",
  },
  {
    vendorName: "Soup Station",
    location: "Williamsburg",
    latitude: "-22.9068",
    longitude: "-43.1729",
    description: "Savor our warmth",
    image: "pic4",
    popular: "Beef Barley & Chicken Noodle & Split Pea",
  },
  {
    vendorName: "Driftin' Desserts",
    location: "East Village",
    latitude: "35.6895",
    longitude: "139.6917",
    description: "Out of this world desserts",
    image: "pic5",
    popular: "Marshmallow Magic Brownies, NY Cheesecake, Milkshakes",
  },
  {
    vendorName: "Noodle Scooter",
    location: "Chinatown",
    latitude: "40.7128",
    longitude: "-74.0060",
    description: "Don't be shy... slurp us",
    image: "pic6",
    popular: "Ramen & Pho & Pancit & Jap Chae",
  },
  {
    vendorName: "Bean Machine",
    location: "Jackson Heights",
    latitude: "-33.8688",
    longitude: "151.2093",
    description: "We're good for your heart",
    image: "pic7",
    popular: "Falafel, Chili, Feijoada",
  },
  {
    vendorName: "Weiner Mobile",
    location: "Central Park",
    latitude: "48.8566",
    longitude: "2.3522",
    description: "The Oscar Mayer Legend",
    image: "pic8",
    popular: "Chicago Dog, Kielbasa, Cocktail Bucket",
  },
];
const categories = [
  {
    name: "American",
    image: AmericanTruck,
    link: "/american",
  },
  {
    name: "Healthy",
    image: HealthyTruck,
    link: "/healthy",
  },
  {
    name: "Italian",
    image: ItalianTruck,
    link: "/italian",
  },
  { name: "Latin", image: tacotruck, link: "/latin" },
  { name: "Asian", image: AsianTruck, link: "/asian" },
  {
    name: "Beverages",
    image: bevtruck,
    link: "/beverages",
  },
];

export { vendors }; // Export the vendors array

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
                <a
                  href={category.link}
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
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
