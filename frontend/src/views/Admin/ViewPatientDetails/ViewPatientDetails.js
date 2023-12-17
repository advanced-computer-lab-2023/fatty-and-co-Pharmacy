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
  PhoneIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";

export const ViewPatientDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNum: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: {
      fullName: "",
      phoneNumber: "",
      relation: "",
    },
  });

  const [username, setUsername] = useState("");
  const [textboxValue, setTextboxValue] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    axios
      .get(API_PATHS.adminViewPatient + username, {
        headers: { Authorization },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setFormData((prevState) => ({
          ...prevState,
          name: data.Name,
          email: data.Email,
          mobileNum: data.MobileNum,
          dateOfBirth: data.DateOfBirth,
          gender: data.Gender,
          emergencyContact: {
            fullName: data.EmergencyContact.FullName,
            phoneNumber: data.EmergencyContact.PhoneNumber,
            relation: data.EmergencyContact.Relation,
          },
        }));
      })
      .catch((error) => console.log(error));
  }, [username]);

  const handleSubmit = () => {
    setUsername(textboxValue);
  };

  const handleChange = (event) => {
    setTextboxValue(event.target.value);
  };

  return (
    <Box mt="40px">
      <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
        <CardHeader p="12px 5px" mb="12px">
          <Text fontSize="lg" color="grey" fontWeight="bold">
            Search for a patient
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
                    {username && (
                      <HStack>
                        <InfoOutlineIcon color="teal.400" />
                        <Text fontSize="lg" fontWeight="bold">
                          {formData.name} Information ({formData.gender})
                        </Text>
                      </HStack>
                    )}
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
                            as={PhoneIcon}
                            boxSize={6}
                            color={useColorModeValue("teal.500", "teal.300")}
                          />
                          <Text>{formData.mobileNum}</Text>
                        </HStack>
                        <Divider my="2" />
                        <Box mt="20px">
                          <HStack>
                            <Icon
                              as={WarningTwoIcon}
                              boxSize={6}
                              color={useColorModeValue("teal.500", "teal.300")}
                            />
                            <Text fontWeight="bold">
                              EmergencyContact:{" "}
                              {formData.emergencyContact.fullName}
                            </Text>
                          </HStack>
                          <Divider my="2" />
                          <HStack>
                            <Icon
                              as={InfoOutlineIcon}
                              boxSize={6}
                              color={useColorModeValue("teal.500", "teal.300")}
                            />
                            <Text>{formData.emergencyContact.relation}</Text>
                          </HStack>
                          <Divider my="2" />
                          <HStack>
                            <Icon
                              as={PhoneIcon}
                              boxSize={6}
                              color={useColorModeValue("teal.500", "teal.300")}
                            />
                            <Text>{formData.emergencyContact.phoneNumber}</Text>
                          </HStack>
                        </Box>
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
    </Box>
  );
};
