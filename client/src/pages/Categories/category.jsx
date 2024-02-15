import styles from "./category.module.css";
import { QUERY_FOOD_TRUCKS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
const Category = () => {
  let { categoryName } = useParams();
  console.log(categoryName);
  const { loading, data } = useQuery(QUERY_FOOD_TRUCKS);

  const vendorList = data?.foodTrucks || [];

  console.log("FOUND CATEGORIES");
  console.log(data);
  const categoryTrucks = vendorList.filter((vendor) => {
    if (vendor.category == categoryName) {
      return vendor;
    }
  });

  const jsxTrucks = categoryTrucks.map((truck) => {
    return (
      <div className={styles.cuisine}>
        <a href={`/food-truck/${truck._id}`}>
          <div className={styles.container}>
            <div className={styles.card}>
              <img
                src={truck.image}
                alt={truck.vendorName}
                className={styles.cardImage}
              />
              <div className={styles.cardInfo}>
                <h1>{truck.vendorName}</h1>
                <p>{truck.description}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  });

  if (loading) {
    return <div>LOADING...</div>;
  }
  return (
    <>
      <div>
        <h1>{categoryName}</h1>
      </div>
      {jsxTrucks}
    </>
  );
};

export default Category;
