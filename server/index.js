const express = require("express");
require("dotenv").config();
const app = express();
const connect = require("./db");
const orderReceived = require("./orderReceived");
const inventory = require("./inventory");

const sales = require("./sales");

const port = process.env.PORT;

app.use(express.json());

app.use(require("./manufacture"));

app.put("/sales", async (req, res) => {
  try {
    const { productName, quantity, orderDate } = req.body;

    // Extract the date part from the orderDate
    const dateOnly = new Date(orderDate);
    dateOnly.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

    const updatedSales = await sales.updateOne(
      {
        productName: productName,
        date: {
          $gte: dateOnly,
          $lt: new Date(dateOnly.getTime() + 24 * 60 * 60 * 1000),
        }, // Check if date is greater than or equal to and less than the next day
      },
      {
        $inc: {
          quantity: quantity,
        },
      }
    );

    console.log("Updated Successfully");
    res.json(updatedSales);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/sales", async (req, res) => {
  try {
    const i1 = await sales.find({});
    res.json(i1);
  } catch (err) {
    console.log(err);
  }
});

app.post("/order", async (req, res) => {
  const {
    productName,
    quantity,
    deliveryDate,
    deliveryAddress,
    paymentStatus,
  } = req.body;

  // Set the current date and time for orderDate
  const orderDate = new Date();

  try {
    const result = await orderReceived.insertMany({
      productName,
      quantity,
      orderDate,
      deliveryDate: new Date(deliveryDate),
      deliveryAddress,
      paymentStatus,
    });

    res.json(result);

    console.log("Order inserted successfully:", result);
  } catch (error) {
    console.error("Error inserting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/order", async (req, res) => {
  try {
    const i = await orderReceived.find({});
    res.json(i);
  } catch (err) {
    console.log(err);
  }
});

try {
  connect();
} catch (err) {
  console.log(err);
}

app.get("/inventory", async (req, res) => {
  try {
    const inventoryItems = await inventory.find({});
    res.json(inventoryItems);
    
  } catch (error) {
    console.error(error);
  }
});





app.put("/inventory/:id", async (req, res) => {
  const itemId = req.params.id;
  const updateFields = req.body;

  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      itemId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
