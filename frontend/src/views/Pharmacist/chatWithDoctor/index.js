import React, { useEffect, useState } from "react";
import { Flex, Box, Text, HStack, toast } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { API_PATHS } from "API/api_paths";
import { useAuthContext } from "hooks/useAuthContext";
import Conversation from "components/Chat/Conversation";
import ChatBox from "components/Chat/ChatArea/ChatBox";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000"; // clinic socket
const socket = socketIOClient(ENDPOINT);
const ChatWithDoctor = () => {
  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  console.log(user);

  const [currentUsername, setCurrentUsername] = useState("");

  const [chatDoctors, setChatDoctors] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(false);

  const getPharmacistUsername = async () => {
    try {
      const response = await axios.get(API_PATHS.getPharmacistUsernameSocket, {
        headers: { Authorization },
      });
      setCurrentUsername(response.data);
      console.log(response.data);
      //socket.emit('addUser', response.data); // Add this line
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {}, [chatDoctors]);

  const fetchMessages = async () => {
    try {
      console.log("fetching messages");
      console.log(currentDoctor.Username);
      const patUser = currentDoctor.Username;
      const response = await axios.get(API_PATHS.getMessages, {
        params: { Receiver: patUser },
        headers: { Authorization },
      });
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {}, [selectedDoctor]);

  useEffect(() => {}, [messages]);

  useEffect(() => {
    if (currentDoctor) {
      console.log("current doctor");
      console.log(currentDoctor);
      fetchMessages();
    }
  }, [currentDoctor]);

  const handleDoctorClick = async (doctor) => {
    setCurrentDoctor(doctor);
    setSelectedDoctor(true);

    // const updatedPat = chatDoctors.map((d) =>
    //   d.Username === doctor.Username ? { ...d, hasNotif: false } : d
    // );
    // setChatDoctors(updatedPat);

    console.log("clicked");
    console.log(doctor.Username);

    // await axios.put(
    //   API_PATHS.setNotificationsToSeen,
    //   { senderUsername: doctor.Username },
    //   { headers: { Authorization } }
    // );
  };

  const fetchConversations = async () => {
    try {
      const response = await axios.get(API_PATHS.getAllDoctors, {
        headers: { Authorization },
      });
      console.log("chat patients");
      console.log(response.data);
      setChatDoctors(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    console.log("user type");
    // console.log(user.Type);
    if (user.userType === "Pharmacist") {
      getPharmacistUsername();
    }
    console.log("current username");
    fetchConversations();
  }, []);

  return (
    <Flex marginTop={75}>
      <HStack spacing="300" w="850px" align="start">
        <Box w="250px">
          <Text>Doctors</Text>
          {chatDoctors.map((doctor) => (
            <Conversation
              key={doctor._id}
              user={doctor}
              onClick={() => handleDoctorClick(doctor)}
              hasNotif={doctor.hasNotif}
            />
          ))}
        </Box>
        {selectedDoctor ? (
          <Box w="600px">
            <Text>Chat</Text>
            <ChatBox messages={messages} receiver={currentDoctor} />
          </Box>
        ) : (
          <span>Open a conversation to see Chat</span>
        )}
      </HStack>
    </Flex>
  );
};

export default ChatWithDoctor;
