// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue, Select } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React, {useState, useEffect} from "react";
import SalesLineChart from "./SalesLineChart";
import { lineChartOptions } from "./chart";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";


const SalesOverview = ({ title, percentage, chart }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [medicines, setMedicines] = useState([{}]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [chartData, setChartData] = useState([]);

  const getMedicines = () => {
      axios
          .get(API_PATHS.getMedicines, {
              headers: { Authorization },
          })
          .then((response) => {
              setMedicines(response.data);
          })
          .catch((error) => {
              console.error("Error getting medicines: ", error);
          });
  };

  const handleMedicineChange = (event) => {
    const selectedMedicineId = event.target.value;
    const selectedMedicine = medicines.find((medicine) => medicine._id === selectedMedicineId);
    if (!selectedMedicines.some((med) => med._id === selectedMedicine._id)) {
      setSelectedMedicines((prevSelected) => [...prevSelected, selectedMedicine]);
    }
  };

  const handleRemoveMedicine = (medicineId) => {
    setSelectedMedicines((prevSelected) => prevSelected.filter((med) => med._id !== medicineId));
  };

  const handleGenerateChartData = () => {
    const newChartData = selectedMedicines.map((medicine) => ({
      name: medicine.Name,
      data: medicine.SalesPerMonth,
    }));
    setChartData(newChartData);
  };

  useEffect(() => {
    getMedicines();
  }, []);

  return (
    <Card p='28px 10px 16px 0px' mb={{ sm: "26px", lg: "0px" }}>
      <CardHeader mb='20px' pl='22px'>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
            {title}
          </Text>
          <Flex direction="row" mt={2} alignItems="center" >
          <Select placeholder="Select a medicine" onChange={handleMedicineChange}>
            {medicines.map((medicine) => (
              <option key={medicine._id} value={medicine._id}>
                {medicine.Name}
              </option>
            ))}
          </Select>
          {selectedMedicines.length > 0 && (
            <Button minWidth="fit-content" colorScheme="teal" ml={2} onClick={handleGenerateChartData}>
              Generate Chart
            </Button>
          )}
          </Flex>
          <Flex mt={2}>
            {selectedMedicines.map((medicine) => (
              <Box key={medicine._id} mr={2}>
                <Text>{medicine.Name}</Text>
                <Button size="xs" colorScheme="red" onClick={() => handleRemoveMedicine(medicine._id)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Flex>
        </Flex>
      </CardHeader>
      <Box w='100%' h={{ sm: "300px" }} ps='8px'>
        <Box w="100%" h={{ sm: "300px" }} ps="8px">
           {chartData.length > 0 && <SalesLineChart key={JSON.stringify(chartData)} chartData={chartData} />}
        </Box>
      </Box>
    </Card>
  );
};

export default SalesOverview;
