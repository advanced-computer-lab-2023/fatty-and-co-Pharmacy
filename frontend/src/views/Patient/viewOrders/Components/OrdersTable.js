// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import OrderRow from "components/Tables/OrderRow";
import React from "react";

const OrdersTable = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data?.slice().reverse().map((row) => {
              return (
                <OrderRow
                  key={row._id}
                  OrderId={row._id}
                  PatientUsername={row.PatientUsername}
                  Medicine={row.Medicine}
                  TotalCost={row.TotalCost}
                  Date={row.Date}
                  Status={row.Status}
                  Details={row.Details}
                  PaymentMethod={row.PaymentMethod}
                  DeliveryAddress={row.DeliveryAddress}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default OrdersTable;
