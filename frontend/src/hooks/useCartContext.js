import { CartContext } from "context/CartContext";
import { useContext } from "react";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error(
      "Custom:useCartContext should be used inside an CartContextProvider"
    );
  }
  return context;
};
