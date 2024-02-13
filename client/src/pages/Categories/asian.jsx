import React from 'react';
import Category from './category';
import soup from "../../assets/vendor4.png";
import noodles from "../../assets/vendor6.png";

const Asian = () => {
  return (
    <div className="cuisine">
      <Category
        image={soup}
        name="Soup Station"
        description="Comfort food in a bowl"
      />
      <Category
        image={noodles}
        name="Noodle Scooter"
        description="Noodles from around the world"
      />
    </div>
  );
};

export default Asian;
