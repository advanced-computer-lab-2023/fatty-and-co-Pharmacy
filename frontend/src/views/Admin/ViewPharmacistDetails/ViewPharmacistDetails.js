import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Table,
  Tr,
  Th,
  THead,
  Tbody,
  HStack,
  useColorModeValue,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
  FaBirthdayCake,
  FaMoneyBillAlt,
  FaHospital,
  FaGraduationCap,
} from "react-icons/fa";

import {
  ChevronRightIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  EmailIcon,
} from "@chakra-ui/icons";

export const ViewPharmacistDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNum: "",
    dateOfBirth: "",
    hourlyRate: 0,
    affiliation: "",
    educationalBackground: "",
  });

  const [username, setUsername] = useState("");
  const [textboxValue, setTextboxValue] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    axios
      .get(API_PATHS.adminViewPharmacist + username, {
        headers: { Authorization },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setFormData((prevState) => ({
          ...prevState,
          name: data.Name,
          email: data.Email,
          dateOfBirth: data.DateOfBirth,
          hourlyRate: data.HourlyRate,
          affiliation: data.Affiliation,
          educationalBackground: data.EducationalBackground,
        }));
        // console.log(formData);
      })
      .catch((error) => console.log(error));
  }, [username]);

  console.log(formData);

  const handleSubmit = () => {
    console.log("Submitted");
    setUsername(textboxValue);
  };

  const handleChange = (event) => {
    setTextboxValue(event.target.value);
  };

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color="black" fontWeight="bold">
          Search for a pharmacist
        </Text>
      </CardHeader>
      <CardBody px="5px">
        <Flex direction="column" w="100%">
          <Box>
            <HStack>
              <FormControl id="username" isRequired mb="4">
                <FormLabel>Search by username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={textboxValue}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="teal" onClick={handleSubmit} width="120px">
                Search
              </Button>
            </HStack>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="4"
              boxShadow="md"
            >
              <Card>
                <CardHeader p="12px 5px" mb="12px">
                  <HStack>
                    <InfoOutlineIcon color="teal.400" />
                    <Text fontSize="lg" fontWeight="bold">
                      {formData.name} Information
                    </Text>
                  </HStack>
                </CardHeader>
                <CardBody>
                  {username && username !== ":username" ? (
                    <Flex flexDirection="column">
                      <HStack>
                        <Icon
                          as={EmailIcon}
                          boxSize={6}
                          color={useColorModeValue("teal.500", "teal.300")}
                        />
                        <Text fontWeight="normal">{formData.email}</Text>
                      </HStack>
                      <Divider my="2" />
                      <HStack>
                        <Icon
                          as={FaBirthdayCake}
                          boxSize={6}
                          color={useColorModeValue("teal.500", "teal.300")}
                        />
                        <Text fontWeight="normal">
                          {formData.dateOfBirth.slice(0, 10)}
                        </Text>
                      </HStack>
                      <Divider my="2" />
                      <HStack>
                        <Icon
                          as={FaMoneyBillAlt}
                          boxSize={6}
                          color={useColorModeValue("teal.500", "teal.300")}
                        />
                        <Text>${formData.hourlyRate}</Text>
                      </HStack>
                      <Divider my="2" />
                      <HStack>
                        <Icon
                          as={FaHospital}
                          boxSize={6}
                          color={useColorModeValue("teal.500", "teal.300")}
                        />
                        <Text>{formData.affiliation}</Text>
                      </HStack>
                      <Divider my="2" />
                      <HStack>
                        <Icon
                          as={FaGraduationCap}
                          boxSize={6}
                          color={useColorModeValue("teal.500", "teal.300")}
                        />
                        <Text>{formData.educationalBackground}</Text>
                      </HStack>
                    </Flex>
                  ) : (
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                      Username not found
                    </Text>
                  )}
                </CardBody>
              </Card>
            </Box>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
