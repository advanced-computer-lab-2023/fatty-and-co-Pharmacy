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

  useEffect(() => {
    axios
      .get(API_PATHS.adminViewPharmacist + username)
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
            <strong>Date of Birth: </strong>
            {formData.dateOfBirth.slice(0, 10)}
          </Text>
          <Text>
            <strong>Hourly Rate: </strong>
            {formData.hourlyRate}
          </Text>
          <Text>
            <strong>Affiliation: </strong>
            {formData.affiliation}
          </Text>
          <Text>
            <strong>Educational Background: </strong>
            {formData.educationalBackground}
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
