import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { useState } from "react";

function Meals() {

  return (
    <Fragment>
      <MealsSummary></MealsSummary>
      <AvailableMeals></AvailableMeals>
    </Fragment>
  );
}

export default Meals;
