import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Icon,
  Img,
  useToast,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import { useRequestsContext } from "hooks/useRequestsContext";

function RequestButton({ Username, Status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // State to store data from the database
  const { requests, dispatch } = useRequestsContext();
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  const toast = useToast();

  useEffect(() => {

    axios
      .get(API_PATHS.getRequest, {
        params: { Username: Username },
        headers: { Authorization },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  const jsonData = JSON.stringify(data);

  const handleAccept = async () => {
    axios
      .post(
        API_PATHS.acceptRequest,
        { Username: Username },
        {
          headers: { Authorization },
        }
      )
      .then((response) => {
        console.log(response);
        toast({
          title: "Request accepted",
          description: "Request accepted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch({ type: "UPDATE_REQUEST", payload: response.data });
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
        toast({
          title: "Error accepting request",
          description: error.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleReject = async () => {
    axios
      .put(
        API_PATHS.rejectRequest,
        { Username: Username },
        {
          headers: { Authorization },
        }
      )
      .then((response) => {
        console.log(response);
        toast({
          title: "Request rejected",
          description: "Request rejected successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch({ type: "UPDATE_REQUEST", payload: response.data });
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
        toast({
          title: "Error rejecting request",
          description: error.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // handle file download
  const downloadIdFile = async () => {
    let IdFileName = data[0].IdFileName;
    const idF = await fetch(API_PATHS.getRequestFile + IdFileName, {
      headers: {
        Authorization: Authorization,
      },
    });
    const idFileBlob = await idF.blob();
    const idFileurl = URL.createObjectURL(idFileBlob);

    const link = document.createElement("a");
    link.href = idFileurl;
    link.download = "id file" + IdFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPharmacyDegreeFile = async () => {
    let PharmacyDegreeName = data[0].PharmacyDegreeName;
    const PharmacyDegre = await fetch(
      API_PATHS.getRequestFile + PharmacyDegreeName,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    );
    const PharmacyDegreeBlob = await PharmacyDegre.blob();
    const PharmacyDegreurl = URL.createObjectURL(PharmacyDegreeBlob);

    const link = document.createElement("a");
    link.href = PharmacyDegreurl;
    link.download = "pharmacy degree file" + PharmacyDegreeName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadWorkingLicenseFile = async () => {
    let WorkingLicenseName = data[0].WorkingLicenseName;
    const license = await fetch(
      API_PATHS.getRequestFile + WorkingLicenseName,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    );
    const licenseBlob = await license.blob();
    const licenseurl = URL.createObjectURL(licenseBlob);

    const link = document.createElement("a");
    link.href = licenseurl;
    link.download = "working license file" + WorkingLicenseName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // end of handle file download

  return (
    <>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
        Details
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {data ? (
              <div>
                <p>Request Details: {jsonData}</p>
                <VStack spacing={3} w="80%">
                  <button onClick={downloadIdFile}>
                    ID File
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                  <button onClick={downloadPharmacyDegreeFile}>
                    Pharmacy Degree
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                  <button onClick={downloadWorkingLicenseFile}>
                    Working License
                    <Icon as={DownloadIcon} me="3px" />
                  </button>
                </VStack>
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </ModalBody>
          <ModalFooter>
            {Status == "Pending" ? (
              <div>
                <Button colorScheme="green" mr={3} onClick={handleAccept}>
                  Accept
                </Button>
                <Button colorScheme="red" mr={3} onClick={handleReject}>
                  Reject
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequestButton;
