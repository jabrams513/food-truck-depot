import React from 'react';
import Category from './category';
import salami from "../../assets/vendor2.png";
import noodles from "../../assets/vendor6.png";

const Italian = () => {
  return (
    <div className="cuisine">
      <Category
        image={salami}
        name="Sal's Salami"
        description="Mobile Deli serving italian classics"
      />
      <Category
        image={noodles}
        name="Noodle Scooter"
        description="Noodles from around the world"
      />
    </div>
  );
};

export default Italian;
