import React from 'react';
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    return ( 
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}></input>
        </div>
        // {...props.input} Ez biztosítja, hogy az összes kulcsérték páros legyen ebben a bemeneti objektumban, amelyeket a kellékek bemenetén kapunk kellékként adjuk hozzá a bemenethez. Tehát, ha a bemenet ez lenne: {type: 'text'} akkor a type="text" kerül hozzáadásra.
     );
})

export default Input;