import React from 'react';
import Category from './category';
import salami from "../../assets/vendor2.png";
import weiner from "../../assets/vendor8.png";

const American = () => {
  return (
    <div>
      <h1 className="title">American</h1>
      <div className="cuisine">
        <Category
          image={salami}
          name="Sal's Salami"
          description="Mobile Deli serving italian classics"
        />
        <Category
          image={weiner}
          name="Weiner Mobile"
          description="The Oscar Mayer Legend"
        />
      </div>
    </div>
  );
};

export default American;
