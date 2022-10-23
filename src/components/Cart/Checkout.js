import { useRef, useState } from "react";
import classes from "../Cart/Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isPostal = (value) => value.trim().length === 5;

function Checkout(props) {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const [inputTouched, setInputTouched] = useState(false);


  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    setInputTouched(true)
    

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const eneteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isPostal(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);



    setFormIsValid({
      name: eneteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const validate = enteredName && enteredStreet && enteredCity && enteredPostal

    if(!validate){
      return;
    }

    props.submitOrderHandler({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal
    })

    console.log(enteredName);
    setInputTouched(false)
  };

  const nameControlClasses = `${classes.control} ${formIsValid.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formIsValid.street ? '' : classes.invalid}`;
  const postalControlClasses = `${classes.control} ${formIsValid.postalCode ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formIsValid.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name"></input>
        {!formIsValid.name && <p>Your name is not be empty!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street"></input>
        {!formIsValid.street && <p>Street is not be empty!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal"></input>
        {!formIsValid.postalCode && <p>Postal code is not be empty!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city"></input>
        {!formIsValid.city && <p>City is not be empty!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.showCartItems}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
