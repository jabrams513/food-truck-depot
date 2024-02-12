import React, { useState } from 'react';
import styles from "./Home.module.css";
import Vendor from '../Vendor/Vendor.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';

// Define the vendors array inside the component
const vendors = [
  { vendorName: "Pappy's Papaya", location: "Sutton Place", latitude: "40.758505", longitude: "-73.962029", description: "Fruit smoothies", image: "pic1", popular: "Trop, Gluten Free, CoCoNutty" },
  { vendorName: "Sal's Salami", location: "Upper East Side", latitude: "34.0522", longitude: "-118.2437", description: "Deli counter on wheels", image: "pic2", popular: "Italian Hoagie & Chicken Parm & Philly Cheesesteak" },
  { vendorName: "Paco's Tacos", location: "Pelham Parkway", latitude: "51.5074", longitude: "-0.1278", description: "Comida a la plancha", image: "pic3", popular: "Carne Asada, Leche Flan, Eloté" },
  { vendorName: "Soup Station", location: "Williamsburg", latitude: "-22.9068", longitude: "-43.1729", description: "Savor our warmth", image: "pic4", popular: "Beef Barley & Chicken Noodle & Split Pea" },
  { vendorName: "Driftin' Desserts", location: "East Village", latitude: "35.6895", longitude: "139.6917", description: "Out of this world desserts", image: "pic5", popular: "Marshamallow Magic Brownies, NY Cheesecake, Red Velvet Cupcake" },
  { vendorName: "Noodle Scooter", location: "Chinatown", latitude: "40.7128", longitude: "-74.0060", description: "Don't be shy... slurp us", image: "pic6", popular: "Ramen & Pho & Pancit & Jap Chae" },
  { vendorName: "Bean Machine", location: "Jackson Heights", latitude: "-33.8688", longitude: "151.2093", description: "We're good for your heart", image: "pic7", popular: "Falafel, Chili, Feijoada" },
  { vendorName: "Weiner Mobile", location: "Central Park", latitude: "48.8566", longitude: "2.3522", description: "The Oscar Mayer Legend", image: "pic8", popular: "Chicago Dog, Kielbasa, Cocktail Bucket" }
];

export { vendors }; // Export the vendors array

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const [prevClicked, setPrevClicked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const nextVendors = () => {
    setStartIndex((prevIndex) => (prevIndex + (window.innerWidth < 768 ? 1 : 3) >= vendors.length ? 0 : prevIndex + (window.innerWidth < 768 ? 1 : 3)));
    setNextClicked(true);
    setPrevClicked(false);
    setTimeout(() => setNextClicked(false), 500);
  };

  const prevVendors = () => {
    setStartIndex((prevIndex) => (prevIndex - (window.innerWidth < 768 ? 1 : 3) < 0 ? vendors.length - (window.innerWidth < 768 ? 1 : 3) : prevIndex - (window.innerWidth < 768 ? 1 : 3)));
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

        <div className={styles.vendorCarousel}>
          <div className={`${styles.navIcon} ${prevClicked ? styles.clicked : ''}`} onClick={prevVendors}>
            <FontAwesomeIcon icon={faIceCream} size="3x" rotation={90} />
          </div>
          <div className={styles.vendorList}>
            {vendors.slice(startIndex, startIndex + (window.innerWidth < 768 ? 1 : 3)).map((vendor, index) => (
              <div className={styles.vendorItem} key={`vendor-${vendor.vendorName}-${index}`}>
                <Vendor vendor={vendor} />
              </div>
            ))}
          </div>
          <div className={`${styles.navIcon} ${nextClicked ? styles.clicked : ''}`} onClick={nextVendors}>
            <FontAwesomeIcon icon={faIceCream} size="3x" rotation={270} />
          </div>
        </div>
      </div>
    </div>
  );
}
