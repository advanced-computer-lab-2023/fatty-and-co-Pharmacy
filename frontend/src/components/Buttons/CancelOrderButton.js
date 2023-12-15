import {
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useOrdersContext } from "hooks/useOrdersContext";
import { useWalletContext } from "hooks/useWalletContext";

function CancelOrderButton(props) {
  const { OrderId, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { orders, dispatch } = useOrdersContext();
  const { wallet, dispatch: walletDispatch } = useWalletContext();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const toast = useToast();

  const cancelOrder = () => {
    axios
      .post(
        API_PATHS.cancelOrder,
        { OrderId },
        {
          headers: { Authorization },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "CANCEL_ORDER", payload: response.data });
        walletDispatch({ type: "GET_WALLET", payload: response.data });
        toast({
          title: "Order Cancelled Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast({
          title: "Error cancelling order",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={(e) => {
          setIsOpen(true);
          e.stopPropagation();
        }}
        disabled={disabled}
      >
        Cancel
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Order
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={cancelOrder} ml={3}>
                Yes, Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default CancelOrderButton;
