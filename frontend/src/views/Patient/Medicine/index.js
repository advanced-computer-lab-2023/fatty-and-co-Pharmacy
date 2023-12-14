// Chakra imports
import { Flex, Grid, Spinner, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import MedicineGroup from "./components/MedicineGroup";
import { useState, useEffect } from "react";
import { useMedicineContext } from "../../../hooks/useMedicineContext";
import { useCartContext } from "../../../hooks/useCartContext";
import { API_PATHS } from "../../../API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";

function Index() {
  // Chakra color mode
  // const [medicines, setMedicines] = useState([]);
  const { medicines, dispatch } = useMedicineContext();
  const { cart, dispatch: cartDispatch } = useCartContext();
  const textColor = useColorModeValue("gray.700", "white");
  const [searchAndFilterParams, setSearchAndFilterParams] = useState({
    Name: "",
    Medicinal_Use: [],
  });

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  useEffect(() => {
    axios
      .get(API_PATHS.getMedicines, {
        params: searchAndFilterParams,
        headers: { Authorization },
      })
      .then((response) => {
        dispatch({ type: "SET_MEDICINES", payload: response.data });
      })
      .catch((err) => console.log(err));

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
      
  }, [searchAndFilterParams]);

  return (
    <Flex direction="column">
      {medicines ? (
        <MedicineGroup
          medicines={medicines}
          searchAndFilterParams={searchAndFilterParams}
          setSearchAndFilterParams={setSearchAndFilterParams}
        />
      ) : (
        <Spinner></Spinner>
      )}

      {
        // medicines && medicines.map((medicine)=>(
        //   <p style={{margin:"100px"}} key={medicine._id}>{medicine.Name}</p>
        // ))
      }
    </Flex>
  );
}

export default Index;
