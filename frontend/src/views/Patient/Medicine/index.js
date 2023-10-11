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

function Index() {
  // Chakra color mode
  // const [medicines, setMedicines] = useState([]);
  const { medicines, dispatch } = useMedicineContext();
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // API_PATHS.getMedicines
        // "medicine/medicines"
        const res = await fetch(API_PATHS.getMedicines);
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "SET_MEDICINES", payload: data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <Flex direction="column">
      <MedicineGroup medicines={medicines} />

      {
        // medicines && medicines.map((medicine)=>(
        //   <p style={{margin:"100px"}} key={medicine._id}>{medicine.Name}</p>
        // ))
      }
    </Flex>
  );
}

export default Index;