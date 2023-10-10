// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

const MedicineCard = ({ Medicine }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
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

  //
  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image src={MImage} borderRadius="15px" />
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          borderRadius="15px"
          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
        ></Box>
      </Box>
      <Flex direction="column">
        <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
          {Medicinal_Use.map((use) => (
            <Tag style={{margin:"0 5px 0 0"}}>{use}</Tag>
          ))}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
          {Name}
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
          Quantity: {Quantity}
          Price : {Price} EGP
          <br /> Sales : {Sales}
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
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
          >
            VIEW PROJECT
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MedicineCard;
