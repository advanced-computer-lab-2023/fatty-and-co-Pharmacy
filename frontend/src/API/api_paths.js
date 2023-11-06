const API_BASE = "http://localhost:8000/";
const ORDER_BASE = "http://localhost:8000/package/";
const PHARMACIST_BASE = "http://localhost:8000/pharmacist/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const MEDICINE_BASE = "http://localhost:8000/medicine/";
const GUEST_BASE = "http://localhost:8000/guest/";

export const API_PATHS = {
  // Add paths here

  // Guest paths
  signup: GUEST_BASE + "addPatient/",
  pharmSignUp: GUEST_BASE + "addRequest/",
  login: GUEST_BASE + "login/",

  // Medicine paths
  addMedicine: MEDICINE_BASE + "addMedicine/",
  getMedicines: MEDICINE_BASE + "getMedicines/",
  getMedicine: MEDICINE_BASE + "getMedicine/", // add name of medicine to get
  updateMedicine: MEDICINE_BASE + "updateMedicine/", // add id of medicine to update
  deleteMedicine: MEDICINE_BASE + "deleteMedicine/", // add id of medicine to delete

  // getmedicines: MEDICINE_BASE + "getmedicines",

  // Admin paths
  getRequests: ADMIN_BASE + "requests/",
  getRequest: ADMIN_BASE + "getRequest/",
  deleteUser: ADMIN_BASE + "deleteUser/",
  createAdmin: ADMIN_BASE + "addAdmin/",
  adminViewPharmacist: ADMIN_BASE + "viewpharmacist/", // + username
  adminViewPatient: ADMIN_BASE + "viewpatient/", // + username

  // Pharmacist paths

  // Patient paths

  // Order paths
};
