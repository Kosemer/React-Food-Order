import classes from './HeaderCartButton.module.css';
import CardIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {

    const cartCtx = useContext(CartContext);
    const [btnHighLighted, setbtnHighLighted] = useState(false);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    //reduce() Ez egy olyan módszer, amely lehetővé teszi egy tömb átalakítását adatokat egyetlen értékké ebben az esetben egyetlen számba.

    const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump : ''}`;

    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setbtnHighLighted(true);

        const timer = setTimeout(() => {
            setbtnHighLighted(false)
        }, 300);
        return () => {
            clearTimeout(timer);
        }
       
    }, [items]);

    return ( 
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CardIcon></CardIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
     );
}

export default HeaderCartButton;