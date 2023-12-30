const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/erp");
  console.log("Database connected sucessfully");
}

module.exports = connect;
