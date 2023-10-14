import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function PatientMedicine() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default PatientMedicine;
