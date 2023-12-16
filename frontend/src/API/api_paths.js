const API_BASE = "http://localhost:7000/";
const ORDER_BASE = "http://localhost:7000/order/";
const PHARMACIST_BASE = "http://localhost:7000/pharmacist/";
const PATIENT_BASE = "http://localhost:7000/patient/";
const ADMIN_BASE = "http://localhost:7000/admin/";
const MEDICINE_BASE = "http://localhost:7000/medicine/";
const GUEST_BASE = "http://localhost:7000/guest/";
const CART_BASE = "http://localhost:7000/cart/";
const DELIVERY_ADDRESS_BASE = "http://localhost:7000/deliveryAddress/";
const PAYMENT_BASE = "http://localhost:7000/payment/";

export const API_PATHS = {
  // Add paths here

  // Patient paths
  getWalletAmount: PATIENT_BASE + "getWalletAmount/", // + username
  viewSubscription: PATIENT_BASE + "viewSubscription/",

  // Guest paths
  signup: GUEST_BASE + "addPatient/",
  pharmSignUp: GUEST_BASE + "addRequest/",
  login: GUEST_BASE + "login/",
  updatePass: GUEST_BASE + "updatePass/",
  resetPass: GUEST_BASE + "resetPass/",
  sendOTP: GUEST_BASE + "sendOTP/",
  validateOTP: GUEST_BASE + "validateOTP/",
  
  // Medicine paths
  addMedicine: MEDICINE_BASE + "addMedicine/",
  getMedicines: MEDICINE_BASE + "getMedicines/",
  getMedicine: MEDICINE_BASE + "getMedicine/", // add name of medicine to get
  updateMedicine: MEDICINE_BASE + "updateMedicine/", // add id of medicine to update
  deleteMedicine: MEDICINE_BASE + "deleteMedicine/", // add id of medicine to delete
  downloadFile: MEDICINE_BASE + "downloadFile/", // get the image by filename to download

  // getmedicines: MEDICINE_BASE + "getmedicines",

  // Admin paths
  getRequests: ADMIN_BASE + "requests/",
  getRequest: ADMIN_BASE + "getRequest/",
  deleteUser: ADMIN_BASE + "deleteUser/",
  createAdmin: ADMIN_BASE + "addAdmin/",
  adminViewPharmacist: ADMIN_BASE + "viewpharmacist/", // + username
  adminViewPatient: ADMIN_BASE + "viewpatient/", // + username
  getRequestFile: ADMIN_BASE + "getRequestFile/", // + filename
  acceptRequest: ADMIN_BASE + "acceptRequest/",
  rejectRequest: ADMIN_BASE + "rejectRequest/",
  // Pharmacist paths

  // Patient paths
  getMedicineDiscount: PATIENT_BASE + "getMedicineDiscount/",

  // Order paths
  checkout: ORDER_BASE + "checkout/",
  getOrders: ORDER_BASE + "getOrders/",
  cancelOrder: ORDER_BASE + "cancelOrder/",

  // Cart paths
  addItemToCart: CART_BASE + "addToCart/", // + medicineID
  viewCart: CART_BASE + "viewCart/",
  decrementItem: CART_BASE + "decrementItem/", // + mdedicineID
  deleteItem: CART_BASE + "deleteItem/",
  checkMedicinePrescribed: CART_BASE + "checkMedicinePrescribed/",

  // Delivery Address paths
  viewDeliveryAddresses: DELIVERY_ADDRESS_BASE + "viewDeliveryAddresses/",
  addDeliveryAddress: DELIVERY_ADDRESS_BASE + "addDeliveryAddress/",

  cardPayment: PAYMENT_BASE + "cardPayment/",
};
