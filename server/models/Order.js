const db = require('../config/db');

class Order {
    static async createOrder(userId, menuItemId, deliveryDate, status = 'pending', deliveryPersonId = null) {
        const [result] = await db.execute(
            'INSERT INTO UserOrders (user_id, menu_item_id, delivery_date, status, delivery_person_id) VALUES (?, ?, ?, ?, ?)',
            [userId, menuItemId, deliveryDate, status, deliveryPersonId]
        );
        return result;
    }

    static async getOrders() {
        const [rows] = await db.query('SELECT * FROM UserOrders');
        return rows;
    }

    static async getOrderById(id) {
        const [rows] = await db.query('SELECT * FROM UserOrders WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateOrderStatus(id, status, currentDate) {
        const [result] = await db.query(
            'UPDATE UserOrders SET status = ?, delivery_date = ? WHERE id = ?',
            [status, currentDate, id]
        );
        return result;
    }

    static async assignDeliveryPerson(id, deliveryPersonId) {
        const [result] = await db.query(
            'UPDATE UserOrders SET delivery_person_id = ? WHERE id = ?',
            [deliveryPersonId, id]
        );
        return result;
    }
}

module.exports = Order;
