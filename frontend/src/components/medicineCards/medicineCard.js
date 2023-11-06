import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Collapse,
} from "reactstrap";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { API_PATHS } from "API/api_paths";

const MedicineCard = ({ Medicine }) => {
  // handle edit
  const [Name, setName] = useState(Medicine.Name);
  const [Quantity, setQuantity] = useState(Medicine.Quantity);
  const [Active_Ingredients, setActive_Ingredients] = useState(
    Medicine.Active_Ingredients
  );
  const [Description, setDescription] = useState(Medicine.Description);
  const [Price, setPrice] = useState(Medicine.Price);
  const [Image, setImage] = useState(Medicine.Image);
  const [Medicinal_Use, setMedicinal_Use] = useState(Medicine.Medicinal_Use);
  const [Sales, setSales] = useState(Medicine.Sales);
  const [state, setState] = useState(Medicine.state);

  const [message, setMessage] = useState("");

  const { user } = useAuthContext();
  const Authorization = `Bearer ${user.token}`;

  // handle Archive
  const handleArchive = async () => {
    const state = Medicine.state === "archived" ? "unarchived" : "archived";
    // const response = await fetch("/medicine/updateMedicine/" + Medicine._id, {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     state: state,
    //   }),
    // });

    // const data = await response.json();
    // if (response.ok) {
    //   setState(state);
    //   window.location.reload();
    // } else {
    //   setMessage(data.message);
    // }
    axios
      .patch(
        API_PATHS.updateMedicine + Medicine._id,
        { state: state },
        { headers: { Authorization } }
      )
      .then((response) => {
        setState(state);
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  // handle edit
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleEdit = async () => {
    // const response = await fetch("/medicine/updateMedicine/" + Medicine._id, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Name: Name,
    //     Quantity: Quantity,
    //     Active_Ingredients: Active_Ingredients,
    //     Description: Description,
    //     Price: Price,
    //     Image: Image,
    //     Medicinal_Use: Medicinal_Use,
    //     Sales: Sales,
    //   }),
    // });
    // const data = await response.json();
    // if (response.ok) {
    //   window.location.reload();
    // } else {
    //   setMessage(data.message);
    // }

    axios
      .patch(
        API_PATHS.updateMedicine + Medicine._id,
        {
          Name: Name,
          Quantity: Quantity,
          Active_Ingredients: Active_Ingredients,
          Description: Description,
          Price: Price,
          Image: Image,
          Medicinal_Use: Medicinal_Use,
          Sales: Sales,
        },
        { headers: { Authorization } }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  //end edit

  return (
    <Card
      className="text-center"
      style={{
        width: "18rem",
        height: "18rem",
      }}
    >
      <CardBody
        style={{
          width: "18rem",
        }}
      >
        <React.StrictMode>
          <Collapse isOpen={!isOpen} {...Medicine}>
            <img src={Medicine.Image} alt={Medicine.Name} />
            <CardTitle tag="h5">{Medicine.Name}</CardTitle>
            <CardText>Quantity : {Medicine.Quantity}</CardText>
            <CardText>
              Active Ingredients : {Medicine.Active_Ingredients}
            </CardText>
            <CardText> Medicinal_Use : {Medicine.Medicinal_Use}</CardText>
            <CardText>
              Active Ingredients : {Medicine.Active_Ingredients}
            </CardText>
            <CardText>Total Sales : {Medicine.Sales}</CardText>
            <CardText>
              Price : {Medicine.Price} <small>L.E</small>
            </CardText>
            <CardText>Description : {Medicine.Description}</CardText>
            <Button
              onClick={toggle}
              color="primary"
              style={{ margin: "5px", width: "70%" }}
            >
              Edit
            </Button>
            <Button
              onClick={handleArchive}
              color="danger"
              style={{ margin: "5px", width: "70%" }}
            >
              {Medicine.state === "archived" ? "Unarchive" : "Archive"}
            </Button>
            {message && <p>message</p>}
          </Collapse>
          <Collapse isOpen={isOpen} {...Medicine}>
            <CardText>
              <input
                type="text"
                name="Name"
                id="NameEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Quantity"
                id="QuantityEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Price in L.E"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Active_Ingredients"
                id="Active_Ingredients"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Active Ingredients"
                onChange={(e) => setActive_Ingredients(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Medicine_Discount"
                id="Medicine_DiscountEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Medicine Discount"
                onChange={(e) => setDescription(e.target.value)}
                // value={Package.Medicine_Discount}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Medicinal_Use"
                id="Medicinal_UseEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Medicinal Use"
                onChange={(e) => setMedicinal_Use(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Image"
                id="ImageEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Image"
                onChange={(e) => setImage(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Price"
                id="PriceEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Price in L.E"
                onChange={(e) => setPrice(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="number"
                name="Sales"
                id="SalesEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Sales"
                onChange={(e) => setSales(e.target.value)}
              />
            </CardText>
            <CardText>
              <input
                type="textarea"
                name="Description"
                id="DescriptionEdit"
                required
                style={{ width: "80%", margin: "10px" }}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardText>
            <Button
              onClick={handleEdit}
              color="primary"
              style={{ margin: "5px", width: "70%" }}
            >
              Save
            </Button>
            <Button
              onClick={toggle}
              color="danger"
              style={{ margin: "5px", width: "70%" }}
            >
              Cancel
            </Button>
            {message && <p>message</p>}
          </Collapse>
        </React.StrictMode>
      </CardBody>
    </Card>
  );
};

export default MedicineCard;
