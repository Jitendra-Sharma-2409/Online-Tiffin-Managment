const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, OrderController.createOrder);
router.get('/all', OrderController.getAllOrders);
router.put('/:id/status', OrderController.updateOrderStatus);
router.put('/:id/assign', OrderController.assignDeliveryPerson);

module.exports = router;

