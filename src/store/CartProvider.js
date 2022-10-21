import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // Itt ellenőrzöm, hogy a termék már a kosár része e. A "findIndex" a JavaScript beépített metódusa, ami megkeresi egy elem indexét egy tömbben.
    // Ha az éppen megtekintett elemnek (item.id) ugyanaz az azonosítója ebben a tömbben mint a hozzáadott elemnek amit az action-nal küldött (action.item.id).
    const existingCartItem = state.items[existingCartItemIndex];

    let updateItems;

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItems = [...state.items]; // Az "updateItems" egyenlő lesz egy új tömbbel, ahová a meglévő elemeket másolom.
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item); // A concat egy beépített módszer a JavaScriptben, amely egy új elemet ad egy tömbhöz, de a push-tól eltérően nem szerkeszti a meglévő tömböt, hanem egy új tömböt ad vissza.
    }


    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === "REMOVE_ITEM"){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updateItems;

    if(existingItem.amount === 1){
      updateItems = state.items.filter(item => item.id !== action.id);
    } else{
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 }
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }
    
    return{
      items: updateItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
