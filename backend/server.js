const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  res.send('MySQL + Node.js server is running!');
});

// create
app.post('/items', (req, res) => {
  const { itemname, ownername, ownernumber, itemcolor, description, datelost, locationlost } = req.body;

  if (!itemname) {
    return res.status(400).json({ error: 'itemname is required' });
  }

  const query = `INSERT INTO lostItems (itemname, ownername, ownernumber, itemcolor, description, datelost, locationlost)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [itemname, ownername, ownernumber, itemcolor, description, datelost, locationlost], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Received POST data:', req.body);
    res.status(201).json({ itemid: results.insertId, itemname, ownername, ownernumber, itemcolor, description, datelost, locationlost });
  });
});

// read (all)
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM lostItems';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// read (single)
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM lostItems WHERE itemid = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(results[0]);
  });
});

// update
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { itemname, ownername, ownernumber, itemcolor, description, datelost, locationlost } = req.body;

  const query = `UPDATE lostItems SET itemname = ?, ownername = ?, ownernumber = ?, itemcolor = ?, description = ?, datelost = ?, locationlost = ? WHERE itemid = ?`;
  db.query(query, [itemname, ownername, ownernumber, itemcolor, description, datelost, locationlost, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item updated successfully' });
  });
});

// delete
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM lostItems WHERE itemid = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = db;
