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
import { API_PATHS } from "../../../../API/api_paths";
import { useMedicineContext } from "../../../../hooks/useMedicineContext";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
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
  const [MedicationType, setMedicationType] = useState("Over the counter");
  const [Sales, setSales] = useState(0);
  const [Archived, setArchived] = useState("unarchived");
  const [message, setMessage] = useState("");
  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const handleSubmit = async (e) => {
    // API_PATHS.addMedicine
    // "medicine/addMedicine"
    e.preventDefault();
    // if (Active_Ingredients.length === 0 || Medicinal_Use.length === 0) {
    //   return toast({
    //     title: "failed Add Medicine.",
    //     description: "Please add at least one ingredient and one use.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }

    // const response = await fetch(API_PATHS.addMedicine, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Name,
    //     Price,
    //     Active_Ingredients,
    //     Medicinal_Use,
    //     Quantity,
    //     Sales,
    //     Image: MImage,
    //     Description,
    //     state: Archived,
    //   }),
    // });
    // const data = await response.json();

    // if (response.status === 200) {
    //   dispatch({ type: "ADD_MEDICINE", payload: data });

    //   toast({
    //     title: "Medicine Added.",
    //     description: "You Added the Medicine succsefuly.",
    //     status: "success",
    //     duration: 9000,
    //     isClosable: true,
    //   });

    //   setName("");
    //   setPrice("");
    //   setActive_Ingredients("");
    //   setMedicinal_Use("");
    //   setQuantity("");
    //   setSales("");
    //   setImage("");
    //   setDescription("");
    //   setArchived("unarchived");
    //   onClose();
    // } else {
    //   return toast({
    //     title: "failed Medi Update.",
    //     description: message,
    //     status: "error",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    // }
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Price", Price);
    formData.append("Active_Ingredients", Active_Ingredients);
    formData.append("Medicinal_Use", Medicinal_Use);
    formData.append("Quantity", Quantity);
    formData.append("Sales", Sales);
    formData.append("MImage", MImage);
    formData.append("Description", Description);
    formData.append("state", Archived);
    formData.append("MedicationType", MedicationType);

    await fetch(API_PATHS.addMedicine, {
      method: "POST",
      headers: {
        Authorization: Authorization,
      },
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json();
        dispatch({ type: "ADD_MEDICINE", payload: data });

        toast({
          title: "Medicine Added.",
          description: "Medicine Added Successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setName("");
        setPrice("");
        setActive_Ingredients("");
        setMedicinal_Use("");
        setQuantity("");
        setSales("");
        setImage("");
        setDescription("");
        setArchived("");
        setMedicationType("");
        onClose();
        //location.reload();
      })
      .catch((err) => {
        return toast({
          title: "Failed to add Medicine",
          description: err.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleNameValueChange = (value) => {
    if (typeof value !== "string") return;
    setSearchAndFilterParams({ ...searchAndFilterParams, Name: value });
  };
  const handleMedicinalUseValueChange = () => {
    setSearchAndFilterParams({
      ...searchAndFilterParams,
      Medicinal_Use: selectedUses.map((item) => item.use),
    });
    console.log(searchAndFilterParams);
  };

  const [selectedUses, setSelectedUses] = useState([]);

  const medicinalUses = useMemo(() => {
    return Array.from(
      new Set(medicines.map((medicine) => medicine.Medicinal_Use).flat())
    ).map((use) => ({ use: use }));
  }, []); // Empty array means it will only compute the value on the first render
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
            medicines.map((medicine) => (
              <MedicineCard key={medicine._id} Medicine={medicine} />
            ))}

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
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Medicine</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={3}>
                  <Text fontSize="sm" fontWeight="semibold">
                    add new Medicine
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
                  <Box>
                    <Input
                      variant="filled"
                      type="text"
                      placeholder="Active Ingredients"
                      style={{ width: "75%" }}
                      onChange={(e) => {
                        setIngredient(e.target.value);
                      }}
                    />
                    <Button
                      style={{ width: "20%", marginLeft: "10px" }}
                      onClick={(e) => {
                        setActive_Ingredients([
                          ...Active_Ingredients,
                          Ingredient,
                        ]);
                      }}
                    >
                      add
                    </Button>
                  </Box>
                  <Box>
                    {Active_Ingredients &&
                      Active_Ingredients.map((ingredient) => (
                        <Tag
                          key={ingredient}
                          size={"sm"}
                          borderRadius="full"
                          variant="solid"
                          style={{ width: "fit-content", marginRight: "5px" }}
                          onClick={(e) => {
                            setActive_Ingredients(
                              Active_Ingredients.filter(
                                (item) => item !== ingredient
                              )
                            );
                          }}
                        >
                          <TagLabel>{ingredient}</TagLabel>
                        </Tag>
                      ))}
                  </Box>
                  <Box>
                    <Input
                      variant="filled"
                      type="text"
                      placeholder="Medicnal Use"
                      style={{ width: "75%" }}
                      onChange={(e) => {
                        setUse(e.target.value);
                      }}
                    />
                    <Button
                      style={{ width: "20%", marginLeft: "10px" }}
                      onClick={(e) => {
                        setMedicinal_Use([...Medicinal_Use, use]);
                      }}
                    >
                      add
                    </Button>
                  </Box>
                  <Box>
                    {Medicinal_Use &&
                      Medicinal_Use.map((use) => (
                        <Tag
                          key={use}
                          size={"sm"}
                          borderRadius="full"
                          variant="solid"
                          style={{ width: "fit-content", marginRight: "5px" }}
                          onClick={(e) => {
                            setMedicinal_Use(
                              Medicinal_Use.filter((item) => item !== use)
                            );
                          }}
                        >
                          <TagLabel>{use}</TagLabel>
                        </Tag>
                      ))}
                  </Box>
                  <Input
                    variant="filled"
                    type="file"
                    id="MImage"
                    name="MImage"
                    accept="image/png, image/jpeg ,image/jpg"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Description"
                    required
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
                  <Menu>
                    <MenuButton as={Button}>{MedicationType}</MenuButton>
                    <MenuList>
                      <MenuItem
                        value={"Over the counter"}
                        onClick={(e) => {
                          setMedicationType(e.target.value);
                        }}
                      >
                        Over the counter
                      </MenuItem>
                      <MenuItem
                        value={"Prescribed"}
                        onClick={(e) => {
                          setMedicationType(e.target.value);
                        }}
                      >
                        Prescribed
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
                    setName("");
                    setPrice("");
                    setActive_Ingredients("");
                    setMedicinal_Use("");
                    setQuantity("");
                    setSales("");
                    setImage("");
                    setDescription("");
                    setArchived("unarchived");
                    setMedicationType("Over the counter");
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
