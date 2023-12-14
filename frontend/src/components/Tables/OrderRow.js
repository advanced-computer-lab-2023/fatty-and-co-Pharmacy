import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import CancelOrderButton from "components/Buttons/CancelOrderButton";
import React, { useState } from "react";

function OrderRow(props) {
  const {
    OrderId,
    Medicine,
    TotalCost,
    Date,
    Status,
    Details,
    PaymentMethod,
    DeliveryAddress,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const onClick = () => {
    setIsOpen(true);
  };

  const medicineCounts = Medicine
    ? Medicine.reduce((counts, medicine) => {
        counts[medicine.Name] = (counts[medicine.Name] || 0) + 1;
        return counts;
      }, {})
    : {};

  return (
    <>
      <Tr onClick={onClick} _hover={{ bg: "gray.100" }} cursor="pointer">
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              {Object.entries(medicineCounts).map(([name, count]) => (
                <Text
                  key={name}
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {name}: {count}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Td>

        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {TotalCost}
              </Text>
            </Flex>
          </Flex>
        </Td>

        <Td>
          <Badge
            bg={
              Status === "Completed"
                ? "green.400"
                : Status === "Cancelled"
                ? "red.400"
                : Status === "In Progress"
                ? "yellow.400"
                : bgStatus
            }
            color={colorStatus}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {Status}
          </Badge>
        </Td>

        <Td>
          <CancelOrderButton
            OrderId={OrderId}
            disabled={Status === "Completed" || Status === "Cancelled"}
          ></CancelOrderButton>
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Order ID: {OrderId}</Text>
            <Text>
              {" "}
              Medicine:{" "}
              <UnorderedList>
                {Object.entries(medicineCounts).map(([name, count]) => (
                  <ListItem key={name}>
                    {name}, Amount: {count}
                  </ListItem>
                ))}
              </UnorderedList>
            </Text>
            <Text>Total Cost: {TotalCost}</Text>
            <Text>Details: {Details}</Text>
            <Text>Date: {Date}</Text>
            <Text>Status: {Status}</Text>
            <Text>Payment Method: {PaymentMethod}</Text>
            <Text>Delivery Address: {DeliveryAddress}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderRow;
