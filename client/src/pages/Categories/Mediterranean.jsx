import React from "react";
import Category from "./category";
import papaya from "../../assets/vendor1.png";
import bean from "../../assets/vendor7.png";

const Mediterranean = () => {
  return (
    <div className="cuisine">
      <Category
        image={papaya}
        name="Pappy's Papaya"
        description="Tropical smoothies"
      />
      <Category
        image={bean}
        name="Bean Machine"
        description="The magical fruit"
      />
    </div>
  );
};

export default Mediterranean;
