require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Route Variables
const testRoutes = require("./routes/tests");
const medicineRoutes = require("./routes/medicine");
const adminRoutes = require("./routes/admins");
const pharmacistRoutes = require("./routes/pharmacists");
const patientRoutes = require("./routes/patients");
const orderRoutes = require("./routes/orders");
const guestRoutes = require("./routes/guests");
const cartRoutes = require("./routes/cart");
const deliveryAddressRoutes = require("./routes/deliveryAddress");
const paymentRoutes = require("./routes/payments");

// Middleware Variables
const requireAuth = require("./common/middleware/requireAuth");

// ENV Variables
const port = process.env.PORT || 7000;
const mongoURI = process.env.MONGO_URI;

// App Variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use((req, res, next) => {
  console.log(req.query);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Pharmacy Home");
});

// no auth required for these routes
app.use("/guest", guestRoutes);
app.use("/test", testRoutes);

// Middleware (not applied on test or guest routes)
// all routes require user to be logged in except for guest routes
// that's why we apply this middleware after guest routes
app.use(requireAuth);

app.use("/medicine", medicineRoutes);
app.use("/admin", adminRoutes);
app.use("/pharmacist", pharmacistRoutes);
app.use("/patient", patientRoutes);
app.use("/order", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/deliveryAddress", deliveryAddressRoutes);
app.use("/payment", paymentRoutes);

// Server
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    // Listen for requests
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
