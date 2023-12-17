import React, { useEffect } from "react";
import Requests from "./components/RequestsTable";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { useRequestsContext } from "hooks/useRequestsContext";
import Header from "./components/Header";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Button,
  Box,
  Heading,
  Spacer,
  Table,
  useToast,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Td,
} from "@chakra-ui/react";
import { ViewPharmacistDetails } from "../ViewPharmacistDetails/ViewPharmacistDetails";
import { ViewPatientDetails } from "../ViewPatientDetails/ViewPatientDetails";
import DeleteUserForm from "../DeleteUser/DeleteUserForm";

export function ViewRequestsInner() {
  // const [data, setData] = useState([{}]);
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  const { requests, dispatch } = useRequestsContext();

  const toast = useToast();
  useEffect(() => {
    axios
      .get(API_PATHS.getRequests, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        // setData(response.data); // Set the fetched data in the state
        dispatch({ type: "GET_REQUESTS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        toast({
          title: "Error",
          description: "Error fetching data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <Flex direction="column">
      <Header backgroundHeader={ProfileBgImage} backgroundProfile={bgProfile} />
      <Box pt="50px">
        <Grid templateColumns={{ sm: "1fr", xl: "3fr 2fr" }} gap="22px">
          <Requests
            title={"Requests"}
            captions={["Name", "Username", "Status", ""]}
            data={requests}
          />
          <Card>
            <CardHeader>
              <Flex justify="space-between" align="center" mb="1rem" w="100%">
                <Text fontSize="xl" color="black" fontWeight="bold">
                  User Search
                </Text>
              </Flex>
            </CardHeader>
            <ViewPharmacistDetails />
            <ViewPatientDetails />
            <DeleteUserForm />
          </Card>
        </Grid>
      </Box>
    </Flex>
  );
}
