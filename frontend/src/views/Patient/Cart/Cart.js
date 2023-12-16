import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { useAuthContext } from "hooks/useAuthContext";
import { useCartContext } from "hooks/useCartContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { IconButton } from "@chakra-ui/react"
import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Link,
    useColorModeValue,
    Heading,
    Text,
    useToast,
} from "@chakra-ui/react";

function Cart() {
    const { user } = useAuthContext();
    const Authorization = `Bearer ${user.token}`;
    const [cart, setCart] = useState([]);
    const { cart:medicine , dispatch } = useCartContext();
    const textColor = useColorModeValue("gray.700", "white");
    const toast = useToast();
    const [subscription, setSubscription] = useState([{}]);
    const [myPackage, setMyPackage] = useState([{}]);

    useEffect(() => {
        fetchCart();
        getSubscriptionInfo();
    }, []);

    const fetchCart = () => {
        // Fetch all cart items.
        axios
            .get(API_PATHS.viewCart, {
                headers: { Authorization },
            })
            .then((response) => {
                setCart(response.data.cart);
                dispatch({ type: "SET_CART", payload: response.data.medicine });
                console.log("Cart:", medicine);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
            });
    };

    const deleteItem = async (medicineId) => {
        try {
            const url = API_PATHS.deleteItem + `?Medicine=${medicineId}`;
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            setCart(response.data);
            fetchCart();
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const incrementItem = async (medicineId) => {
        try {
            const url = API_PATHS.addItemToCart + `?Medicine=${medicineId}`;
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            setCart(response.data);
            fetchCart();
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        fetchCart();
    };

    const decrementItem = async (medicineId) => {
        try {
            console.log(medicineId);
            const url = API_PATHS.decrementItem + `?Medicine=${medicineId}`;
            console.log(url);
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            setCart(response.data);
            fetchCart();
        } catch (error) {
            console.error("Error decrementing item:", error);
        }
    }

    const checkout = async () => {
        history.push('/checkout');
    };

    const getSubscriptionInfo = () => {
        const url = API_PATHS.viewSubscription;
        axios
        .get(url, {
            headers: {
            Authorization: Authorization,
            },
        })
        .then((response) => {
            setMyPackage(response.data.package);
            setSubscription(response.data.subscription);
        })
        .catch((err) => console.log(err));
    }

    return (
        <Box pt="20px">
            <Flex
                direction={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="flex-start"
                pt="50px"
            >
                <Card my={{ base: "22px", md: "0" }} mr={{ base: "0", md: "16px" }} overflowX={{ sm: "scroll", xl: "hidden" }} flex="3">
                    <CardHeader p="6px 0px 22px 0px">
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                color={textColor}
                                fontWeight="bold"
                                pb=".5rem"
                            >
                                Cart
                            </Text>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Medicine Name</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Total Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                
                                {medicine?.map((med) => (
                                    <Tr
                                        key={med._id}
                                    >
                                        <Td>
                                            {med && med.Name
                                                ? med.Name
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            {med && med.Quantity
                                                ? med.Quantity
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            {med && med.Price
                                                ? med.Price
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            {med && med.TotalPrice
                                                ? med.TotalPrice
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="teal"
                                                aria-label="Increment Item"
                                                icon={<AddIcon />}
                                                onClick={() => incrementItem(med.id)}
                                            />
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="teal"
                                                aria-label="Decrement Item"
                                                icon={<MinusIcon />}
                                                onClick={() => decrementItem(med.id)}
                                            />
                                        </Td>
                                        <Td>
                                            <IconButton
                                                colorScheme="red"
                                                aria-label="Delete Item"
                                                icon={<DeleteIcon />}
                                                onClick={() => deleteItem(med.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                                {/* <Tr>
                                    <Td colSpan="2" />
                                    <Td color="teal.500">Total</Td>
                                    <Td color="teal.500" >{cart.TotalCost}</Td>
                                    <Td><Button colorScheme="teal" variant="solid">
                                        Proceed to Checkout
                                    </Button></Td>
                                    <Td />
                                </Tr> */}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
                <Card my="22px" flex="1">
                    <CardHeader p="6px 0px 22px 0px">
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                pb=".5rem"
                            >
                                Order Summary
                            </Text>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Table variant="simple">
                            <Tbody>
                                <Tr>
                                    <Td>
                                        Medicine
                                    </Td>
                                    {myPackage.Medicine_Discount && 
                                        <Td>
                                            Price after discount
                                        </Td>   
                                    }
                                    {!myPackage.Medicine_Discount &&
                                        <Td>
                                            Price
                                        </Td>  
                                    }
                                </Tr>
                                    {medicine?.map((med) => (
                                        <Tr key={med._id}>
                                            <Td>
                                                {med && med.Name ? med.Name : "N/A"}
                                            </Td>
                                            {myPackage.Medicine_Discount && 
                                                <Td>
                                                    {med && med.TotalPrice ? parseFloat(med.TotalPrice - (med.TotalPrice * myPackage.Medicine_Discount / 100)).toFixed(2) : "N/A"}
                                                </Td>   
                                            }
                                            {!myPackage.Medicine_Discount &&
                                                <Td>
                                                    {med && med.TotalPrice}
                                                </Td>  
                                            }
                                        </Tr>
                                    ))}
                                <Tr>
                                    <Td textAlign="right">
                                        <Heading as="h3" size="lg" textAlign="right">
                                            Total:
                                        </Heading></Td>
                                    <Td textAlign="left">
                                        <Heading as="h3" size="lg" textAlign="left">
                                            {cart.TotalCost ? parseFloat(cart.TotalCost).toFixed(2) : 0}
                                        </Heading>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td colSpan="4">
                                        <Button colorScheme="teal">
                                            <Link href="./checkout" size="lg" variant="solid">
                                                Proceed to Checkout
                                            </Link>
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Flex>
        </Box >
    );
}

export default Cart;
