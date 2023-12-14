import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { API_PATHS } from "API/api_paths";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";

function DeleteUserForm() {
  const [Username, setUsername] = useState("");
  const toast = useToast();

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const textColor = useColorModeValue("gray.700", "white");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .delete(
        API_PATHS.deleteUser,
        { Username },
        { headers: { Authorization } }
      )
      .then((response) => {
        // Handle success or provide feedback to the user
        toast({
          title: "User deleted successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUsername(""); // Clear the input field
      })
      .catch((error) => {
        toast({
          title: "Failed to delete user",
          description: error.response.data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.error("An error occurred", error);
      });
  };

  return (
    <Box pt="80px">
      <Flex
        direction="column"
        alignItems="flex-start"
        pt="50px"
        justifyContent="flex-start"
      >
        <Card
          p="22px"
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}
        >
          <CardHeader>
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Delete User
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button
                    colorScheme="red"
                    borderColor="red.300"
                    color="red.300"
                    fontSize="xs"
                    p="8px 32px"
                    type="submit"
                    textColor="white"
                  >
                    <Icon as={FaTrashAlt} mr={2} />
                    Delete
                  </Button>
                </Stack>
              </form>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}

export default DeleteUserForm;
