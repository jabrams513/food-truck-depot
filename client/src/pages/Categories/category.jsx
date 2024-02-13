import React from "react";
import styles from "./category.module.css";

const Category = ({ image, name, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.cardImage} />
        <div className={styles.cardInfo}>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
