import React, { useEffect } from "react";
import { Flex, Box, useToast } from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import { useOrdersContext } from "hooks/useOrdersContext";
import axios from "axios";
import OrdersTable from "./Components/OrdersTable";

export function ViewOrdersInner() {
  const { orders, dispatch } = useOrdersContext();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const toast = useToast();

  useEffect(() => {
    axios
      .get(API_PATHS.getOrders, { headers: { Authorization } })
      .then((response) => {
        dispatch({ type: "SET_ORDERS", payload: response.data });
        console.log(response.data);
        console.log(orders);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        toast({
          title: "Error getting your orders",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <OrdersTable
          title={"Orders"}
          captions={["Products", "Cost", "Status", ""]}
          data={orders}
        />
      </Flex>
    </Box>
  );
}
