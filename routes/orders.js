
const express = require('express');
const orders = require('../data/orders'); // Import orders from data
const menuItems = require('../data/menu'); // Import menuItems from data
const { addToQueue } = require('../utils/statusQueue');

const router = express.Router();

// POST /orders - Place an order
router.post('/', (req, res) => {
  const { items } = req.body;

  // Validate request body
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items must be a non-empty array.' });
  }

  // Check if all item IDs exist in the menu
  for (const itemId of items) {
    if (!menuItems[itemId]) {
      return res.status(400).json({ error: `Item with ID '${itemId}' does not exist.` });
    }
  }

  // Create an order
  const orderId = Date.now().toString(); // Unique ID based on timestamp
  const newOrder = {
    id: orderId,
    items,
    status: 'Preparing', // Initial status
    createdAt: new Date().toISOString(),
  };

  // Save the order
  orders[orderId] = newOrder;

  // Add the order ID to the queue for processing
  addToQueue(orderId);

  res.status(201).json(newOrder);
});

// GET /orders/:id - Fetch details of a specific order
router.get('/:id', (req, res) => {
  const orderId = req.params.id;

  // Check if the order exists
  if (!orders[orderId]) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  res.status(200).json(orders[orderId]);
});

module.exports = router;
