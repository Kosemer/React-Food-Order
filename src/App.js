import { useState } from "react";
import Cart from "./components/Cart/Cart";
import HttpRequest from "./components/ConnectingDatabase/HttpRequest";
import Header from "./components/Layout/Header";
import AvailableMeals from "./components/Meals/AvailableMeals";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App(props) {

const [cartIsShow, setCartIsShow] = useState(false);

const showCartHandler = () => {
  setCartIsShow(true)
}

const hideCartHandler = () => {
  setCartIsShow(false)
}

  return (
    <CartProvider>
      {cartIsShow &&<Cart  onHideCart={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
      <main>
      <Meals></Meals>
      </main>
    </CartProvider>
    
  );
}

export default App;
