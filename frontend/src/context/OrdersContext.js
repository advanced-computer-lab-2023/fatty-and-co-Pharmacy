import { createContext, useReducer, useEffect } from "react";

export const OrdersContext = createContext();

export const ordersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "CANCEL_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id
            ? { ...order, Status: "Cancelled" }
            : order
        ),
      };
    default:
      return state;
  }
};

export const OrdersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, { orders: [] });

  console.log("OrdersContextProvider state: ", state);
  return (
    <OrdersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};
