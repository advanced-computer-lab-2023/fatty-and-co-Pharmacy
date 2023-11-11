import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { AddIcon } from '@chakra-ui/icons'
import { AiFillCreditCard } from "react-icons/ai"
import MakePayment from "views/Patient/makePayment";
import react from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "views/Patient/makePayment/components/PaymentForm";

const PUBLIC_KEY =
    "pk_test_51O9tZeDlw6jDceOALILn3gb3eOAzBSHSuIQKUqUxTX8eSdJn36QpsxAqKWskgVA5TNzo5Zx3OAQbn3I7ZjZHxSZX00M5RKDnCM";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
import {
    Box,
    Radio,
    Stack,
    RadioGroup,
    HStack,
    Heading,
    FormErrorMessage,
    Input,
    Flex,
    FormControl,
    FormLabel,
    Button,
    Select,
    useToast,
} from "@chakra-ui/react";

function Checkout() {
    const { user } = useAuthContext();
    const Authorization = `Bearer ${user.token}`;
    const [cost, setCost] = useState(0);
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [proceedToPayment, setProceedToPayment] = useState(false);
    const toast = useToast();

    useEffect(() => {
        viewDeliveryAddresses();
        fetchCost();
    }, []);

    const viewDeliveryAddresses = async () => {
        try {
            const url = API_PATHS.viewDeliveryAddresses;
            const response = await axios.get(url, {
                headers: { Authorization },
            });
            setDeliveryAddresses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching delivery addresses:", error);
        }
    };
    const handleAddAddressClick = () => {
        setShowAddAddressForm(true);
    };
    const handleCancelAddAddress = () => {
        setShowAddAddressForm(false);
    };

    const fetchCost = () => {
        axios
            .get(API_PATHS.viewCart, {
                headers: { Authorization },
            })
            .then((response) => {
                console.log(response);
                setCost(response.data.cart.TotalCost);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
            });
    };

    const handleCheckout = async () => {
        try {
            if (selectedPaymentMethod == "Credit Card") {
                setProceedToPayment(true);
            } else {
                onClickPay();
                fetchCost();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error checking out.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    };

    const onClickPay = async () => {
        const url = API_PATHS.checkout;
        if (cost == 0) {
            toast({
                title: "Error",
                description: "Your cart is empty.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        if (!selectedPaymentMethod || !selectedAddress) {
            toast({
                title: "Error",
                description: "Please enter payment method and select an address.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        const response = await axios.post(url, null, {
            headers: { Authorization },
            params: {
                PaymentMethod: selectedPaymentMethod,
                DeliveryAddress: selectedAddress._id,
            }
        }).then((response) => {
            console.log(response.data);
            fetchCost();
            toast({
                title: "Thank you for your order!",
                description:
                    "Your order will arrive shortly.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }).catch((error) =>
            toast({
                title: "Error",
                description: "Error checking out.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        );
    }

    const handleAddNewAddress = async (addressValues) => {
        try {
            console.log(addressValues);
            const url = API_PATHS.addDeliveryAddress;
            const response = await axios.post(url, null, {
                headers: { Authorization },
                params: addressValues,
            });
            console.log(response);
            viewDeliveryAddresses();
            setShowAddAddressForm(false);
            toast({
                title: "Thank your for adding a new address.",
                description:
                    "We added your new shipping address.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Error adding a new address.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    };
    const handleAddressSelect = (addressId) => {
        console.log(addressId);
        const selected = deliveryAddresses.find((address) => address._id === addressId);
        setSelectedAddress(selected);
        console.log(selected);
    };

    return (
        <Box pt="80px">
            <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
                {!proceedToPayment ? (
                    <Flex
                        direction="column"
                        w="800px"
                        background="transparent"
                        borderRadius="15px"
                        p="40px"
                        mx={{ base: "100px" }}
                        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                    >
                        <Stack spacing={6}>
                            <Heading as="h3" size="lg" textAlign="center">
                                Checkout
                            </Heading>
                            <Heading as="h3" size="lg" textAlign="left">
                                Total: {cost}
                            </Heading>
                            <Heading as="h5" size="sm" textAlign="left">
                                Please enter your details.
                            </Heading>
                            <Heading></Heading>
                        </Stack>
                        {/* Order details */}
                        <Formik
                            initialValues={{
                                Details: "",
                                PaymentMethod: "",
                                DeliveryAddress: {},
                            }}

                            onSubmit={(values) => {
                                console.log("Form submitted with values:", values);
                                handleCheckout(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field name="Details">
                                        {({ field }) => (
                                            <FormControl
                                                mb="24px"
                                                isInvalid={errors.Street && touched.Street}
                                            >
                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                    Additional Details
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    fontSize="sm"
                                                    ms="4px"
                                                    borderRadius="15px"
                                                    type="text"
                                                    placeholder="Enter any additional details"
                                                    size="lg"
                                                />
                                                <FormErrorMessage>{errors.Details}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="PaymentMethod">
                                        {({ field }) => (
                                            <FormControl
                                                mb="24px"
                                                isInvalid={errors.PaymentMethod && touched.PaymentMethod}
                                            >
                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                    Payment Method <span style={{ color: "red" }}>*</span>
                                                </FormLabel>
                                                <RadioGroup
                                                    id="paymentMethod"
                                                    name="paymentMethod"
                                                    required
                                                    value={selectedPaymentMethod}
                                                    onChange={(value) => setSelectedPaymentMethod(value)}
                                                >
                                                    <Stack required direction="row">
                                                        <Radio value="Wallet">Wallet</Radio>
                                                        <Radio value="Cash">Cash</Radio>
                                                        <Radio value="Credit Card">Credit Card</Radio>
                                                    </Stack>
                                                    <FormErrorMessage>{errors.PaymentMethod}</FormErrorMessage>
                                                </RadioGroup>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="DeliveryAddress">
                                        {({ field }) => (
                                            <FormControl
                                                mb="24px"
                                                isInvalid={errors.DeliveryAddress && touched.DeliveryAddress}
                                            >
                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                    Delivery Address <span style={{ color: "red" }}>*</span>
                                                </FormLabel>
                                                <Select
                                                    {...field}
                                                    id="DeliveryAddress"
                                                    name="DeliveryAddress"
                                                    placeholder={
                                                        selectedAddress
                                                            ? `Selected Address: ${selectedAddress.Street}, ${selectedAddress.Building}, ${selectedAddress.City}, ${selectedAddress.State}, ${selectedAddress.Country}, ${selectedAddress.PostalCode}`
                                                            : "Select an address"
                                                    }
                                                    onChange={(e) => handleAddressSelect(e.target.value)}
                                                    mb="4"
                                                >
                                                    {deliveryAddresses.map((address) => (
                                                        <option key={address._id} value={address._id}>
                                                            {address.Street}, {address.Building}, {address.City}, {address.State}, {address.Country}, {address.PostalCode}
                                                        </option>
                                                    ))}
                                                </Select>
                                                <FormErrorMessage>{errors.DeliveryAddress}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    {showAddAddressForm ? (
                                        <Formik
                                            initialValues={{
                                                Street: "",
                                                Building: "",
                                                City: "",
                                                State: "",
                                                Country: "",
                                                PostalCode: "",
                                            }}
                                            onSubmit={(values) => {
                                                console.log("Form submitted with values:", values);
                                                handleAddNewAddress(values);
                                            }}
                                        >
                                            {({ errors, touched }) => (
                                                <Form>
                                                    <Field name="Street">
                                                        {({ field }) => (
                                                            <FormControl
                                                                mb="24px"
                                                                isInvalid={errors.Street && touched.Street}
                                                            >
                                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                                    Street name <span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                    fontSize="sm"
                                                                    ms="4px"
                                                                    borderRadius="15px"
                                                                    type="text"
                                                                    placeholder="Enter your Street Name"
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.Street}</FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                    <Field name="Building">
                                                        {({ field }) => (
                                                            <FormControl
                                                                mb="24px"
                                                                isInvalid={errors.Building && touched.Building}
                                                            >
                                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                                    Building <span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                    fontSize="sm"
                                                                    ms="4px"
                                                                    borderRadius="15px"
                                                                    type="text"
                                                                    placeholder="Enter your Building Number"
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.Building}</FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                    <Field name="City">
                                                        {({ field }) => (
                                                            <FormControl
                                                                mb="24px"
                                                                isInvalid={errors.City && touched.City}
                                                            >
                                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                                    City <span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                    fontSize="sm"
                                                                    ms="4px"
                                                                    borderRadius="15px"
                                                                    type="text"
                                                                    placeholder="Enter your City"
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.City}</FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                    <Field name="State">
                                                        {({ field }) => (
                                                            <FormControl
                                                                mb="24px"
                                                                isInvalid={errors.State && touched.State}
                                                            >
                                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                                    State <span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                    fontSize="sm"
                                                                    ms="4px"
                                                                    borderRadius="15px"
                                                                    type="text"
                                                                    placeholder="Enter your State"
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.State}</FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                    <Field name="Country">
                                                        {({ field }) => (
                                                            <FormControl
                                                                mb="24px"
                                                                isInvalid={errors.Country && touched.Country}
                                                            >
                                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                                    Country<span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                    fontSize="sm"
                                                                    ms="4px"
                                                                    borderRadius="15px"
                                                                    type="text"
                                                                    placeholder="Enter your Country"
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.Country}</FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                    <Field name="PostalCode">
                                                        {({ field }) => (
                                                            <FormControl
                                                                mb="24px"
                                                                isInvalid={errors.PostalCode && touched.PostalCode}
                                                            >
                                                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                                    Postal Code<span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Input
                                                                    {...field}
                                                                    fontSize="sm"
                                                                    ms="4px"
                                                                    borderRadius="15px"
                                                                    type="text"
                                                                    placeholder="Enter your postal code"
                                                                    size="lg"
                                                                />
                                                                <FormErrorMessage>{errors.PostalCode}</FormErrorMessage>
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                    <HStack spacing={8}>
                                                        <Button ml="5" colorScheme="teal" variant="link" type="submit" >
                                                            Add address
                                                        </Button>
                                                        <Button colorScheme="red" variant="link" onClick={handleCancelAddAddress}>
                                                            Cancel
                                                        </Button>
                                                    </HStack>
                                                </Form>
                                            )}
                                        </Formik>
                                    ) : (
                                        <Stack spacing={6}>
                                            <Button leftIcon={<AddIcon />} variant="link" colorScheme="teal" onClick={handleAddAddressClick} mt="4">
                                                Add New Address
                                            </Button>
                                        </Stack>
                                    )}
                                    <Stack spacing={6}>
                                        <Heading></Heading>
                                        <Button mt="1" colorScheme="teal" rightIcon={<AiFillCreditCard />} type="submit" >
                                            Proceed to Payment
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Flex>
                ) : (
                    <Elements stripe={stripeTestPromise}>
                        <PaymentForm amount={cost} onClickPay={onClickPay} />
                    </Elements>
                )}
            </Flex>
        </Box>
    );
}

export default Checkout;
