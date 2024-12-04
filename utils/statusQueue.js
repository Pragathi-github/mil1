// utils/statusQueue.js
const orders = require('../data/orders'); // Import orders from data

// Queue to track order statuses
const statusQueue = [];

// Add Order ID to Queue
function addToQueue(orderId) {
  statusQueue.push(orderId);
}

// Process Order Statuses
function processOrderStatuses() {
  if (statusQueue.length === 0) return;

  for (let i = 0; i < statusQueue.length; i++) {
    const orderId = statusQueue[i];
    const order = orders[orderId];

    if (order.status === 'Preparing') {
      order.status = 'Out for Delivery';
    } else if (order.status === 'Out for Delivery') {
      order.status = 'Delivered';
      statusQueue.splice(i, 1); // Remove from queue
      i--; // Adjust index
    }
  }
}

module.exports = { addToQueue, processOrderStatuses };
