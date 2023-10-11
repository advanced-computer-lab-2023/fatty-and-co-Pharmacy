import { MedicineContextProvider } from "../../../hooks/MedicineContext";
import Index from "./index";

function Medicine() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default Medicine;
