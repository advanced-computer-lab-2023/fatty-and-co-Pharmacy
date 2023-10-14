import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function PharmacistMedicine() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default PharmacistMedicine;
