import { ViewOrdersInner } from "./ViewOrdersInner";
import { OrdersContextProvider } from "context/OrdersContext";

export default function ViewOrders() {
  return (
    <OrdersContextProvider>
      <ViewOrdersInner />
    </OrdersContextProvider>
  );
}
