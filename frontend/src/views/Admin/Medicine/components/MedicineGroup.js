// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useToast,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Box,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Select,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaPlus } from "react-icons/fa";
import MedicineCard from "./MedicineCard";
import { useState, useEffect, useMemo } from "react";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { API_PATHS } from "API/api_paths";
import { useMedicineContext } from "../../../../hooks/useMedicineContext";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import MultiSelect from "components/Selections/MultiSelect";

const MedicineGroup = ({
  medicines,
  searchAndFilterParams,
  setSearchAndFilterParams,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const { dispatch } = useMedicineContext();
  const [Name, setName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Ingredient, setIngredient] = useState("");
  const [Active_Ingredients, setActive_Ingredients] = useState([]);
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [MImage, setImage] = useState("");
  const [use, setUse] = useState("");
  const [Medicinal_Use, setMedicinal_Use] = useState([]);
  const [Sales, setSales] = useState(0);
  const [Archived, setArchived] = useState("unarchived");
  const [message, setMessage] = useState("");
  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [selectedUses, setSelectedUses] = useState([]);

  const medicinalUses = useMemo(() => {
    return Array.from(
      new Set(medicines.map((medicine) => medicine.Medicinal_Use).flat())
    ).map((use) => ({ use: use }));
  }, []); // Empty array means it will only compute the value on the first render

  const handleNameValueChange = (value) => {
    if (typeof value !== "string") return;
    setSearchAndFilterParams({ ...searchAndFilterParams, Name: value });
  };
  const handleMedicinalUseValueChange = () => {
    setSearchAndFilterParams({
      ...searchAndFilterParams,
      Medicinal_Use: selectedUses.map((item) => item.use),
    });
  };

  const handleMedicinalUseChange = (values) => {
    setSelectedUses(values);
  };

  return (
    <Card p="16px" my="24px" style={{ margin: "80px 0 0 0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Flex direction="row" alignItems="flex-start">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              "Medicine Group"
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              "Medicine Group Description"
            </Text>
          </Flex>
          <Flex direction={"row"} justifyContent={"flex-end"} marginLeft={20}>
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
              <Button marginLeft={10} onClick={handleMedicinalUseValueChange}>
                Submit
              </Button>
              <Button
                marginLeft={10}
                onClick={() =>
                  setSearchAndFilterParams({
                    Name: "",
                    Medicinal_Use: [],
                  })
                }
              >
                Clear
              </Button>
            </Flex>
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
                <MedicineCard key={medicine._id} Medicine={medicine} />
              ))}
        </Grid>
      </CardBody>
    </Card>
  );
};

export default MedicineGroup;
