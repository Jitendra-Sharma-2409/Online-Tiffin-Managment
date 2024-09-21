const Subscription = require('../models/Subscription');

class SubscriptionController {
    static async createSubscription(req, res) {
        const { userId, orderId, startDate, endDate, deliveryTime } = req.body;

        try {
            const result = await Subscription.createSubscription(userId, orderId, startDate, endDate, deliveryTime);
            res.status(201).json({ message: 'Subscription created successfully', subscriptionId: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add more controller methods as needed
}

module.exports = SubscriptionController;
