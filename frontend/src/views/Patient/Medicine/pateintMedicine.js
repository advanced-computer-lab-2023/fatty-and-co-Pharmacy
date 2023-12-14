import { MedicineContextProvider } from "context/MedicineContext";
import Index from "./index";

function PatientMedicine() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default PatientMedicine;
