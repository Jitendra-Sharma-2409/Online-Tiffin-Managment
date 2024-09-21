const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controllers/SubscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, SubscriptionController.createSubscription);

// Add more routes as needed

module.exports = router;
