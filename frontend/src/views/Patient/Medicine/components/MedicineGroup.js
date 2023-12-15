// Chakra imports
import { Button, Flex, Grid, Text, useColorModeValue,useToast } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import MedicineCard from "./MedicineCard";
import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import axios from "axios";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";

import MultiSelect from "components/Selections/MultiSelect";

const MedicineGroup = ({
  medicines,
  searchAndFilterParams,
  setSearchAndFilterParams,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const [name, setName] = useState("All Medicine");
  const [selectedUses, setSelectedUses] = useState([]);
  const [medicineDiscount, setMedicineDiscount] = useState(0);
  const toast = useToast();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const medicinalUses = useMemo(() => {
    return Array.from(
      new Set(medicines.map((medicine) => medicine.Medicinal_Use).flat())
    ).map((use) => ({ use: use }));
  }, []); // Empty array means it will only compute the value on the first render

  const handleNameValueChange = (value) => {
    if (typeof value !== "string") return;
    setSearchAndFilterParams({ ...searchAndFilterParams, Name: value });
  };

    const getMedicineDiscount = () => {
      axios.get(API_PATHS.getMedicineDiscount, {
        headers: { Authorization },
      })
      .then((response) => {
        console.log(response.data.discount);
        setMedicineDiscount(response.data.discount);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  useEffect(() => {
    setSearchAndFilterParams({
      ...searchAndFilterParams,
      Medicinal_Use: selectedUses.map((item) => item.use),
    });
    getMedicineDiscount();
  }, [selectedUses]);

  const handleMedicinalUseChange = (values) => {
    setSelectedUses(values);
  };

  return (
    <Card p="16px" my="24px" style={{ margin: "80px 0 0 0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Flex direction="row" alignItems="flex-start">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Now showing
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              {name}
            </Text>
          </Flex>
          <Flex direction={"row"} justifyContent={"flex-end"} marginLeft={20}>
            {(name === "All Medicine" && (
              <Flex direction={"row"} marginLeft="10px">
                <SearchBar
                  placeholder="Medicine Name..."
                  onChange={handleNameValueChange}
                  marginLeft="10px"
                />
                <MultiSelect
                  marginLeft={10}
                  placeholder="Medicinal Use..."
                  initialItems={medicinalUses}
                  selectedItems={selectedUses}
                  setSelectedItems={setSelectedUses}
                  onSelectedItemsChange={handleMedicinalUseChange}
                  labelKey="use"
                  valueKey="use"
                ></MultiSelect>
                <Button
                  marginLeft={10}
                  onClick={() => {
                    setSearchAndFilterParams({
                      Name: "",
                      Medicinal_Use: [],
                    });
                    setSelectedUses([]);
                  }}
                >
                  Clear Filters
                </Button>
              </Flex>
            )) || (
              <Button
                marginLeft={10}
                onClick={() => {
                  setSearchAndFilterParams({
                    Name: "",
                    Medicinal_Use: [],
                  });
                  setSelectedUses([]);
                  setName("All Medicine");
                }}
              >
                Return
              </Button>
            )}
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody px="5px">
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap="24px"
        >
          {medicines &&
            medicines
              .filter((medicine) => medicine.State === "unarchived")
              .map((medicine) => (
                <MedicineCard
                  key={medicine._id}
                  Medicine={medicine}
                  setName={setName}
                  medicineDiscount={medicineDiscount}
                />
              ))}
        </Grid>
      </CardBody>
    </Card>
  );
};

export default MedicineGroup;
