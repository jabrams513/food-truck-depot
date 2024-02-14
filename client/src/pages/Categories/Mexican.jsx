import React from 'react';
import Category from './category';
import tacos from "../../assets/vendor3.png";
import bean from "../../assets/vendor7.png";

const Mexican = () => {
  return (
    <div className="cuisine">
      <Category
        image={tacos}
        name="Paco's Tacos"
        description="Mexican staples"
      />
      <Category
        image={bean}
        name="Bean Machine"
        description="The magical fruit"
      />
    </div>
  );
};

export default Mexican;
