const API_BASE = "http://localhost:8000/";
const ORDER_BASE = "http://localhost:8000/package/";
const PHARMACIST_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const MEDICINE_BASE = "http://localhost:8000/appointment/";
const GUEST_BASE = "http://localhost:8000/guest/";

export const API_PATHS = {
  // Add paths here

  getmedicines: MEDICINE_BASE + "getmedicines",

  adminViewPharmacist: ADMIN_BASE + "viewpharmacist/", // + username
  adminViewPatient: ADMIN_BASE + "viewpatient/", // + username
};
