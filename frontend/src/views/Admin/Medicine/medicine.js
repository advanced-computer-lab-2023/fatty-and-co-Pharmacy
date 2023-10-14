import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function MedicineAdmin() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default MedicineAdmin;
