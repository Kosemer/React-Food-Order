import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { useState } from "react";

function Meals() {
  const [meals, setMeals] = useState([]);

  const fetchMealsHandler = async () => {
    const response = await fetch(
      "https://meals-afbb8-default-rtdb.firebaseio.com/meals.json"
    );
    const data = await response.json();

    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
  };

  return (
    <Fragment>
      <MealsSummary></MealsSummary>
      <AvailableMeals meals={meals} fetchMealsHandler={fetchMealsHandler}></AvailableMeals>
    </Fragment>
  );
}

export default Meals;
