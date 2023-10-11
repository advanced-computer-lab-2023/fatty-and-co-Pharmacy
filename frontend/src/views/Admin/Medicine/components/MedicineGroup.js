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
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaPlus } from "react-icons/fa";
import MedicineCard from "./MedicineCard";
import { useState, useEffect } from "react";

import { useMedicineContext } from "../../../../hooks/useMedicineContext";

const MedicineGroup = ({ medicines }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const { dispatch } = useMedicineContext();
  const [Name, setName] = useState("");

  const [Quantity, setQuantity] = useState("");
  const [Active_Ingredients, setActive_Ingredients] = useState([]);
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [MImage, setImage] = useState("");
  const [Medicinal_Use, setMedicinal_Use] = useState([]);
  const [Sales, setSales] = useState(0);
  const [Archived, setArchived] = useState("unarchived");
  const [message, setMessage] = useState("");
  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (e) => async () => {
    // API_PATHS.updateMedicine + Medicine._id
    const response = await fetch("medicine/addMedicine/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Price,
        Active_Ingredients,
        Medicinal_Use,
        Quantity,
        Sales,
        Image: MImage,
        Description,
        state: Archived,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch({ type: "ADD_MEDICINE", payload: data });

      toast({
        title: "Medicine Updated.",
        description: "You updated the Medicine succsefuly.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      // setMessage(data.message);
      setMessage(data.message);
      setName(Medicine.Name);
      setPrice(Medicine.Price);
      setActive_Ingredients(Medicine.Active_Ingredients);
      setMedicinal_Use(Medicine.Medicinal_Use);
      setQuantity(Medicine.Quantity);
      setSales(Medicine.Sales);
      setImage(Medicine.Image);
      setDescription(Medicine.Description);
      setArchived(Medicine.state);

      return toast({
        title: "failed Medi Update.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
            onClick={onOpen}
          >
            <Flex direction="column" justifyContent="center" align="center">
              <Icon as={FaPlus} fontSize="lg" mb="12px" />
              <Text fontSize="lg" fontWeight="bold">
                Add New Medicine
              </Text>
            </Flex>
          </Button>
        </Grid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Medicine</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={3}>
                  <Text fontSize="sm" fontWeight="semibold">
                    just add the diffrent values
                  </Text>
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="number"
                    placeholder="Price EGP"
                    required
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="number"
                    placeholder="Quantity"
                    required
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="number"
                    placeholder="Sales"
                    onChange={(e) => {
                      setSales(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Active Ingredients"
                    onChange={(e) => {
                      setActive_Ingredients(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Medicnal Use"
                    onChange={(e) => {
                      setMedicinal_Use(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Image"
                    required
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  />
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <Menu>
                    <MenuButton as={Button}>{Archived}</MenuButton>
                    <MenuList>
                      <MenuItem
                        value={"archived"}
                        onClick={(e) => {
                          setArchived(e.target.value);
                        }}
                      >
                        archived
                      </MenuItem>
                      <MenuItem
                        value={"unarchived"}
                        onClick={(e) => {
                          setArchived(e.target.value);
                        }}
                      >
                        unarchived
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={(e) => {
                    console.log(Medicine);
                    setName(Medicine.Name);
                    setPrice(Medicine.Price);
                    console.log(Medicine.Medicinal_Use);
                    setActive_Ingredients([...Medicine.Active_Ingredients]);
                    setMedicinal_Use([...Medicine.Medicinal_Use]);
                    setQuantity(Medicine.Quantity);
                    setSales(Medicine.Sales);
                    setImage(Medicine.Image);
                    setDescription(Medicine.Description);
                    setArchived(Medicine.state);
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button colorScheme="blue" type="submit">
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default MedicineGroup;
