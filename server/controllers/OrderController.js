const Order = require('../models/Order');

class OrderController {
    static async createOrder(req, res) {
        const { userId, menuItemId, deliveryDate, status, deliveryPersonId } = req.body;

        try {
            const result = await Order.createOrder(userId, menuItemId, deliveryDate, status, deliveryPersonId);
            res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllOrders(req, res) {
        try {
            const orders = await Order.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateOrderStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const currentDate = new Date();
            const result = await Order.updateOrderStatus(id, status, currentDate);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
            const updatedOrder = await Order.getOrderById(id); // Fetch the updated order
            res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async assignDeliveryPerson(req, res) {
        const { id } = req.params;
        const { deliveryPersonId } = req.body;

        try {
            const result = await Order.assignDeliveryPerson(id, deliveryPersonId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Delivery person assigned successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderController;
