const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Hello API
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DBlink Showcase Brand API Server' });
});

// Routes mapping
app.use('/api/products', productRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;
