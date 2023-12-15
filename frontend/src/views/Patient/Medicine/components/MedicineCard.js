// Chakra imports
import {
  Heading,
  ButtonGroup,
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
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMedicineContext } from "../../../../hooks/useMedicineContext";
import { useCartContext } from "../../../../hooks/useCartContext";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "hooks/useAuthContext";
import { CartPlusFill } from "react-bootstrap-icons";

const MedicineCard = ({ Medicine, medicineDiscount, ...rest }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { dispatch } = useMedicineContext();
  const { cart, dispatch: cartDispatch } = useCartContext();
  const [Name, setName] = useState(Medicine.Name);

  const [Quantity, setQuantity] = useState(Medicine.Quantity);
  const [Active_Ingredients, setActive_Ingredients] = useState(
    Medicine.Active_Ingredients
  );
  const [Description, setDescription] = useState(Medicine.Description);
  const [Price, setPrice] = useState(Medicine.Price);
  const [MImage, setImage] = useState(Medicine.Image);
  const [Medicinal_Use, setMedicinal_Use] = useState(Medicine.Medicinal_Use);
  const [MedicationType, setMedicationType] = useState(Medicine.MedicationType);
  const [Sales, setSales] = useState(Medicine.Sales);
  const [Archived, setArchived] = useState(Medicine.State);
  const [message, setMessage] = useState("");
  const [use, setUse] = useState("");
  const [Ingredient, setIngredient] = useState("");

  const isArchviedC =
    Archived === "archived" || Quantity <= 0 ? "red" : "green";
  const isArchvied =
    Archived === "archived"
      ? "Not Available"
      : Quantity <= 0
      ? "Out Of Stock"
      : "Available";

  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // set file
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

  const addToCart = (medicine) => {
    console.log(Authorization);
    console.log(medicine._id);
    axios
      .post(API_PATHS.addItemToCart + `?Medicine=${medicine._id}`, null, {
        headers: { Authorization },
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Added to cart",
          description: `We've added ${medicine.Name} to cart`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        axios
          .get(API_PATHS.viewCart, {
            headers: { Authorization },
          })
          .then((response) => {
            cartDispatch({ type: "SET_CART", payload: response.data.medicine });
          })
          .catch((error) => {
            console.error("Error fetching cart:", error);
          });
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
  };

  const [isPrescribed, setIsPrescribed] = useState(false);
  useEffect(() => {
    const checkIfMedicineIsPrescribed = () => {
      axios
        .get(API_PATHS.checkMedicinePrescribed, {
          params: { Medicine: Medicine._id },
          headers: { Authorization },
        })
        .then((response) => {
          console.log(Name + "  " + response.data.isPrescribed);
          setIsPrescribed(response.data.isPrescribed);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    checkIfMedicineIsPrescribed();
  }, []);

  // TODO: Needs editing to improve the UX
  const viewAlternatives = () => {
    dispatch({ type: "FILTER_MEDICINES", payload: Active_Ingredients[0] });
    rest.setName("Alternatives to " + Name);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="md"
    >
      <Flex direction="column">
        <Tooltip label={Description}>
          <Box>
            <Image src={file} alt={Name} borderRadius="15px" boxSize="200px" />
            <Stack mt="6" spacing="3">
              <Heading size="md">
                {Name}
                <Badge ml="1" colorScheme={isArchviedC}>
                  {isArchvied}
                </Badge>
              </Heading>
              <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
                {Medicinal_Use.map((use) => (
                  <Tag key={use} style={{ margin: "0 5px 0 0" }}>
                    {use}
                  </Tag>
                ))}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="400">
                Active Ingredients:
                {Active_Ingredients.map((use) => (
                  <Text>{" " + use} </Text>
                ))}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="400">
                Medication Type: {MedicationType}
              </Text>
              {/* <Text>
            {Description}
          </Text> */}
              <Text fontSize="xl" color="teal">
                Price:{" "}
                {medicineDiscount !== 0 ? (
                  <>
                    <span
                      style={{ textDecoration: "line-through", color: "teal" }}
                    >
                      {Price}
                    </span>{" "}
                    {"  "}
                    <span style={{ color: "red" }}>
                      {Price - (Price * medicineDiscount) / 100}
                    </span>
                  </>
                ) : (
                  <span style={{ color: "teal" }}>{Price}</span>
                )}
              </Text>
            </Stack>
          </Box>
        </Tooltip>
        <Tooltip
          placement="bottom-start"
          label={
            Quantity === 0
              ? "Out of Stock. You can find alternatives"
              : !isPrescribed
              ? "This medicine needs a prescription to order"
              : "Add to cart"
          }
          bg={!isPrescribed || Quantity === 0 ? "red.500" : "green.500"}
        >
          <Flex justifyContent="space-between">
            <Button
              disabled={!isPrescribed && Quantity !== 0}
              colorScheme={"teal"}
              onClick={() => {
                if (Quantity === 0) {
                  viewAlternatives();
                } else {
                  addToCart(Medicine);
                }
              }}
            >
              {Quantity === 0 ? (
                "View Alternatives"
              ) : (
                <Flex>
                  <CartPlusFill style={{ margin: "3px", width: "14px" }} />{" "}
                </Flex>
              )}
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>

    // <Flex direction="column">
    //   <Box mb="20px" position="relative" borderRadius="15px">
    //     <Image src={file} alt={Name} borderRadius="15px" boxSize="200px" />
    //     <Box
    //       w="100%"
    //       h="100%"
    //       position="absolute"
    //       top="0"
    //       borderRadius="15px"
    //       bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(20, 25, 40, 0.38) 100%)"
    //     ></Box>
    //   </Box>
    //   <Flex direction="column">
    //     <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
    //       {Medicinal_Use.map((use) => (
    //         <Tag key={use} style={{ margin: "0 5px 0 0" }}>
    //           {use}
    //         </Tag>
    //       ))}
    //     </Text>
    //     <Text fontSize="xl" color={textColor} fontWeight="bold" mb="3px">
    //       {Name}
    //       <Badge ml="1" colorScheme={isArchviedC}>`
    //         {isArchvied}
    //       </Badge>
    //     </Text>
    //     <Text fontSize="sm" color="gray.500" fontWeight="400">
    //       Active Ing:
    //       {Active_Ingredients.map((use) => (
    //         <text>{" " + use} </text>
    //       ))}
    //     </Text>
    //     {/* <Text fontSize="sm" color="gray.500" fontWeight="400">
    //       Quantity: {Quantity}
    //     </Text> */}
    //     <Text fontSize="sm" color="gray.500" fontWeight="400">
    //       Price: {Price} EGP
    //     </Text>
    //     {/* <Text fontSize="sm" color="gray.500" fontWeight="400">
    //       Sales : {Sales}
    //     </Text> */}
    //     <Text fontSize="sm" color="gray.500" fontWeight="400">
    //       Medication Type: {MedicationType}
    //     </Text>
    //     <br />

    //     <Text fontSize="sm" color="gray.500" fontWeight="400" mb="10px">
    //       {Description}
    //     </Text>

    //     <Tooltip
    //       isDisabled={MedicationType !== "Prescribed" || Quantity === 0}
    //       label="This medicine needs a prescription to order"
    //       bg="red.500"
    //     >
    //       <Flex justifyContent="space-between">
    //         <Button
    //           disabled={MedicationType === "Prescribed" && Quantity !== 0}
    //           colorScheme={"teal"}
    //           onClick={() => {
    //             if (Quantity === 0) {
    //               viewAlternatives();
    //             } else {
    //               addToCart(Medicine);
    //             }
    //           }}
    //         >
    //           {Quantity === 0 ? "View Alternatives" : "Add to Cart"}
    //         </Button>
    //       </Flex>
    //     </Tooltip>
    //   </Flex>
    // </Flex>
  );
};

export default MedicineCard;
