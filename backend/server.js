// Import express
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Node.js server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
