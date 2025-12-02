const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  itemID: String, 
  itemName: String,
  ownerName: String,
  ownerNumber: Number,
  itemColor: String,
  description: String,
  dateLost: Date,
  locationLost: String,
});

module.exports = mongoose.model("Item", itemsSchema);
