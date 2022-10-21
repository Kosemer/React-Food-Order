import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import {useEffect, useState} from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];



function AvailableMeals(props) {
  const meals = props.meals

    /*const [meals, setMeals] = useState([]);
  
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
    }

useEffect(() =>{
  fetchMealsHandler()
}, [])*/

useEffect(() =>{
  props.fetchMealsHandler()
}, [])

  console.log(props.meals)
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        
      </Card>
    </section>
  );
}

export default AvailableMeals;
