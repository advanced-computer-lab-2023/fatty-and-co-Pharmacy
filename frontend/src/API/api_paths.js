const API_BASE = "http://localhost:8000/";
const ORDER_BASE = "http://localhost:8000/package/";
const PHARMACIST_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const MEDICINE_BASE = "http://localhost:8000/medicine/";
const GUEST_BASE = "http://localhost:8000/guest/";

export const API_PATHS = {
  // Add paths here
  
  // medicine paths
  addMedicine: MEDICINE_BASE + "addMedicine/",
  getMedicines: MEDICINE_BASE + "getMedicines",
  getMedicine: MEDICINE_BASE + "medicine/",
  updateMedicine: MEDICINE_BASE + "updateMedicine/",
  deleteMedicine: MEDICINE_BASE + "deleteMedicine/",
  

  // getmedicines: MEDICINE_BASE + "getmedicines",

  adminViewPharmacist: ADMIN_BASE + "viewpharmacist/", // + username
  adminViewPatient: ADMIN_BASE + "viewpatient/", // + username
};
