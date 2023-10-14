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
  const [Archived, setArchived] = useState(Medicine.State);
  const [message, setMessage] = useState("");
  const [use, setUse] = useState("");
  const [Ingredient, setIngredient] = useState("");

  const isArchviedC = Archived === "archived" ? "red" : "green";
  const isArchvied = Archived === "archived" ? "Not Avabile" : "Avabile";

  // handle edit
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image src={MImage} alt={Name} borderRadius="15px" boxSize="200px" />
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
        {/* <Text fontSize="sm" color="gray.500" fontWeight="400">
          Quantity: {Quantity}
        </Text> */}
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          Price : {Price} EGP
        </Text>
        {/* <Text fontSize="sm" color="gray.500" fontWeight="400">
          Sales : {Sales}
        </Text> */}
        <br />
        <Text fontSize="sm" color="gray.500" fontWeight="400" mb="10px">
          {Description}
        </Text>
        <Flex justifyContent="space-between"></Flex>
      </Flex>
    </Flex>
  );
};

export default MedicineCard;
