import React from 'react';
import Category from './category';
import dessert from "../../assets/vendor5.png";
import papaya from "../../assets/vendor1.png";

const Beverage = () => {
  return (
    <div className="cuisine">
      <Category
        image={dessert}
        name="Driftin' Desserts"
        description="If you've got a sweet tooth"
      />
      <Category
        image={papaya}
        name="Pappy's Papaya"
        description="Tropical smoothies"
      />
    </div>
  );
};

export default Beverage;