const express = require('express');
const router = express.Router();
const DeliveryPersonController = require('../controllers/DeliveryPersonController');

router.get('/', DeliveryPersonController.getAllDeliveryPersons);

module.exports = router;
