import React from 'react';
import Category from './category';
import tacos from "../../assets/vendor3.png";
import papaya from "../../assets/vendor1.png";

const Healthy = () => {
  return (
    <div className="cuisine">
      <Category
        image={tacos}
        name="Paco's Tacos"
        description="Mexican staples"
      />
      <Category
        image={papaya}
        name="Pappy's Papaya"
        description="Tropical smoothies"
      />
    </div>
  );
};

export default Healthy;
