const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

const Item = require('./schema'); 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Mongo + Node.js server is running!');
});


// CREATE
app.post("/items", async (req, res) => {
  try {
    const item = await Item.create({
      itemID: req.body.itemID,
      itemName: req.body.itemName,
      ownerName: req.body.ownerName,
      ownerNumber: req.body.ownerNumber,
      itemColor: req.body.itemColor,
      description: req.body.description,
      dateLost: req.body.dateLost,
      locationLost: req.body.locationLost,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        itemID: req.body.itemID,
        itemName: req.body.itemName,
        ownerName: req.body.ownerName,
        ownerNumber: req.body.ownerNumber,
        itemColor: req.body.itemColor,
        description: req.body.description,
        dateLost: req.body.dateLost,
        locationLost: req.body.locationLost,
      },
      { new: true }
    );

    if (!updatedItem)
      return res.status(404).json({ error: "Item not found" });

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/items/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
