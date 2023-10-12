const API_BASE = "http://localhost:8000/";
const ORDER_BASE = "http://localhost:8000/package/";
const PHARMACIST_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const MEDICINE_BASE = "http://localhost:8000/medicine/";
const GUEST_BASE = "http://localhost:8000/guest/";

export const API_PATHS = {
  // Add paths here
  signup: PATIENT_BASE + "addPatient/",
  docSignUp: GUEST_BASE + "addRequest/",

  addMedicine: MEDICINE_BASE + "addMedicine/",
  getMedicines: MEDICINE_BASE + "getMedicines/",
  getMedicine: MEDICINE_BASE + "getMedicine/",
  updateMedicine: MEDICINE_BASE + "updateMedicine/",
  deleteMedicine: MEDICINE_BASE + "deleteMedicine/",

  // getmedicines: MEDICINE_BASE + "getmedicines",

  getRequests: ADMIN_BASE + "requests/",
  getRequest: ADMIN_BASE + "getRequest/",
  deleteUser: ADMIN_BASE + "deleteUser/",
  createAdmin: ADMIN_BASE + "addAdmin/",

  adminViewPharmacist: ADMIN_BASE + "viewpharmacist/", // + username
  adminViewPatient: ADMIN_BASE + "viewpatient/", // + username
};
