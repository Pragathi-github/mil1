const express = require('express');
const cron = require('node-cron');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const { processOrderStatuses } = require('./utils/statusQueue');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);

// CRON Job to process order statuses every minute
cron.schedule('* * * * *', processOrderStatuses);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
