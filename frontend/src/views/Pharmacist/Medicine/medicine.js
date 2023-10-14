import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function MedicinePharmacist() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default MedicinePharmacist;
