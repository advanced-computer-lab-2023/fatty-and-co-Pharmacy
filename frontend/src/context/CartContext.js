import { useReducer } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cart: action.payload,
      };
    case "ADD_CART":
      return {
        cart: [action.payload, ...state.cart],
      };
    case "UPDATE_CART":
      return {
        cart: state.cart.map((Cart) =>
          Cart._id === action.payload._id ? action.payload : Cart
        ),
      };
    case "DELETE_CART":
      return {
        cart: [],
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
  });
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
