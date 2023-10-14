// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
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
import { API_PATHS } from "../../../API/api_paths";
import axios from "axios";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";

function Index() {
  // Chakra color mode
  // const [medicines, setMedicines] = useState([]);
  const { medicines, dispatch } = useMedicineContext();
  const textColor = useColorModeValue("gray.700", "white");
  const [searchAndFilterParams, setSearchAndFilterParams] = useState({
    Name: "",
    Medicinal_Use: [],
  });

  useEffect(() => {
    axios
      .get(API_PATHS.getMedicines, { params: searchAndFilterParams })
      .then((response) => {
        dispatch({ type: "SET_MEDICINES", payload: response.data });
      })
      .catch((err) => console.log(err));
  }, [searchAndFilterParams]);

  return (
    <Flex direction="column">
      <MedicineGroup
        medicines={medicines}
        searchAndFilterParams={searchAndFilterParams}
        setSearchAndFilterParams={setSearchAndFilterParams}
      />

      {
        // medicines && medicines.map((medicine)=>(
        //   <p style={{margin:"100px"}} key={medicine._id}>{medicine.Name}</p>
        // ))
      }
    </Flex>
  );
}

export default Index;
