// Chakra imports
import {
  Box,
  Radio,
  RadioGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Switch,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  Alert,
  AlertIcon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Progress,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import BgSignUp from "assets/img/BgSignUp.png";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

// Yup validation schema
const PharmSignUpSchema = Yup.object().shape({
  Username: Yup.string().required("Required"),
  Password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    ),
  Email: Yup.string().email("Invalid Email").required("Required").lowercase(),
  Name: Yup.string().required("Required"),
  DateOfBirth: Yup.date().required("Required"),
    // .min(eighteenYearsAgo, "You must be at least 18 years old"),
  HourlyRate: Yup.number().required("Required"),
  Affiliation: Yup.string().required("Required"),
  EducationalBackground: Yup.string().required("Required"),
});

const formatHourlyRate = (val) => `$` + val;

function pharmSignUp() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  const bgColor = useColorModeValue("white", "gray.700");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    axios
      .post(API_PATHS.pharmSignUp, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
      .then(async (response) => {
        console.log("Phamacist request submitted successfully!");
        toast({
          title: "Request Submitted Successfully.",
          description:
            "Your request has been sent for review. You will receive a confirmation when it is approved",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // window.location.href = "/auth/signin";
        //setSubmitting(false);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        console.log("Error submitting pharmacist request!");
        setError(data.message);
        toast({
          title: "An error occurred.",
          description: "Unable to create your account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Please fill in this registration form to request creating a pharmacist
          account and access our services!
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Formik
            initialValues={{
              Username: "",
              Password: "",
              Email: "",
              Name: "",
              DateOfBirth: "",
              HourlyRate: 1.0,
              Affiliation: "",
              EducationalBackground: "",
              IdFile: null,
              WorkingLicense: null,
              PharmacyDegree: null,
            }}
            validationSchema={PharmSignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, setFieldValue }) => (
              <Form id="pharmSignUp">
                <Field name="Username">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Username && touched.Username}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Username <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Enter your username"
                        // mb="24px"
                        size="lg"
                        // required
                      />
                      <FormErrorMessage>{errors.Username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Password">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Password && touched.Password}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Password <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          borderRadius="15px"
                          // mb="36px"
                          fontSize="sm"
                          type={showPassword ? "text" : "Password"}
                          placeholder="Your Password"
                          size="lg"
                          // required
                          // onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <FaEyeSlash onClick={handleShowClick} />
                          ) : (
                            <FaEye onClick={handleShowClick} />
                          )}
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.Password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Email">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Email && touched.Email}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Email <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="email"
                        placeholder="Your email address"
                        // mb="24px"
                        size="lg"
                        // required
                      />
                      <FormErrorMessage>{errors.Email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Name">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Name && touched.Name}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Name <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Your full name"
                        // mb="24px"
                        size="lg"
                        // required
                      />
                      <FormErrorMessage>{errors.Name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="DateOfBirth">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.DateOfBirth && touched.DateOfBirth}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Date of Birth <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="date"
                        placeholder="..."
                        // mb="24px"
                        size="lg"
                        // required
                      />
                      <FormErrorMessage>{errors.DateOfBirth}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="HourlyRate">
                  {({ field, form }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.HourlyRate && touched.HourlyRate}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Hourly Rate <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <NumberInput
                        {...field}
                        ms="4px"
                        borderRadius="15px"
                        size="lg"
                        onChange={(val) => {
                          form.setFieldValue(field.name, val);
                        }}
                        format={formatHourlyRate}
                        min={1}
                        // precision={2}
                        // max={50}
                      >
                        <NumberInputField fontSize="sm" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{errors.HourlyRate}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="Affiliation">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.Affiliation && touched.Affiliation}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Affiliation <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Enter The Hospital/Institution You Work At"
                        // mb="24px"
                        size="lg"
                        // required
                      />
                      <FormErrorMessage>{errors.Affiliation}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="EducationalBackground">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={
                        errors.EducationalBackground &&
                        touched.EducationalBackground
                      }
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Educational Background{" "}
                        <span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        fontSize="sm"
                        ms="4px"
                        borderRadius="15px"
                        type="text"
                        placeholder="Enter Your Educational Background"
                        // mb="24px"
                        size="lg"
                        // required
                      />
                      <FormErrorMessage>
                        {errors.EducationalBackground}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {/* //////// Upload files ///////// */}

                <Field name="IdFile">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={errors.IdFile && touched.IdFile}
                    >
                      <FormLabel
                        htmlFor="IdFile"
                        ms="4px"
                        fontSize="sm"
                        bg="teal.300"
                        color="white"
                        fontWeight="xsmall"
                        w="60%"
                        h="45"
                        // mb="24px"
                        borderRadius="15px"
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Upload Id <span style={{ color: "red" }}>*</span>{" "}
                        <AttachmentIcon boxSize={3} />
                      </FormLabel>
                      <Input
                        type="file"
                        placeholder="..."
                        id="IdFile"
                        name="IdFile"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setFieldValue("IdFile", event.target.files[0]);
                        }}
                      />
                      <FormErrorMessage>{errors.IdFile}</FormErrorMessage>
                      <Text>{field.value && field.value.name}</Text>
                    </FormControl>
                  )}
                </Field>

                <Field name="WorkingLicense">
                  {({ field   }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={
                        errors.WorkingLicense && touched.WorkingLicense
                      }
                    >
                      <FormLabel
                        htmlFor="WorkingLicense"
                        ms="4px"
                        fontSize="sm"
                        bg="teal.300"
                        color="white"
                        fontWeight="xsmall"
                        w="60%"
                        h="45"
                        // mb="24px"
                        borderRadius="15px"
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Upload Working License{" "}
                        <span style={{ color: "red" }}>*</span>{" "}
                        <AttachmentIcon boxSize={3} />{" "}
                      </FormLabel>
                      <Input
                        type="file"
                        placeholder="..."
                        id="WorkingLicense"
                        name="WorkingLicense"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setFieldValue(
                            "WorkingLicense",
                            event.target.files[0]
                          );
                        }}
                      />
                      <FormErrorMessage>
                        {errors.WorkingLicense}
                      </FormErrorMessage>
                      <Text>{field.value && field.value.name}</Text>
                    </FormControl>
                  )}
                </Field>

                <Field name="PharmacyDegree">
                  {({ field }) => (
                    <FormControl
                      mb="24px"
                      isInvalid={
                        errors.PharmacyDegree && touched.PharmacyDegree
                      }
                    >
                      <FormLabel
                        htmlFor="PharmacyDegree"
                        ms="4px"
                        fontSize="sm"
                        bg="teal.300"
                        color="white"
                        fontWeight="xsmall"
                        w="60%"
                        h="45"
                        // mb="24px"
                        borderRadius="15px"
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Upload Pharmacy Degree{" "}
                        <span style={{ color: "red" }}>*</span>{" "}
                        <AttachmentIcon boxSize={3} />{" "}
                      </FormLabel>
                      <Input
                        type="file"
                        placeholder="..."
                        id="PharmacyDegree"
                        name="PharmacyDegree"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        // required
                        // onChange={(e) => setMedicalDegree(e.target.files[0])}
                        onChange={(event) => {
                          setFieldValue(
                            "PharmacyDegree",
                            event.target.files[0]
                          );
                        }}
                      />
                      <FormErrorMessage>
                        {errors.PharmacyDegree}
                      </FormErrorMessage>
                      <Text>{field.value && field.value.name}</Text>
                    </FormControl>
                  )}
                </Field>
                {uploadProgress > 0 && (
                  <Progress
                    colorScheme="teal"
                    value={uploadProgress}
                    mb="24px"
                  />
                )}
                {/* ////////////end of upload files //////////// */}
                <Button
                  type="submit"
                  bg="teal.300"
                  fontSize="10px"
                  color="white"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mb="24px"
                  _hover={{ bg: "teal.200" }}
                  _active={{ bg: "teal.400" }}
                  isLoading={isSubmitting}
                >
                  SUBMIT REQUEST
                </Button>
                {error && (
                  <Alert status="error" mt={2} mb={4}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                color={titleColor}
                ms="5px"
                href="./signin "
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
            <Text
              color={textColor}
              fontWeight="medium"
              align="center"
              mb="5px"
              mt="5px"
              textColor="grey"
            >
              OR
            </Text>
            <Text color={textColor} fontWeight="medium">
              Register as a patient
              <Link
                color={titleColor}
                ms="5px"
                href="./SignUp"
                fontWeight="bold"
              >
                here
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default pharmSignUp;
