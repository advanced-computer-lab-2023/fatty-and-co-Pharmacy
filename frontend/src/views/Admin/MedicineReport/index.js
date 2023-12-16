// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets

import SalesLineChart from "./components/SalesLineChart";
// Custom icons

import React from "react";
import SalesOverview from "./components/SalesOverview";
import TotalSalesOverview from "./components/TotalSalesOverview";

export default function MedicineReport() {

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }}>
        <SalesOverview
          title={"Sales Overview"}
          percentage={5}
        />
        <TotalSalesOverview
            title={"Total Sales"}
            percentage={5}
        />
      </Grid>
    </Flex>
  );
}
