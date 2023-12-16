# API Routes

- [Guest Routes](#guest-routes)
- [Admin Routes](#admin-routes)
- [Doctor Routes](#patient-routes)
- [Appointment Routes](#appointment-routes)
- [Package Routes](#package-routes)
- [Payment Routes](#payment-routes)
- [Prescription Routes](#prescription-routes)
- [Test Routes](#test-routes)

### Guest Routes

#### Login

```http
POST /login
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `Username` | `string` | **Required**. Username to login with |
| `Password` | `string` | **Required**. Password to login with |

#### Send OTP

```http
POST /sendOTP
```

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `Email`   | `string` | **Required**. The Email of the user to send OTP to |

#### Validate OTP

```http
POST /validateOTP
```

| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `Email`   | `string` | **Required**. The Email of the user the OTP was sent to |
| `otp`     | `string` | **Required**. The otp to validate                       |

#### Add Patient

```http
POST /addPatient
```

| Parameter                  | Type     | Description                                                                  |
| :------------------------- | :------- | :--------------------------------------------------------------------------- |
| `Username`                 | `string` | **Required**. The username of the patient                                    |
| `Name`                     | `string` | **Required**. The name of the patient                                        |
| `Password`                 | `string` | **Required**. The password of the patient                                    |
| `Email`                    | `string` | **Required**. The email of the patient                                       |
| `MobileNum`                | `string` | **Required**. The mobile number of the patient                               |
| `DateOfBirth`              | `string` | **Required**. The date of birth of the patient                               |
| `Gender`                   | `string` | **Required**. The gender of the patient ["M", "F"]                           |
| `EmergencyContactNumber`   | `string` | **Required**. The emergency contact number of the patient                    |
| `EmergencyContactName`     | `string` | **Required**. The emergency contact name of the patient                      |
| `EmergencyContactRelation` | `string` | **Required**. The relationship between the patient and the emergency contact |

#### Add Pharmacist Signup Request

```http
POST /addRequest
```

| Parameter               | Type     | Description                                            |
| :---------------------- | :------- | :----------------------------------------------------- |
| `Username`              | `string` | **Required**. The username of the doctor               |
| `Password`              | `string` | **Required**. The password of the doctor               |
| `Email`                 | `string` | **Required**. The email of the doctor                  |
| `Name`                  | `string` | **Required**. The name of the doctor                   |
| `DateOfBirth`           | `string` | **Required**. The date of birth of the doctor          |
| `HourlyRate`            | `number` | **Required**. The hourly rate of the doctor            |
| `Affiliation`           | `string` | **Required**. The affiliation of the doctor            |
| `EducationalBackground` | `string` | **Required**. The educational background of the doctor |
| `Speciality`            | `string` | **Required**. The speciality of the doctor             |

#### Reset Password

```http
PATCH /resetPass/
```

| Parameter  | Type     | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| `Email`    | `string` | **Required**. The Email of the user to reset the password of |
| `Password` | `string` | **Required**. The new Password                               |

#### Get Notifications

```http
GET /getNotifs
```

No parameters required.

#### Update Request

```http
PUT /updateRequest/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. ID of the request |
| `request` | `object` | **Required** The new request    |

#### Update Email

```http
PATCH /updateEmail
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `Email`   | `string` | **Required**. The new Email |

#### Update Password

```http
PATCH /updatePass/
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `OldPassword` | `string` | **Required**. The old password |
| `NewPassword` | `string` | **Required**. The new password |

### Admin Routes

#### Get Requests

```http
GET /requests
```

No parameters required.

#### Add Admin

```http
POST /addAdmin
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Username` | `string` | **Required**. The username of the admin |
| `Password` | `string` | **Required**. The password of the admin |
| `Email`    | `string` | **Required**. The email of the admin    |
| `Name`     | `string` | **Required**. The name of the admin     |

#### Get Request

```http
GET /getRequest
```

No parameters required.

#### Get Request File

```http
GET /getRequestFile/:filename
```

| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
| `filename` | `string` | **Required**. The filename of the request file |

#### Accept Request

```http
POST /acceptRequest
```

| Parameter   | Type     | Description                                        |
| :---------- | :------- | :------------------------------------------------- |
| `RequestId` | `string` | **Required**. The id of the request to be accepted |

#### Reject Request

```http
PUT /rejectRequest
```

| Parameter   | Type     | Description                                        |
| :---------- | :------- | :------------------------------------------------- |
| `RequestId` | `string` | **Required**. The id of the request to be rejected |

#### Delete User

```http
DELETE /deleteUser
```

| Parameter  | Type     | Description                                          |
| :--------- | :------- | :--------------------------------------------------- |
| `Username` | `string` | **Required**. The username of the user to be deleted |

#### View Pharmacist

```http
GET /viewPharmacist/:username
```

| Parameter  | Type     | Description                                               |
| :--------- | :------- | :-------------------------------------------------------- |
| `username` | `string` | **Required**. The username of the pharmacist to be viewed |

#### View Patient

```http
GET /viewPatient/:username
```

| Parameter  | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `username` | `string` | **Required**. The username of the patient to be viewed |

### Pharmacist Routes

#### Add Pharmacist

```http
POST /addPharmacist
```

| Parameter               | Type     | Description                                                |
| :---------------------- | :------- | :--------------------------------------------------------- |
| `Username`              | `string` | **Required**. The username of the pharmacist               |
| `Password`              | `string` | **Required**. The password of the pharmacist               |
| `Email`                 | `string` | **Required**. The email of the pharmacist                  |
| `Name`                  | `string` | **Required**. The name of the pharmacist                   |
| `DateOfBirth`           | `string` | **Required**. The date of birth of the pharmacist          |
| `HourlyRate`            | `number` | **Required**. The hourly rate of the pharmacist            |
| `Affiliation`           | `string` | **Required**. The affiliation of the pharmacist            |
| `EducationalBackground` | `string` | **Required**. The educational background of the pharmacist |
| `Speciality`            | `string` | **Required**. The speciality of the pharmacist             |
| `IdFile`                | `file`   | **Required**. The id file of the pharmacist                |
| `WorkingLicense`        | `file`   | **Required**. The working license of the pharmacist        |
| `PharmacyDegree`        | `file`   | **Required**. The pharmacy degree of the pharmacist        |

#### Get All Pharmacists

```http
GET /getAllPharmacists
```

No parameters required.

#### Delete Pharmacist

```http
DELETE /deletePharmacist/:id
```

| Parameter | Type     | Description                                          |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Required**. The id of the pharmacist to be deleted |

#### Get Pharmacist

```http
GET /getPharmacist/:id
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Required**. The id of the pharmacist to be viewed |

### Patient Routes

#### Get All Patients

```http
GET /getAllPatients
```

No parameters required.

#### Delete Patient

```http
DELETE /deletePatient/:id
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `id`      | `string` | **Required**. The id of the patient to be deleted |

#### Get Patient

```http
GET /getPatient/:id
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Required**. The id of the patient to be viewed |

#### Update Patient

```http
PATCH /updatePatient/:id
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `id`      | `string` | **Required**. The id of the patient to be updated |

#### Get Patient Username

```http
GET /getPatientUsername/:Username
```

| Parameter  | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `Username` | `string` | **Required**. The username of the patient |

#### Get Emergency Contact

```http
GET /getEmergencyContact/:Username
```

| Parameter  | Type     | Description                                                                          |
| :--------- | :------- | :----------------------------------------------------------------------------------- |
| `Username` | `string` | **Required**. The username of the patient whose emergency contact is to be retrieved |

#### Get Wallet Amount

```http
GET /getWalletAmount
```

No parameters required.

#### Get Medicine Discount

```http
GET /getMedicineDiscount
```

No parameters required.

#### View Subscription

```http
GET /viewSubscription
```

No parameters required.

### Order Routes

#### Checkout

```http
POST /checkout
```

| Parameter      | Type     | Description                            |
| :------------- | :------- | :------------------------------------- |
| `orderDetails` | `object` | **Required**. The details of the order |

#### Get Orders

```http
GET /getOrders
```

No parameters required.

#### Get Order Details and Status

```http
GET /getOrderDetailsandStatus
```

No parameters required.

#### Cancel Order

```http
POST /cancelOrder
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `orderId` | `string` | **Required**. The id of the order to be cancelled |

### Medicine Routes

#### Get Medicines

```http
GET /getMedicines
```

No parameters required.

#### Get Medicine

```http
GET /getMedicine/:Name
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `Name`    | `string` | **Required**. The name of the medicine |

#### Add Medicine

```http
POST /addMedicine
```

| Parameter         | Type     | Description                               |
| :---------------- | :------- | :---------------------------------------- |
| `MedicineDetails` | `object` | **Required**. The details of the medicine |
| `MImage`          | `file`   | **Required**. The image of the medicine   |

#### Delete Medicine

```http
DELETE /deleteMedicine/:id
```

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `id`      | `string` | **Required**. The id of the medicine to be deleted |

#### Update Medicine

```http
PATCH /updateMedicine/:id
```

| Parameter         | Type     | Description                                        |
| :---------------- | :------- | :------------------------------------------------- |
| `id`              | `string` | **Required**. The id of the medicine to be updated |
| `MedicineDetails` | `object` | **Required**. The updated details of the medicine  |
| `MImage`          | `file`   | **Required**. The updated image of the medicine    |

#### Filter Medicine

```http
GET /filter
```

| Parameter      | Type     | Description                                  |
| :------------- | :------- | :------------------------------------------- |
| `medicinalUse` | `string` | **Required**. The medicinal use to filter by |

#### Download File

```http
GET /downloadFile/:filename
```

| Parameter  | Type     | Description                                             |
| :--------- | :------- | :------------------------------------------------------ |
| `filename` | `string` | **Required**. The filename of the file to be downloaded |

#### Get Total Sales

```http
GET /getTotalSales
```

No parameters required.

### Payment Routes

#### Pay With Card

```http
POST /cardPayment
```

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `cardDetails` | `object` | **Required**. The details of the card |
| `amount`      | `number` | **Required**. The amount to be paid   |

### Cart Routes

#### Add To Cart

```http
POST /addToCart
```

| Parameter    | Type     | Description                                                  |
| :----------- | :------- | :----------------------------------------------------------- |
| `medicineId` | `string` | **Required**. The id of the medicine to be added to the cart |

#### Decrement Item

```http
POST /decrementItem
```

| Parameter    | Type     | Description                                                        |
| :----------- | :------- | :----------------------------------------------------------------- |
| `medicineId` | `string` | **Required**. The id of the medicine to be decremented in the cart |

#### View Cart

```http
GET /viewCart
```

No parameters required.

#### Delete Item

```http
POST /deleteItem
```

| Parameter    | Type     | Description                                                      |
| :----------- | :------- | :--------------------------------------------------------------- |
| `medicineId` | `string` | **Required**. The id of the medicine to be deleted from the cart |

#### Check Medicine Prescribed

```http
GET /checkMedicinePrescribed
```

| Parameter    | Type     | Description                                                      |
| :----------- | :------- | :--------------------------------------------------------------- |
| `medicineId` | `string` | **Required**. The id of the medicine to check if it's prescribed |

### Delivery Address Routes

#### View Delivery Addresses

```http
GET /viewDeliveryAddresses
```

No parameters required.

#### Add Delivery Address

```http
POST /addDeliveryAddress
```

| Parameter        | Type     | Description                                           |
| :--------------- | :------- | :---------------------------------------------------- |
| `addressDetails` | `object` | **Required**. The details of the new delivery address |

### Test Routes

#### Get Users

```http
GET /Users
```

No parameters required.

#### Get Admins

```http
GET /Admins
```

No parameters required.

#### Get Pharmacists

```http
GET /Pharmacists
```

No parameters required.

#### Get Patients

```http
GET /Patients
```

No parameters required.

#### Create User

```http
POST /createUser
```

| Parameter     | Type     | Description                               |
| :------------ | :------- | :---------------------------------------- |
| `userDetails` | `object` | **Required**. The details of the new user |

#### Create Pharmacist

```http
POST /createPharmacist
```

| Parameter           | Type     | Description                                     |
| :------------------ | :------- | :---------------------------------------------- |
| `pharmacistDetails` | `object` | **Required**. The details of the new pharmacist |

#### Create Patient

```http
POST /createPatient
```

| Parameter        | Type     | Description                                  |
| :--------------- | :------- | :------------------------------------------- |
| `patientDetails` | `object` | **Required**. The details of the new patient |

#### Create Medicine

```http
POST /createMedicine
```

| Parameter         | Type     | Description                                   |
| :---------------- | :------- | :-------------------------------------------- |
| `medicineDetails` | `object` | **Required**. The details of the new medicine |
