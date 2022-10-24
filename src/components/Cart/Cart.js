import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Ok from "../../assets/Ok.png";
import ErrorImage from "../../assets/ErrorImage.png";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const [hideCartItems, setHideCartItems] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
    setHideCartItems(true);
  };

  const showCartItems = () => {
    setHideCartItems(false);
    setIsCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://meals-afbb8-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Please Try again later!");
      }
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setError(error.message);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {!hideCartItems && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>   
      </div>
      {!hasItems &&<p>Your cart is empty!</p>}
      {hasItems && isCheckout && (
        <Checkout
          submitOrderHandler={submitOrderHandler}
          showCartItems={showCartItems}
          onClose={props.onHideCart}
        ></Checkout>
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;  // RENDELÉS KÜLDÉSE

  const errorPostRequest = (  // SIKERTELEN RENDELÉS
    <div className={classes.error}>
      <p className={classes.errorMessage}>{error}</p>
      <img className={classes.errorImage} src={ErrorImage}></img>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </div>
  );

  const didSubmitModalContent = ( // SIKERES RENDELÉS
    <Fragment>
      <div className={classes.sucessOK}>
        <p className={classes.sucess}>Sucessfully sent the order!</p>
        <img src={Ok} className={classes.okImage}></img>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent && !error}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {error && errorPostRequest}
    </Modal>
  );
}

export default Cart;
