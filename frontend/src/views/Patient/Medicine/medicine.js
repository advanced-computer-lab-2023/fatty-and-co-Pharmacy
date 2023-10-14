import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function MedicinePatient() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default MedicinePatient;
