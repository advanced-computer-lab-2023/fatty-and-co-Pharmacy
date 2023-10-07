import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MedicineCard from "../components/medicineCards/medicineCard";
import MedicinePharmacistCard from "../components/medicineCards/medicinePharmacistCard";
import { CardGroup } from "reactstrap";

const Medicine = () => {
  const [medicines, setMedicines] = useState(null);
  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch("/medicine/medicines");
      const data = await response.json();
      if (response.ok) {
        setMedicines(data);
      } else {
        console.log(data);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <div>
      <h2>Medicine</h2>
      {/** view Medicines */}
      <CardGroup style={{ margin: "10px" }}>
        {medicines &&
          medicines.map((medicine) => (
            <MedicineCard key={medicine._id} Medicine={medicine} />
          ))}
      </CardGroup>
      {/* add packages */}
      {/* <MedicinePharmacistCard />S */}
    </div>
  );
};

export default Medicine;
