import React, { useState } from "react";
import AvailableMeals from "../Meals/AvailableMeals";
import App from '../../App'
import CartProvider from "../../store/CartProvider";

const HttpContext = React.createContext(function HttpRequest() {
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
})



export default HttpContext;
