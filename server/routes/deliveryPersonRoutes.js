

const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, AddressController.createAddress);

// Add more routes as needed

module.exports = router;