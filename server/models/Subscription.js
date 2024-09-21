const db = require('../config/db');

class Subscription {
    static async createSubscription(userId, orderId, startDate, endDate, deliveryTime) {
        const [result] = await db.execute(
            'INSERT INTO Subscriptions (user_id, order_id, start_date, end_date, delivery_time) VALUES (?, ?, ?, ?, ?)',
            [userId, orderId, startDate, endDate, deliveryTime]
        );
        return result;
    }

    // Add more methods as needed
}

module.exports = Subscription;
