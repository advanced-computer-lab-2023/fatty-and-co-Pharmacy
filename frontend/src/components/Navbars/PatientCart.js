// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Link,
  Popover,
  IconButton,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  StackDivider,
  PopoverArrow,
  PopoverCloseButton,
  Image,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  extendTheme,
} from "@chakra-ui/react";
import { MdAttachMoney } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { useAuthContext } from "hooks/useAuthContext";
import React from "react";
import axios from "axios";
import { API_PATHS } from "API/api_paths";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';


const theme = extendTheme({
  icons: {
    MdAttachMoney,
  },
});

export default function PatientCart() {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const [medicine, setMedicine] = useState([{}]);
  const [fileUrlMap, setFileUrlMap] = useState(new Map());  
  const history = useHistory();
  useEffect(() => {

     const fetchCart = async () => {
        // Fetch all cart items.
        await axios
            .get(API_PATHS.viewCart, {
                headers: { Authorization },
            })
            .then((response) => {
                setMedicine(response.data.medicine);
                fetchMedicineImages(response.data.medicine);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
            });
    };

    const fetchMedicineImages = async (meds) => {
        try {
          const urls = await Promise.all(
            meds.map(async(med) => {
              try {
                let imageFilename;
                if(!med){
                  console.error("no image");
                  return "fail";
                }
                if (med.Image && med.Image.filename) {
                  const { filename } = med.Image;
                  imageFilename = filename;
                } else {
                  console.error("Image or filename is undefined for:", med);
                  return "fail";
                }
  
                const response = await fetch(API_PATHS.downloadFile + imageFilename, {
                  method: "GET",
                  headers: {
                    Authorization,
                  },
                });
  
                if (!response.ok) {
                  console.error(`Failed to fetch image for ${med.Name}. Status: ${response.status}`);
                  return "fail";
                }else{
                  const file = await response.blob();
                  const fileUrl = URL.createObjectURL(file);
                  
                  // Update the Map with the medicine ID and file URL
                  setFileUrlMap((prevMap) => new Map(prevMap.set(med.id, fileUrl)));
                  return fileUrl;
                };
  
  
              } catch (error) {
                console.error("Error fetching file:", error);
                return "fail";
              }
            })
          )
  
          console.log(fileUrlMap);
          // Remove null or undefined values
          // const filteredUrls = urls.filter((url) => url !== null && url !== undefined);
        } catch (error) {
          console.error("Error fetching medicine images:", error);
        }
      }
      fetchCart();
  }, [Authorization]);

  let navbarIcon = useColorModeValue("gray.500", "gray.200");

  return (
      <Popover>
        <PopoverTrigger>
          <IconButton icon={<BsCart2 />} color={navbarIcon} w="22px" h="22px" me="0px" mb="5px"
            variant="unstyled"  _hover={{ bg: "white" }}/>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Cart</PopoverHeader>
          <PopoverBody>
            <Flex direction='column' w='100%' >
            <Stack divider={<StackDivider />} spacing='1' flex='1' align='center' flexDirection='column'>
              {medicine.map((med, index) => (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  key={index}
                  mr="2" 
                >
                  {fileUrlMap.get(med.id) !== "fail" && (
                    <Image
                      src={fileUrlMap.get(med.id)}
                      alt={med.Name}
                      borderRadius="15px"
                      boxSize="50px"
                    />
                  )}
                  <Flex direction="column" ml="10"> 
                    <Heading as="h4" size="sm" color="teal" align="center">
                      {med.Name}
                    </Heading>
                    <Text fontSize="xs" color="gray.500" align="center">
                      Quantity: {med.Quantity}
                    </Text>
                  </Flex>
                </Flex>
              ))}
              </Stack>
              <Button colorScheme="teal" onClick={()=>{history.push('./cart')}}>
                    Go to cart
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
)}

