const mongoose = require("mongoose");

const salesSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time components to zero
      return today;
    },
  },
  productName: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const sales = mongoose.model("sales", salesSchema);

module.exports = sales;
