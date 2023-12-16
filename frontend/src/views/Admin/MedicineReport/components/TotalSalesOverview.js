// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue, Select } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React, {useState, useEffect} from "react";
import SalesLineChart from "./SalesLineChart";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";


const TotalSalesOverview = ({ title, percentage, chart }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [chartData, setChartData] = useState([]);

  const getTotalSales = () => {
      axios
          .get(API_PATHS.getTotalSales, {
              headers: { Authorization },
          })
          .then((response) => {
              const newChartData = [{
                name: "Total Sales",
                data: response.data,
              }];
              setChartData(newChartData);
          })
          .catch((error) => {
              console.error("Error getting total sales: ", error);
          });
  };

  useEffect(() => {
    getTotalSales();
  }, []);

  return (
    <Card p='28px 10px 16px 0px' mb={{ sm: "26px", lg: "0px" }}>
      <CardHeader mb='20px' pl='22px'>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <Box w='100%' h={{ sm: "300px" }} ps='8px'>
        <Box w="100%" h={{ sm: "300px" }} ps="8px">
           <SalesLineChart key={JSON.stringify(chartData)} chartData={chartData} />
        </Box>
      </Box>
    </Card>
  );
};

export default TotalSalesOverview;
