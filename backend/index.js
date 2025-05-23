const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { mongoDB } = require("./db");
const { header } = require("express-validator");
const Razorpay = require("razorpay");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/payment"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });