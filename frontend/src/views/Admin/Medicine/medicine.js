import { MedicineContextProvider } from "./components/Context";
import Index from "./index";

function Medicine() {
  return (
    <MedicineContextProvider>
      <Index />
    </MedicineContextProvider>
  );
}

export default Medicine;
