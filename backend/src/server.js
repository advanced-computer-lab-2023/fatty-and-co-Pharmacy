require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Route Variables
const medicineRoutes = require("./routes/medicine");


// ENV Variables
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

// App Variables
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Pharmacy Home");
});
app.use("/medicine", medicineRoutes);


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
