const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  // let data = req.body.order_data;
  // const userEmail = req.body.userEmail;
  // const vendorEmail = req.body.vendorEmail;
  // await data.splice(0, 0, { Order_date: req.body.order_date });

  // let eId = await Order.findOne({ email: req.body.email });
  // console.log(eId);
  // if (eId === null) {
  //   try {
  //     await Order.create({
  //       email: req.body.email,
  //       order_data: [data],
  //     }).then(() => {
  //       res.json({ success: true });
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).send("Server Error: " + error.message);
  //   }
  // } else {
  //   try {
  //     await Order.findOneAndUpdate(
  //       { email: req.body.email },
  //       { $push: { order_data: data } }
  //     ).then(() => {
  //       res.json({ success: true });
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).send("Server Error: " + error.message);
  //   }
  // }

  const { order_data, order_date, userEmail, vendorEmail } = req.body;
  const orderWithDate = [{ Order_date: order_date }, ...order_data];

  try {
    let userOrder = await Order.findOne({ email: userEmail });
    if (!userOrder) {
      await Order.create({
        email: userEmail,
        role: "user",
        order_data: [orderWithDate],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: userEmail },
        { $push: { order_data: orderWithDate } }
      );
    }
  } catch (error) {
    return res.status(500).send("Error saving user order: " + error.message);
  }

  try {
    let vendorOrder = await Order.findOne({ email: vendorEmail });
    if (!vendorOrder) {
      await Order.create({
        email: vendorEmail,
        role: "vendor",
        order_data: [orderWithDate],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: vendorEmail },
        { $push: { order_data: orderWithDate } }
      );
    }
  } catch (error) {
    return res.status(500).send("Error saving vendor order: " + error.message);
  }

  res.json({ success: true });
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
