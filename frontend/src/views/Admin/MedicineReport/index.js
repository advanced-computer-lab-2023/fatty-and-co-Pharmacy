// Chakra imports
import {
  Flex,
  Grid,
  Box,
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
        templateColumns={{ sm: "1fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }}>
        <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                boxShadow="md"
            >
                <TotalSalesOverview
                    title={"Total Sales"}
                    percentage={5}
                />
            </Box>
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            boxShadow="md">
                <SalesOverview
                title={"Sales Report"}
                percentage={5}
                />
            </Box>
            
      </Grid>
    </Flex>
  );
}
