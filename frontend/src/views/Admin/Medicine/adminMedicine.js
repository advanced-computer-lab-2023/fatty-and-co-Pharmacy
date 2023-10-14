import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function AdminMedicine() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default AdminMedicine;
