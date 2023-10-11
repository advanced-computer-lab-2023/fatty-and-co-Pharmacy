// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Badge,
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
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMedicineContext } from "../../../../hooks/useMedicineContext";
import { API_PATHS } from "API/api_paths";

const MedicineCard = ({ Medicine }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { dispatch } = useMedicineContext();
  const [Name, setName] = useState(Medicine.Name);

  const [Quantity, setQuantity] = useState(Medicine.Quantity);
  const [Active_Ingredients, setActive_Ingredients] = useState(
    Medicine.Active_Ingredients
  );
  const [Description, setDescription] = useState(Medicine.Description);
  const [Price, setPrice] = useState(Medicine.Price);
  const [MImage, setImage] = useState(Medicine.Image);
  const [Medicinal_Use, setMedicinal_Use] = useState(Medicine.Medicinal_Use);
  const [Sales, setSales] = useState(Medicine.Sales);
  const [Archived, setArchived] = useState(Medicine.state);
  const [message, setMessage] = useState("");
  const [use, setUse] = useState("");
  const [Ingredient, setIngredient] = useState("");

  const isArchviedC = Archived === "archived" ? "red" : "green";
  const isArchvied = Archived === "archived" ? "Archived" : "Avabile";

  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image src={MImage}  alt={Name} borderRadius="15px"  boxSize='200px'/>
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          borderRadius="15px"
          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(20, 25, 40, 0.38) 100%)"
        ></Box>
      </Box>
      <Flex direction="column">
        <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
          {Medicinal_Use.map((use) => (
            <Tag key={use} style={{ margin: "0 5px 0 0" }}>
              {use}
            </Tag>
          ))}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb="3px">
          {Name}
          <Badge ml="1" colorScheme={isArchviedC}>
            {isArchvied}
          </Badge>
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          API:
          {Active_Ingredients.map((use) => (
            <text>{" " + use} </text>
          ))}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Quantity: {Quantity}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Price : {Price} EGP
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Sales : {Sales}
        </Text>
        <br />
        <Text fontSize="sm" color="gray.500" fontWeight="400" mb="10px">
          {Description}
        </Text>
        <Flex justifyContent="space-between">
          <Button
            variant="outline"
            colorScheme="teal"
            minW="110px"
            h="36px"
            fontSize="xs"
            px="1.5rem"
            onClick={onOpen}
          >
            Edit
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {Name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text fontSize="sm" fontWeight="semibold">
                just add the diffrent values
              </Text>
              <Input
                variant="filled"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setName(Medicine.Name);
                  } else {
                    setName(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Price EGP"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setPrice(Medicine.Price);
                  } else {
                    setPrice(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Quantity"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setQuantity(Medicine.Quantity);
                  } else {
                    setQuantity(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Sales"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setSales(Medicine.Sales);
                  } else {
                    setSales(e.target.value);
                  }
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
                    if (Ingredient.length > 0) {
                      setActive_Ingredients([
                        ...Active_Ingredients,
                        Ingredient,
                      ]);
                    } else {
                    }
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
                  required
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
                type="text"
                placeholder="Image"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setImage(Medicine.Image);
                  } else {
                    setImage(e.target.value);
                  }
                }}
              />
              <Input
                variant="filled"
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setDescription(Medicine.Description);
                  } else {
                    setDescription(e.target.value);
                  }
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
            <Button
              colorScheme="blue"
              onClick={async () => {
                // API_PATHS.updateMedicine + Medicine._id
                // "medicine/updateMedicine/"
                const response = await fetch(
                  API_PATHS.updateMedicine + Medicine._id,
                  {
                    method: "PATCH",
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
                  }
                );

                const data = await response.json();
                console.log(data);
                if (response.status === 200) {
                  dispatch({ type: "UPDATE_MEDICINE", payload: data });

                  toast({
                    title: "Medicine Updated.",
                    description: "You updated the Medicine succsefuly.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  onClose();
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

                  toast({
                    title: "failed Medicine Update.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MedicineCard;