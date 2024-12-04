
const express = require('express');
const menuItems = require('../data/menu'); // Import menuItems from data

const router = express.Router();

// POST /menu - Add or update a menu item
router.post('/', (req, res) => {
  const { id, name, price, category } = req.body;

  // Validation
  if (!id || !name || price === undefined || !category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number.' });
  }

  const predefinedCategories = ['Starter', 'Main Course', 'Dessert', 'Beverage'];
  if (!predefinedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category.' });
  }

  // Add or update item
  menuItems[id] = { id, name, price, category };
  res.status(200).json({ message: 'Menu item added/updated successfully.' });
});

// GET /menu - Retrieve all menu items
router.get('/', (req, res) => {
  res.status(200).json(Object.values(menuItems));
});

module.exports = router;
