import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get(API_PATHS.adminViewPatient + username)
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
    <Box pt="80px">
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter username"
          value={textboxValue}
          onChange={handleChange}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Search</Button>
      {(username && username !== ":username" && (
        <Flex flexDirection="column">
          <Text>
            <strong>Name: </strong>
            {formData.name}
          </Text>
          <Text>
            <strong>Email: </strong>
            {formData.email}
          </Text>
          <Text>
            <strong>Mobile Number: </strong>
            {formData.mobileNum}
          </Text>
          <Text>
            <strong>Date of Birth: </strong>
            {formData.dateOfBirth.slice(0, 10)}
          </Text>
          <Text>
            <strong>Gender: </strong>
            {formData.gender}
          </Text>
          <Text>
            <strong>Emergency Contact Name: </strong>
            {formData.emergencyContact.fullName}
          </Text>
          <Text>
            <strong>Emergency Contact Phone Number: </strong>
            {formData.emergencyContact.phoneNumber}
          </Text>
          <Text>
            <strong>Emergency Contact Relation: </strong>
            {formData.emergencyContact.relation}
          </Text>
        </Flex>
      )) || (
        <Text fontSize="3xl" fontWeight="bold">
          Username not found
        </Text>
      )}
    </Box>
  );
};
