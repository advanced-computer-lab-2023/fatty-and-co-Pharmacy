// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageArchitect1 from "assets/img/ImageArchitect1.png";
import imageArchitect2 from "assets/img/ImageArchitect2.png";
import imageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaPlus } from "react-icons/fa";
import MedicineCard from "./MedicineCard";
import { useState, useEffect } from "react";

import { useMedicineContext } from "../hooks/useMedicineContext";

const MedicineGroup = ({medicines}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px" my="24px" style={{ margin: "80px 0 0 0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            "Medicine Group"
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="400">
            "Medicine Group Description"
          </Text>
        </Flex>
      </CardHeader>
      <CardBody px="5px">
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap="24px"
        >
          
          {medicines &&
            medicines.map((medicine) => (
              // <p style={{margin:"100px"}} key={medicine._id}>{medicine.Name}</p>
              <MedicineCard key={medicine._id} Medicine={medicine} />
            ))}
             {
          // medicines && medicines.map((medicine)=>(
          //   <p style={{margin:"100px"}} key={medicine._id}>{medicine.Name}</p>
          // ))
        }
          <Button
            p="0px"
            bg="transparent"
            color="gray.500"
            border="1px solid lightgray"
            borderRadius="15px"
            minHeight={{ sm: "200px", md: "100%" }}
          >
            <Flex direction="column" justifyContent="center" align="center">
              <Icon as={FaPlus} fontSize="lg" mb="12px" />
              <Text fontSize="lg" fontWeight="bold">
                Add New Medicine
              </Text>
            </Flex>
          </Button>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default MedicineGroup;
