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
import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "hooks/useAuthContext";

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
  const [Archived, setArchived] = useState(Medicine.State);
  const [message, setMessage] = useState("");
  const [use, setUse] = useState("");
  const [Ingredient, setIngredient] = useState("");
  const [MedicationType, setMedicationType] = useState(Medicine.MedicationType);
  const [updateImage, setUpdateImage] = useState(null);
  const [id, setId] = useState(Medicine._id);
  const isArchviedC = Archived === "archived" ? "red" : "green";
  const isArchvied = Archived === "archived" ? "Archived" : "Available";

  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // set image
  const [file, setFile] = useState(null);
  const downloadFile = async () => {
    let imageFilename = "";
    try {
      const { filename } = MImage;
      imageFilename = filename;
    } catch (err) {
      setFile("fail");
      return;
    }
    const response = await fetch(API_PATHS.downloadFile + imageFilename, {
      method: "GET",
      headers: {
        Authorization,
      },
    });
    const file = await response.blob();
    const fileUrl = URL.createObjectURL(file);
    setFile(fileUrl);
  };
  useEffect(() => {
    downloadFile();
  }, []);

  const closeEdit = (e) => {
    console.log(Medicine);
    setName(Medicine.Name);
    setPrice(Medicine.Price);
    setActive_Ingredients([...Medicine.Active_Ingredients]);
    setMedicinal_Use([...Medicine.Medicinal_Use]);
    setQuantity(Medicine.Quantity);
    setSales(Medicine.Sales);
    //setImage(Medicine.Image);
    setDescription(Medicine.Description);
    setArchived(Medicine.State);
    setMedicationType(Medicine.MedicationType);
    onClose();
  };

  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image src={file} alt={Name} borderRadius="15px" boxSize="200px" />
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
          Active Ing:
          {Active_Ingredients.map((use) => (
            <text>{" " + use} </text>
          ))}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Quantity: {Quantity}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Price: {Price} EGP
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Sales: {Sales}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Medication Type: {MedicationType}
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeEdit}>
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
                    if (use.length > 0) {
                      setMedicinal_Use([...Medicinal_Use, use]);
                    }
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
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    //setImage(Medicine.Image);
                  } else {
                    setUpdateImage(e.target.files[0]);
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
            <Button variant="ghost" mr={3} onClick={closeEdit}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                // API_PATHS.updateMedicine + Medicine._id
                // "medicine/updateMedicine/"

                // if (
                //   Active_Ingredients.length === 0 ||
                //   Medicinal_Use.length === 0
                // ) {
                //   return toast({
                //     title: "failed Add Medicine.",
                //     description:
                //       "Please add at least one ingredient and one use.",
                //     status: "error",
                //     duration: 5000,
                //     isClosable: true,
                //   });
                // }

                // const response = await fetch(
                //   API_PATHS.updateMedicine + Medicine._id,
                //   {
                //     method: "PATCH",
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //       Name,
                //       Price,
                //       Active_Ingredients,
                //       Medicinal_Use,
                //       Quantity,
                //       Sales,
                //       Image: MImage,
                //       Description,
                //       State: Archived,
                //     }),
                //   }
                // );

                // const data = await response.json();
                // console.log(data);
                // if (response.status === 200) {
                //   dispatch({ type: "UPDATE_MEDICINE", payload: data });

                //   toast({
                //     title: "Medicine Updated.",
                //     description: "You updated the Medicine succsefuly.",
                //     status: "success",
                //     duration: 5000,
                //     isClosable: true,
                //   });
                //   onClose();
                // } else {
                //   // setMessage(data.message);
                //   setMessage(data.message);
                //   setName(Medicine.Name);
                //   setPrice(Medicine.Price);
                //   setActive_Ingredients(Medicine.Active_Ingredients);
                //   setMedicinal_Use(Medicine.Medicinal_Use);
                //   setQuantity(Medicine.Quantity);
                //   setSales(Medicine.Sales);
                //   setImage(Medicine.Image);
                //   setDescription(Medicine.Description);
                //   setArchived(Medicine.State);

                //   toast({
                //     title: "failed Medicine Update.",
                //     description: message,
                //     status: "error",
                //     duration: 9000,
                //     isClosable: true,
                //   });
                // }
                const formData = new FormData();
                formData.append("Name", Name);
                formData.append("Price", Price);
                formData.append("Active_Ingredients", [...Active_Ingredients]);
                formData.append("Medicinal_Use", [...Medicinal_Use]);
                formData.append("Quantity", Quantity);
                formData.append("Sales", Sales);
                formData.append("MImage", updateImage);
                formData.append("Description", Description);
                formData.append("State", Archived);
                formData.append("MedicationType", MedicationType);
                await fetch(API_PATHS.updateMedicine + id, {
                  method: "PATCH",
                  headers: {
                    Authorization: Authorization,
                  },
                  body: formData,
                })
                  .then(async (response) => {
                    // Handle success
                    const data = await response.json();
                    dispatch({
                      type: "UPDATE_MEDICINE",
                      payload: data,
                    });
                    toast({
                      title: "Medicine Updated.",
                      description: "You updated the Medicine successfully.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    onClose();
                    const timer = setTimeout(() => {
                      location.reload();
                    }, 1000); // 1000ms delay
                  })
                  .catch((error) => {
                    // Handle error
                    console.log(error);
                    setMessage(error.response.data.message);
                    setName(Medicine.Name);
                    setPrice(Medicine.Price);
                    setActive_Ingredients([...Medicine.Active_Ingredients]);
                    setMedicinal_Use([...Medicine.Medicinal_Use]);
                    setQuantity(Medicine.Quantity);
                    setSales(Medicine.Sales);
                    //setImage(Medicine.Image);
                    setDescription(Medicine.Description);
                    setArchived(Medicine.State);
                    setMedicationType(Medicine.MedicationType);

                    toast({
                      title: "failed Medicine Update.",
                      description: message,
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  });
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
