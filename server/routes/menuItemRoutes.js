const express = require('express');
const router = express.Router();
const MenuItemController = require('../controllers/MenuItemController');

// Routes for menu items
router.post('/add', MenuItemController.addMenuItem);
router.get('/all', MenuItemController.getAllMenuItems);
router.put('/:id', MenuItemController.updateMenuItem);
router.delete('/:id', MenuItemController.deleteMenuItem);

module.exports = router;
